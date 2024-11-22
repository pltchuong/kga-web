<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Autoloader
require 'phpmailer/vendor/autoload.php';
/*
 *  CONFIGURE EVERYTHING HERE
 */

// From Email and Name
$fromEmail = 'admin@clone.mwp-development.com'; // TODO REPLACE WITH YOUR FROM EMAIL
$fromName = 'John Doe'; // TODO REPLACE WITH FROM YOUR NAME
$myEmail = ''; // TODO REPLACE $myEmail WITH YOUR EMAIL ADDRESS(this email will receive messages)
$customerName = '';
$customerSurname = '';

// Subject of the email
$subject = 'New message from Orica contact form';

// Allowed form fields
$fields = array('name' => 'Name', 'surname' => 'Surname', 'email' => 'Email', 'department' => 'Department', 'message' => 'Message'); 

// Email sent successfully message
$successMessage = 'Request successfully submitted. We will get back to you soon!';

// Error during sending email message
$errorMessage = 'There was an error while submitting the form. Please try again later.';

/*
 *  SENDING
 */
try
{

    if(count($_POST) == 0) throw new \Exception('Form is empty');
    if(isset($_POST['name'])){
		$customerName = filter_var($_POST['name'],FILTER_SANITIZE_STRING);
	} 
    if(isset($_POST['surname'])){
		$customerSurname = filter_var($_POST['surname'],FILTER_SANITIZE_STRING);
	} 
	if(isset($_POST['email']) && empty($myEmail) ){
		$myEmail = filter_var($_POST['email'],FILTER_SANITIZE_EMAIL);
	} 		
	
	// To Email and Name
	$sendToEmail = $myEmail;
	$sendToName = $customerName.' '.$customerSurname;

    $emailText = "You have a new message from your contact form\r\n\r\n";

    foreach ($_POST as $key => $value) {
        // If the field exists in the $fields array, include it in the email 
        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\r\n\r\n";
        }
    }

    $mail = new PHPMailer();
    $mail->setFrom($fromEmail, $fromName);
    $mail->addAddress($sendToEmail, $sendToName);
    $mail->addReplyTo($from);
    
    $mail->isHTML(false);
    
    $mail->Subject = $subject;
    $mail->Body = $emailText; // this will also create a plain-text version of the HTML email, very handy
   
    $mail->send();
    
    $responseArray = array('status' => 'success', 'message' => $successMessage);
}
catch (\Exception $e)
{
    $responseArray = array('status' => 'danger', 'message' => $e->getMessage());
}

// if requested by AJAX request return JSON response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
} else { // else just display the message
    echo $responseArray['message'];
}