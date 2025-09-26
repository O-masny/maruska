<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

// Brevo SDK
use Brevo\Client\Api\TransactionalEmailsApi;
use Brevo\Client\Configuration;
use Brevo\Client\Model\SendSmtpEmail;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class ContactMessage extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public array $data)
    {
    }

    /**
     * Defaultní Laravel build – slouží pro lokální dev (Mailhog).
     */
    public function build(): self
    {
        Log::debug('ContactMessage: building email (Mailhog fallback)', [
            'env' => app()->environment(),
            'data' => $this->data,
        ]);

        return $this->subject('Dev: Nová zpráva z kontaktního formuláře')
            ->view('emails.contact-message')
            ->with(['data' => $this->data]);
    }

    /**
     * Samostatná metoda pro odeslání přes Brevo API.
     */
    public function sendViaBrevo(): bool
    {
        try {
            $config = Configuration::getDefaultConfiguration()
                ->setApiKey('api-key', config('services.brevo.key'));

            $apiInstance = new TransactionalEmailsApi(new Client(), $config);

            $htmlMessage = '<h1>Kontaktní zpráva</h1>'
                . '<p><strong>Jméno:</strong> ' . htmlspecialchars($this->data['name']) . '</p>'
                . '<p><strong>Email:</strong> ' . htmlspecialchars($this->data['email']) . '</p>'
                . '<p><strong>Zpráva:</strong><br>' . nl2br(htmlspecialchars($this->data['message'])) . '</p>';

            $sendSmtpEmail = new SendSmtpEmail([
                'sender' => [
                    'name' => 'amatelier',
                    'email' => 'noreply@umarusky.cz', // tvůj ověřený sender v Brevo
                ],
                'to' => [
                    ['email' => config('mail.contact_to')],
                ],
                'replyTo' => [
                    'email' => $this->data['email'],
                    'name' => $this->data['name'],
                ],
                'subject' => 'Nová zpráva z kontaktního formuláře',
                'htmlContent' => $htmlMessage,
                'tags' => ['contact-form'],
            ]);



            $result = $apiInstance->sendTransacEmail($sendSmtpEmail);

            Log::info('ContactMessage: Brevo mail sent', [
                'messageId' => method_exists($result, 'getMessageId') ? $result->getMessageId() : null,
                'raw' => $result,
            ]);

            return true;
        } catch (\Throwable $e) {
            Log::error('ContactMessage: Brevo mail failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $this->data,
            ]);

            return false;
        }
    }
}
