<?php

namespace App\Notifications;
use App\Models\PasswordReset;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class UserPasswordResetNotice extends Notification
{
    use Queueable;

    public $reset;
    /**
     * Create a new notification instance.
     */
    public function __construct(PasswordReset $passwordReset)
    {
        $this->reset = $passwordReset;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Password Reset Link')
            ->line('Click the link below to reset your password. if you didn\'t request a new password,  you can safely ignore this email.')
            ->action('Reset now',config('app.url').'/#/auth/setPassword/'.$this->reset->token);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
