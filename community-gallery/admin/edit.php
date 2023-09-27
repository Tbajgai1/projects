<?php
require_once("../login/classes/Login.php");

$login = new Login(); 

if($login->isUserLoggedIn() == true){
	// $userMessage =  "Logged in as " . $_SESSION['user_name']. " - User ID is " . $_SESSION['user_id'];
	
	// Lets grab the ID of the authenticated user that will create this blog engtry. Thye are therefor the "author".
	$author_id = $_SESSION['user_id'];
}else {
	header("Location:../login/index.php");
}
include("../includes/header.php");

//Test
// echo $author_id;

$navLinks = "";
$title = "";
$description = "";
$valDescription = "";
$strValidationMessage = "";
$valTitle  = "";
$pageid = "";
$filename = "";


if(isset($_GET['id'])){
	$pageid = $_GET['id'];
}

//Test
// echo $pageid;

	// this is mission critical, so in case $char_id has no value, we need to give it a default value
	if(!isset($pageid)){
		$default = mysqli_query($con, "SELECT id FROM communitygallery WHERE author_id = $author_id LIMIT 1") or die(mysqli_error($con));
		while($row = mysqli_fetch_array($default)){
			$pageid = $row['id']; 
		}
	}


// UPDATE

	if (isset($_POST['submit'])) {
		
		$boolValidateOK = 1;


		$title = $_POST['title'];
	  	$description = $_POST['description'];

		if((strlen($title ) < 2) || (strlen($title ) > 50)){
			$boolValidateOK = 0;
			$valTitle = "Please fill in a proper Title from 2 to 50 characters.<br>";
		}

	

		if((strlen($description ) < 10) || (strlen($description ) > 1000)){
			$boolValidateOK = 0;
			$valDescription = "Please fill in a proper description from 10 to 1000 characters.<br>";
		}

		if($boolValidateOK == 1){
			
			$title = $_POST['title'];
			$description = $_POST['description'];
			

			mysqli_query($con, "UPDATE communitygallery SET 
				title = '$title',
				description = '$description'
				
				WHERE id = '$pageid'")or die(mysqli_error($con));

		}

 }//end if submit

 if(isset($_POST['delete'])){
	//echo "delete";
	mysqli_query($con, "DELETE FROM communitygallery WHERE id = '$pageid'") or die(mysqli_error($con));
	$valSuccess = "Entry Deleted";
	header("Location:edit.php");
}

//	CREATE NAV LINKS

$result = mysqli_query($con, "SELECT * FROM communitygallery WHERE author_id = '$author_id'") or die(mysqli_error($con));

while($row = mysqli_fetch_array($result)){
		
		$filename =  $row['filename'];
		$title =  $row['title'];
		$description =  $row['description'];
		$id =  $row['id'];
		$navLinks .=  "\n<div class=\"thumb-small\">";
		$navLinks .= "\n\t<a href=\"edit.php?id=$id\"><img src=\"../images/thumbs-square-small/$filename\" class=\"img-thumbnail\"></a>";
		//$navLinks .= "\n\t<div class=\"thumb-titlex\">$title</div>";
		$navLinks .= "\n</div>";		
}

// STEP 2: RETRIEVE DATA FOR SELECTED ITEM AND PREPOPULATE THE FORM BELOW

	
	$result = mysqli_query($con, "SELECT * FROM communitygallery WHERE id = '$pageid'") or die(mysqli_error($con));

	while($row = mysqli_fetch_array($result)){
		$filename = $row['filename'];
		$title =  $row['title'];
		$description =  $row['description'];
		
		// echo "$fname, $lname";
	}

// \ Step 2

?>

<div class="row">
  <div class="col-sm-6">
 


<h2>Edit - <?php echo $title; ?></h2>
<form id="myform" name="myform" method="post" action="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" enctype="multipart/form-data">

		<div class="form-group">
			<!-- <label for="title"><b></b></label> -->
			<?php 
			$thisImage = "../images/thumbs-square/" . $filename;
			echo "<br><img src=\"$thisImage\" class=\"img-thumbnail\">";

			 ?>
		</div>



		<div class="form-group">
			<label for="title">Title:</label>
			<input type="text" name="title" class="form-control" value="<?php echo $title ?>">
			<?php
			if($valTitle != ""){
				echo "<div class=\"alert alert-danger\">$valTitle</div>";
			} 
			?>
		</div>
		<div class="form-group">
			<label for="description">Description:</label>
			<textarea name="description" class="form-control"><?php echo $description; ?></textarea>
			<?php
			if($valDescription != ""){
				echo "<div class=\"alert alert-danger\">$valDescription</div>";
			} 
			?>
		</div>
		<!-- <div class="form-group">
			<label for="description">Image:</label>
			<input type="file" name="myfile">
		</div> -->
		<div class="form-group">
			<label for="submit">&nbsp;</label>
			<input type="submit" name="submit" class="btn btn-info" value="Submit">
			<a href="delete.php?id=<?php echo $pageid; ?>" class="btn btn-danger pull-right" onclick="return confirm('Are you sure?')">Delete</a>

		</div>

<?php 
if($strValidationMessage){
	if($boolValidateOK == 1){
	echo "<div class=\"alert alert-info\"><p><i class=\"fas fa-check-circle fa-3x fa-pull-left\"></i> $strValidationMessage <img src=\"$thumbToShow\" width=\"50\" height=\"50\" class=\"img-thumbnailX\"> </p></div>";
	}else{
		echo "<div class=\"alert alert-danger\"><p><i class=\"fas fa-exclamation-triangle fa-2x fa-pull-left\"></i> $strValidationMessage </p></div>";	
	}
}

 ?>


	</form>
	</div><!-- \ left col -->

 	<div class="col-sm-6">
 		<h3>Select an Image to Edit</h3>
 		<?php 

 			echo $navLinks ;
 		 ?>

 	</div><!-- \ right col -->
 
</div>



<?php
	include("../includes/footer.php");
?>