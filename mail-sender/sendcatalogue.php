<?php
	require_once('class.phpmailer.php');
	
	/*
	[catalogs] => 0,2,3,4,10
    [provincia] => Chaco
    [lastname] => asdf
    [name] => ste
    [localidad] => Barranqueras
    [email] => sdfsd@sdf.sdf
    [opcion] => Casa de repuesto
	*/
	// $name = $_POST['name'];
	// $lastname = $_POST['lastname'];
	// $email = $_POST['email'];
	// $opcion = $_POST['opcion'];
	// $provincia = $_POST['provincia'];
	// $localidad = $_POST['localidad'];
	// $catalogs = explode(',', $_POST['catalogs']);

	$data = json_decode(file_get_contents('php://input'), true);

	$name = $data["name"];
	$email = $data["email"];
	$businessName = $data["businessName"];
	$businessType = $data["businessType"];
	$province = $data["province"];
	$locality = $data["locality"];
	$phone = $data["phone"];
	$catalogs = explode(',', $data["catalogs"]);

	/* 
	$name = 'Javier';
	$lastname = 'Reboursin';
	$email = 'javier.reboursin@gmail.com';

	$name = 'Stepan';
	$lastname = 'Nikulenko';
	$email = 'steppannws@gmail.com';
	$opcion = 'Baterias';
	$provincia = 'Buenos Aires';
	$localidad = 'Palermo';
	$catalogs = explode(',', "11,1,3");
	 */
	 
	saveUser($name, $email, $businessType, $businessName, $province, $localidad, $phone, $catalog);

	foreach($catalogs as $key => $val) {
		sendMail($name, $email, $catalogs[$key]);
	}

	function sendMail($name, $email, $id_catalog) {
		$catalog = "";
		switch($id_catalog) {
			case '0':
				$catalog = 'pdfs/bosch+rotating+machines.pdf';
				$subject = 'Bosch: Catálogo Rotating Machines';
				break;
			case '1':
				$catalog = 'pdfs/bosch+tss.pdf';
				$subject = 'Bosch: Catálogo Centro de capacitación';
				break;
			case '2':
				$catalog = 'pdfs/bosch+superprofesionales.pdf';
				$subject = 'Bosch: Catálogo Superprofesionales';
				break;
			case '3':
				$catalog = 'pdfs/bosch+pastillas+de+freno.pdf';
				$subject = 'Bosch: Catálogo Pastillas de freno';
				break;
			case '4':
				$catalog = 'pdfs/bosch+muscletools+2018+6.pdf';
				$subject = 'Bosch: Catálogos Muscletools';
				break;
			case '5':
				$catalog = 'pdfs/bosch+repuestos+para+motos.pdf';
				$subject = 'Bosch: Catálogo Repuestos para Motos';
				break;
			case '6':
				$catalog = 'pdfs/bosch+lamparas.pdf';
				$subject = 'Bosch: Catálogo Lámparas';
				break;
			case '7':
				$catalog = 'pdfs/bosch+kits+de+distribucion.pdf';
				$subject = 'Bosch: Catálogo Kits de distribución';
				break;
			case '8':
				$catalog = 'pdfs/bosch+filtros.pdf';
				$subject = 'Bosch: Catálogo Filtros';
				break;
			case '9':
				$catalog = 'pdfs/bosch+escobillas.pdf';
				$subject = 'Bosch: Catálogo Escobillas';
				break;
			case '10':
				$catalog = 'pdfs/bosch+discos+de+freno.pdf';
				$subject = 'Bosch: Catálogo Discos de freno';
				break;
			case '11':
				$catalog = 'pdfs/bosch+diagnosticos.pdf';
				$subject = 'Bosch: Catálogo Diagnosticos';
				break;
			case '12':
				$catalog = 'pdfs/bosch+bujias+de+inc.pdf';
				$subject = 'Bosch: Catálogo Bujías de Incandescencia';
				break;
			case '13':
				$catalog = 'pdfs/bosch+bujias.pdf';
				$subject = 'Bosch: Catálogo Bujías';
				break;
			case '14':
				$catalog = 'pdfs/bosch+bombas+de+combustible.pdf';
				$subject = 'Bosch: Catálogo Bombas de combustible';
				break;
			case '15':
				$catalog = 'pdfs/bosch+bobinas+de+encendido.pdf';
				$subject = 'Bosch: Catálogo Bobinas de encendido';
				break;
			case '16':
				$catalog = 'pdfs/bosch+baterias.pdf';
				$subject = 'Bosch: Catálogo Baterías';
				break;
		}

		$mail = new PHPMailer(); // defaults to using php "mail()"
        $body = "Le enviamos el catálogo solicitado a través de nuestra App. \nPara más información visítenos en www.bosch.com.ar";

        $mail->AddReplyTo("no-reply@ar.bosch.com","Bosch");
        $mail->SetFrom('no-reply@ar.bosch.com', 'Bosch');
        $mail->CharSet = 'UTF-8';

        $mail->AddAddress($email, $name);       
        $mail->Subject    = $subject;       
        // $mail->AltBody    = "Le enviamos el catálogo solicitado a través de nuestra App. \nPara más información visítenos en www.bosch.com.ar";

        $mail->MsgHTML($body);
        $path = $catalog;

        $mail->AddAttachment($path, '', $encoding = 'base64', $type = 'application/pdf');
        global $message;
        if(!$mail->Send()) {
          $message =  "Invoice could not be send. Mailer Error: " . $mail->ErrorInfo;
          echo $message;
        } else {
          $message = "Invoice sent!";
          echo $message;
        }

		// echo nl2br("Sending mail to: ".$email." with ".$catalog." catalog.\n");
	}

	function saveUser($name, $email, $businessType, $businessName, $province, $localidad, $phone, $catalog) {
		$db = mysql_connect('localhost', 'gt000618_step', 'Stepan1234')
		or die('Conection error: ' . mysql_error());
		echo 'Connected successfully';
		mysql_select_db('gt000618_step') or die('Error selecting db');

		$entry = "INSERT INTO bosch (name, last_name, email) VALUES ('Peter', 'Parker', 'peterparker@mail.com')";
		 
		mysqli_query($db, $entry)
		mysql_close($db);
	}



?>