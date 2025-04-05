<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'xnatsu25@gmail.com';  // Use your Gmail address here
    $mail->Password = 'missmtrshniwactw';  // Use your app password here
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Use STARTTLS for encryption
    $mail->Port = 587;  // Port 587 is recommended for STARTTLS

    //Recipients
    $mail->setFrom('xnatsu25@gmail.com', 'Good Moral Requests');  // Set the "From" address
    $mail->addAddress('steven.agustin.ecoast@panpacificu.edu.ph', 'Admin');  // Add the recipient's address

    // Content
    $mail->isHTML(true);  // Set email format to HTML
    $mail->Subject = 'Subject';
    $mail->Body    = 'Name: Steven';
    $mail->AltBody = 'This is the plain text version of the email content.';

    // Send email
    if ($mail->send()) {
        echo 'Message has been sent successfully!';
    } else {
        echo 'Message could not be sent.';
    }
} catch (Exception $e) {
    echo "Mailer Error: {$mail->ErrorInfo}";
}
?>
