<?php 


	include("../includes/mysql_connect.php");



	$pageid = $_GET['id'];

	if(!is_numeric($pageid)){
		header("Location: edit.php");
	}

	
	//DELETE RECORD FROM DB
	mysqli_query($con, "DELETE FROM communitygallery WHERE id = '$pageid'") or die(mysqli_error($con));

	// GO BACK TO EDIT
	header("Location: edit.php");
 ?>