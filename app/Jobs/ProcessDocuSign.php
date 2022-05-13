<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use DocuSign\eSign\Configuration;
use DocuSign\eSign\Client\Auth\OAuth;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class ProcessDocuSign implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $order;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($order = null)
    {
        $this->order = $order;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $config = new Configuration();
        $oAuth = new OAuth();

        if ($this->order->docusign_envelope_id) {
            return;
        }
    
        $oAuth->setOAuthBasePath(\DocuSign\eSign\Client\Auth\OAuth::$PRODUCTION_OAUTH_BASE_PATH);

        $config->setHost('https://na4.docusign.net/restapi/');
        
        $docuSign = new \App\Classes\DocuSignClient($config, $oAuth, $this->order, [
            'signer_name' => $this->order->user->name,
            'signer_email' => $this->order->user->email,
        ]);


        $result = $docuSign->send();

        $this->order->update([
            'docusign_envelope_id' => $result['envelope_id']
        ]);

    }
}
