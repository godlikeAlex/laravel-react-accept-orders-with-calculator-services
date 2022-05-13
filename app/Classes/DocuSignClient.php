<?php
namespace App\Classes;

use Carbon\Carbon;
use Codedge\Fpdf\Fpdf\Fpdf;
use \DocuSign\eSign\Configuration;
use \DocuSign\eSign\Client\Auth\OAuth;

class DocuSignClient {

  protected $client_id;
  protected $user_id;
  protected $rsa_private;

  protected $args;

    /**
   * Configuration
   *
   * @var App\Models\Order
  */
  protected $order;

  /**
   * Configuration
   *
   * @var Configuration
  */
  protected $config;

  /**
   * oAuth
   *\DocuSign\eSign\Client\ApiException
    * @var OAuth
  */
  protected $oAuth;

  public function __construct($config, $oAuth, $order, $args = []) {
    $this->client_id = env('DOCUSIGN_CLIENT_ID');
    $this->user_id = env('DOCUSIGN_USER_ID');
    $this->account_id = env('DOCUSIGN_ACCOUNT_ID');
    $this->rsa_private = file_get_contents(storage_path('docusign-private.key'), true);
    $this->order = $order;

    info($this->rsa_private);

    if ($config == null) {
      $config = new Configuration();
    }

    if ($oAuth == null) {
      $oAuth = new OAuth();
    }

    $this->config = $config;
    $this->oAuth = $oAuth;
    $this->args = $args;
  }

  public function send() {
    $envelope = $this->makeEnvelope($this->args);

    $api_client = new \DocuSign\eSign\client\ApiClient($this->config, $this->oAuth);

    $jwt_scope = "signature impersonation"; 

    $api_client->requestJWTUserToken(
      $this->client_id, 
      $this->user_id, 
      $this->rsa_private,
      // $jwt_scope
    );

    $envelope_api = new \DocuSign\eSign\Api\EnvelopesApi($api_client);
    $results = $envelope_api->createEnvelope($this->account_id, $envelope);
    $envelope_id = $results->getEnvelopeId();

    return ['envelope_id' => $envelope_id];
  }

  private function makeEnvelope($args) {

    // $content_bytes = file_get_contents(dirname(__FILE__) . '\test.pdf');
    $content_bytes = $this->generatePDF();

    $base64_file_content = base64_encode($content_bytes);
    # Create the document model
    $document = new \DocuSign\eSign\Model\Document([ # create the DocuSign document object
        'document_base64' => $base64_file_content,
        'name' => 'Example document', # can be different from actual file name
        'file_extension' => 'pdf', # many different document types are accepted
        'document_id' => 25 # a label used to reference the doc
    ]);

    # Create the signer recipient model
    $signer = new \DocuSign\eSign\Model\Signer([ # The signer
        'email' => $args['signer_email'], 'name' => $args['signer_name'],
        'recipient_id' => "1", 'routing_order' => "1",
    ]);

    # Create a sign_here tab (field on the document)

    $sign_here = new \DocuSign\eSign\Model\SignHere(['document_id' => '25', 'page_number' => '1',
    'x_position' => '45', 'y_position' => '677', 'required' => true]);
    $full_name_here = new \DocuSign\eSign\Model\Text([
      'document_id' => '25', 
      'page_number' => '1',
      'x_position' => '30',
      'y_position' => '640',
      'required' => true,
      'name' => 'Full name',
      'width' => 150
    ]);

    # Add the tabs model (including the sign_here tab) to the signer
    # The Tabs object wants arrays of the different field/tab types
    $signer->settabs(new \DocuSign\eSign\Model\Tabs([
      'sign_here_tabs' => [$sign_here],
      'text_tabs' => [$full_name_here]
    ]));
    # Next, create the top level envelope definition and populate it.

    # Next, create the top level envelope definition and populate it.
    $envelope_definition = new \DocuSign\eSign\Model\EnvelopeDefinition([
        'email_subject' => "Please sign this document to approve from EASYWAYINSTALL",
        'documents' => [$document],
        # The Recipients object wants arrays for each recipient type
        'recipients' => new \DocuSign\eSign\Model\Recipients(['signers' => [$signer]]),
        'status' => "sent" # requests that the envelope be created and sent.
    ]);
    return $envelope_definition;
  }

  private function generatePDF() {
    $fpdf = new Fpdf;
    $carbon = new Carbon($this->order->date);

    $fpdf->AddPage();
    $fpdf->SetFont('Arial', 'B', 18);
    $fpdf->Cell(0, 25, 'INSTALLATION COMPLETION FORM', 0, 1, 'C');
    // FULL WIDTH IS 130

    $fpdf->SetFont('Arial', 'B', 11);


    $fpdf->Cell(29, 5, 'Order number:', 0, 0);
    $fpdf->Cell(160, 5, $this->order->uuid, 'B', 1);

    // 2

    $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

    $fpdf->Cell(24, 5, 'Install Date:', 0, 0);
    $fpdf->Cell(165, 5, $carbon->toFormattedDateString(), 'B', 1);

    $fpdf->cell(0, 5, '', 0, 1); // SPACING LINE

    $fpdf->Cell(40, 5, 'Installation Address:', 0, 0);
    $fpdf->Cell(150, 5, $this->order->address, 'B', 1);

    $fpdf->cell(0, 15, '', 0, 1); // SPACING LINE

    $fpdf->SetY(-120);
    $fpdf->SetFont('Arial', 'BI', 12);
    $fpdf->Cell(0, 5, 'By signing below, I certify that the job was done to my satisfaction.', 0, 0, 'C');

    $fpdf->SetY(-80);

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,5,'Approved by',0,0);

    $fpdf->Cell(80,5,'',0,0);

    $fpdf->Cell(55,5,'Project complete by',0, 1);

    $fpdf->Cell(55,10,'','B',0);

    $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(55,10, $this->order->installers->first()->name ?? 'Viktor Hnativ','B', 1); // Installer name

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,10,'(Print name)',0,0, 'C');

    $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(55,10,'',0,1, 'C');




    $fpdf->Cell(55,10,'','B',0);

    // $fpdf->Cell(80,10,'',0,0);

    $fpdf->Cell(2,10,' ','B',1);

    $fpdf->SetFont('Arial','B',11);
    $fpdf->Cell(55,10,'(Sign)',0,0, 'C');

    $fpdf->Cell(80,10,'',0,0);

    // $fpdf->Cell(55,10,'(Sign)',0,1, 'C');

    return $fpdf->Output('S');
  }

  // private function makeEnvelope($args) {
  //   # Create the envelope definition with the template_id
  //   $envelope_definition = new \DocuSign\eSign\Model\EnvelopeDefinition([
  //     'status' => 'sent', 'template_id' => $args['template_id']
  //   ]);

  //   # Create the template role elements to connect the signer and cc recipients
  //   # to the template
  //   $signer = new \DocuSign\eSign\Model\TemplateRole([
  //       'email' => $args['signer_email'], 'name' => $args['signer_name'],
  //       'role_name' => 'SIGNER25'
  //   ]);

  //   # Add the TemplateRole objects to the envelope object
  //   $envelope_definition->setTemplateRoles([$signer]);
  //   return $envelope_definition;
  // }

  static function sendEmail() {
    $key = storage_path('docusign-private.key');

    info($key);
    info('idi naxuy))');
    $config = new Configuration();

    $oAuth = new \DocuSign\eSign\Client\Auth\OAuth();
    $oAuth->setOAuthBasePath(\DocuSign\eSign\Client\Auth\OAuth::$DEMO_OAUTH_BASE_PATH);

    $api = new \DocuSign\eSign\Client\ApiClient($config, $oAuth);

    $response = $api->requestJWTUserToken(
      'a075575b-b09c-43a0-b865-8767c098e81d', 
      'de92d5d3-57c3-4231-9510-8f6f7753ac8d',
      $key
    );

    return $config->getDefaultHeaders();
  }
}