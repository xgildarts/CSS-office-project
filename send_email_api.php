<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET");

$mail = new PHPMailer(true);

$package = file_get_contents("php://input");

$text = json_decode($package, true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'xnatsu25@gmail.com';  // Use your Gmail address here
    $mail->Password = 'missmtrshniwactw';  // Use your app password here
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Use STARTTLS for encryption
    $mail->Port = 587;  // Port 587 is recommended for STARTTLS

    $recipients = ["stevenjohnagustin25@gmail.com", 'steven.agustin.ecoast@panpacificu.edu.ph'];

    $is_sent = false;

   foreach($recipients as $receiver) {

        $mail->clearAllRecipients();

        //Recipients
        $mail->setFrom('stevenjohnagustin25@gmail.com', $text["sender_name"]);  // Set the "From" address
        $mail->addAddress($receiver, 'Admin');  // Add the recipient's address

        // Content
        $mail->isHTML(true);  // Set email format to HTML
        $mail->Subject = 'Subject';
        $mail->Body    = $text["body"];
        $mail->AltBody = $text["body"];

        $is_sent = $mail->send();

   }

    // Send email
    if ($is_sent) {
        echo json_encode(['status' => true]);
    } else {
        echo json_encode(['status' => false]);
    }

} catch (Exception $e) {
    echo json_encode(["Mailer Error: {$mail->ErrorInfo}"]);
}
?>
