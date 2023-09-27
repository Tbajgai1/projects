<?php
ob_start();
   $author_id = "";
    $picture_id= "";
    $rating = "";
    $url_redirect ="";

require_once("../login/classes/Login.php");

$login = new Login(); 

if($login->isUserLoggedIn() == true){
	// $userMessage =  "Logged in as " . $_SESSION['user_name']. " - User ID is " . $_SESSION['user_id'];

	// Lets grab the ID of the authenticated user that will create this blog engtry. Thye are therefor the "author".
	$author_id = $_SESSION['user_id'];
}

 
    include('../includes/header.php');


    if(isset($_POST['Rating'])) {
        $rating = $_POST['Rating'];
    }

    if(isset($_POST['picture_id'])) {
        $picture_id = $_POST['picture_id'];
    }
    if(isset($_POST['referer'])){

        $url_redirect = $_POST['referer'];
    }
    
    if(isset($_POST['submit'])){

            // Make sure to escape and sanitize your variables before using them in the query
        $picture_id = mysqli_real_escape_string($con, $picture_id);
        $author_id = mysqli_real_escape_string($con, $author_id);
        $rating = mysqli_real_escape_string($con, $rating);

        
        mysqli_query($con, "INSERT INTO image_rating (picture_id, rater_id, rating) VALUES ($picture_id, $author_id, $rating)");
        header("Location: $url_redirect");
       
    }

?>