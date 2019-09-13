<?php

	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = trim(filter_input(INPUT_POST, "name", FILTER_SANITIZE_STRING));
		$email = trim(filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL));
		$message = trim(filter_input(INPUT_POST, "message", FILTER_SANITIZE_SPECIAL_CHARS));

		if ($name == "" || $email == "" || $message == "") {
			$error_message = "Please fill in the required fields: Name, Email, Message";
		}
		if (!isset($error_message) && $_POST["address"] != "") {
			$error_message = "Bad form input";
		}

		require("inc/phpmailer/class.phpmailer.php");
		require("inc/phpmailer/class.smtp.php");

		$mail = new PHPMailer();

		if (!isset($error_message) && !$mail->ValidateAddress($email)) {
			$error_message = "Invalid Email Address";
		}

		if(!isset($error_message)) {
			$email_body = "";
			$email_body .= "Name " . $name . "\n";
			$email_body .= "Email " . $email . "\n";
			$email_body .= "Message " . $message . "\n";

			$mail->isSMTP();
			$mail->SMTPDebug = 1;
			$mail->SMTPAuth = true;
			$mail->SMTPSecure = "ssl";
			$mail->Host = "smtp.gmail.com";
			$mail->Port = 465;
			$mail->isHTML(true);
			$mail->Username = "mikeschendev@gmail.com";
			$mail->Password = "303se8th";
			$mail->setFrom($email, $name);
			$mail->Subject = "mikeschen.com message from" . $name;
			$mail->Body    = $email_body;
			$mail->addAddress("mikeschendev@gmail.com");
			$mail->AltBody = "This is the body in plain text for non-HTML mail clients";

			if($mail->send()) {
				header("location:contactme.php?status=thanks");
				exit;
			}
			$error_message = "Message could not be sent.";
			$error_message = "Mailer Error: " . $mail->ErrorInfo;
			}
		}

	$pageTitle = "Contact Michael Schennum";
	$section = "contactme";
	include("inc/headercontact.php");
	include("inc/navbar.php"); ?>

		<div class="section page">
			<div class="wrapper">
				<h1><b>Contact Me</b></h1>
				<?php if (isset($_GET["status"]) && $_GET["status"] == "thanks") {
						echo "<p align='center'>Thanks for the email! I&rsquo;ll check out your message shortly!</p>";
					} else { 
							if (isset($error_message)) {
								echo "<p class='message'>".$error_message . "</p>";
							} else {
								echo "<p align='center'>Complete the form to send me an email.</p>";
							}
				?>
				<form method="post" action="contactme.php">
					<table>
					<tr>
						<th><label for="name">Name (required)</label></th>
						<td><input type="text" id="name" name="name" value="<?php if (isset($name)) { echo $name; } ?>" /></td>
					</tr>
					<tr>
						<th><label for="email">Email (required)</label></th>
						<td><input type="text" id="email" name="email" value="<?php if (isset($email)) { echo $email; } ?>" /></td>
					</tr>
					<tr>
						<th><label for="message">Message (required)</label></th>
						<td><textarea name="message" id="message"><?php if (isset($message)) { echo htmlspecialchars($_POST["message"]); } ?></textarea></td>
					</tr>
					<tr style="display:none">
						<th><label for="address">Address</label></th>
						<td><input type="address" id="address" name="address" />
						<p>Please leave this field blank</p></td>
					</tr>
					</table>
					<input type="submit" value="Send" />
				</form>
				<?php } ?>
			</div>
		</div>
	<?php 
		include("inc/footer.php");
	?>
	</body>
</html>
