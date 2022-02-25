<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DocuSignController extends Controller
{
    public function sendMail() {
        $envelopeDefinition = $this->makeEnvelope(['signer_name' => 'Aleksandr', 'signer_email' => 'godlikedesigner@gmail.com']);
        $config = new \DocuSign\eSign\Configuration();
        $config->setHost('https://demo.docusign.net/restapi/');
        $config->addDefaultHeader('Authorization', 'Bearer ' . 'eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAey3opPbZSAgAAOPxSa322UgCANPVkt7DVzFClRCPb3dTrI0VAAEAAAAYAAEAAAAFAAAADQAkAAAAMzI3ZjIyZTUtNmY5Ny00MzYxLTliZDMtM2NkNDE0NDQwOWU2IgAkAAAAMzI3ZjIyZTUtNmY5Ny00MzYxLTliZDMtM2NkNDE0NDQwOWU2EgABAAAABgAAAGp3dF9iciMAJAAAADMyN2YyMmU1LTZmOTctNDM2MS05YmQzLTNjZDQxNDQ0MDllNg.1h925XAjKQYX4-ZUCp-wkm7JQPFx09F_48cBlnCqPiL-PSvtPpGFLDeJux8W7Vm3S_8UuQA4l7a_9xF_adaj799UARhs8Jpu-wKNiL58q4aCx4J5WHHtSwK3WWPVAnIRGAEaE9eIQDtG3nMetnnru6A4QXaN5KkO2tGEwlk1PT-LJsL2PB_5BD5VhjcvuptxycaeTbhpgMJzZWHUdC3Y5cAUiFL273QigiU2gOZqz8sNKFkYIkhP3e_fiq89zUGN3GiF_S4PXW_g2jJtUgvD5FKfA7e1Er2RmVHIL59w-_JnO7-nzf5YqXDpRcrOtySvLQhpmb9wQfFE8BNRr_087A');
        $api_client = new \DocuSign\eSign\client\ApiClient($config);

        $envelope_api = new \DocuSign\eSign\Api\EnvelopesApi($api_client);
        $results = $envelope_api->createEnvelope('492aa555-8098-4ef1-b062-b333d02e046c', $envelopeDefinition);
        $envelope_id = $results->getEnvelopeId();
        
        return ['envelope_id' => $envelope_id];

    }

    private function makeEnvelope($args)
    {
        # Create the envelope definition with the template_id

        $envelope_definition = new \DocuSign\eSign\Model\EnvelopeDefinition([
            'status' => 'sent', 'template_id' => '783d7337-fde5-4969-a1ba-d0ef5be57c13'
        ]);

        # Create the template role elements to connect the signer and cc recipients
        # to the template
        $signer = new \DocuSign\eSign\Model\TemplateRole([
            'email' => 'godlikedesigner@gmail.com', 'name' => 'Alex',
            'role_name' => 'signer'
        ]);

        # Create a cc template role.
        $cc = new \DocuSign\eSign\Model\TemplateRole([
            'email' => 'godlikedesigner@gmail.com', 'name' => 'alex',
            'role_name' => 'cc'
        ]);

        # Add the TemplateRole objects to the envelope object

        $envelope_definition->setTemplateRoles([$signer, $cc]);

        return $envelope_definition;

    }
}
