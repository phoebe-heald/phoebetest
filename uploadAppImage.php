<?php

/*  working code from Job
  print_r($_FILES);
  $orderNo = $_REQUEST['orderNo'];

  //construct unique file name
   $new_image_name = $orderNo . "appImage.jpg";
   move_uploaded_file($_FILES["file"]["tmp_name"], "documents/" . $new_image_name);
*/



  print_r($_FILES);


$desc = "Upload from Bliss App";


//Stop some files types from being attached		***
$extBad = false;
$extension = substr($userfile_name,-4);
$extension = strtolower($extension);
if (trim($extension) == ".php")
	$extBad = true;
if (trim($extension) == ".php4")
	$extBad = true;
if (trim($extension) == ".php5")
	$extBad = true;
if (trim($extension) == ".php6")
	$extBad = true;
if (trim($extension) == ".asp")
	$extBad = true;
if (trim($extension) == "aspx")
	$extBad = true;
if (trim($extension) == ".bat")
	$extBad = true;
if (trim($extension) == ".jsp")
	$extBad = true;
if (trim($extension) == ".apk")
	$extBad = true;
if (trim($extension) == ".ipa")
	$extBad = true;
if (trim($extension) == ".exe")
	$extBad = true;

if ($extBad)
{
	echo "<b>This web server does not allow files of this type uploaded</b>";
	echo "<br><br>";
	echo "Add the file to a zip and attach this.<br><br>";
	exit();
}
//  --- end of file extension checking

//Give each file as a UNIQUE filename  -       YYYYmmddhhmmss   -  and replace and dodgy characters
$newfileName = date("YmdHis") . "phoebe" . ".jpg";
$newfileName = str_replace("\\","",$newfileName);
$newfileName = str_replace("/","",$newfileName);
$newfileName = str_replace("&","",$newfileName);
$newfileName = str_replace("'","",$newfileName);

$newfile = "documents/" . $newfileName;
$origFileName = $_FILES["file"]["tmp_name"];
move_uploaded_file($_FILES["file"]["tmp_name"], $newfile )

?>