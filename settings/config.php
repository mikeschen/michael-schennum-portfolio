<?php 
return [

    /*
    |--------------------------------------------------------------------------
    | Contact form
    |--------------------------------------------------------------------------
    */
   
   'contact_form' => [
      // Basic settings
   		'to' => 'mikeschenphoto@gmail.com',
   		'defaultSubject' => 'Message from Contact Form',

      // Validation rules
   		'validation' => [
   			'name' 		=>	'required',
   			'email'		=>	'required|email',
   			'message'	=>	'required|min:20',
   		],

       // Validation messages
   		'validationMessages' => [
   			'required'	=> 'This field is required',
   			'email'		=> 'Given email address is incorrect',
   			'min:20'	=> 'Enter more than 20 characters'
   		],

      // Email template
   		'template' 		=> "Email from: {{name}} \r\nEmail address: {{email}} \r\n
							Message: \r\n
							{{message}} \r\n
							--------------------------------------------------- \r\n
							This email was sent from your site's contact form.",

      // Server error message
		  'serverError'	=> 'Something went wrong. Please try again later!'
   ]

];