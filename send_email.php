<?php 

$config = include dirname(__FILE__) . '/settings/config.php';
include dirname(__FILE__) . '/functions.php';
$request = json_decode(file_get_contents('php://input'));

if( !empty($request) ) {
	$request = sanitizeFormInputs($request);
	if( $errors = validateFormInputs($request) ) {
		throwError($errors);
	};

	sendMessage($request);
}
?>