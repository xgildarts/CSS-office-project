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

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'centerstudentsuccess94@gmail.com';  
    $mail->Password = 'ioiqmuylcwjueoel';  
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  
    $mail->Port = 587; 
    

    $recipients = ["successstudentcenter@gmail.com"];

    $is_sent = false;

    foreach($recipients as $receiver) {

        $mail->clearAllRecipients();

        $mail->setFrom('centerstudentsuccess94@gmail.com', $text["sender_name"]);  
        $mail->addAddress($receiver, 'Request for good moral');  

        $mail->isHTML(true);  
        $mail->Subject = $text["sender_name"];
        $mail->Body    = $text["body"];
        $mail->AltBody = $text["body"];

        $is_sent = $mail->send();

    }

    if ($is_sent) {
        echo json_encode(['status' => true]);
    } else {
        echo json_encode(['status' => false]);
    }

} catch (Exception $e) {
    echo json_encode(["Mailer Error: {$mail->ErrorInfo}"]);
}
?>
