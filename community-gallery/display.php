<?php
require_once("login/classes/Login.php");

$login = new Login(); 

if($login->isUserLoggedIn() == true){
	
// Lets grab the ID of the authenticated user that will create this blog engtry. Thye are therefor the "author".
	$author_id = $_SESSION['user_id'];
}

// Define Variables
$idPrev = "";
$idNext = "";
$nextPrevButtons = "";
$imageid ="";
$user_id ="";
$author_id = "";
$raterid = "";
$average_rating = "";
$rater_id = "";
$profile_image = "";
$authId = "";
$beFirst = "";

include ("includes/header.php");
include ("includes/_functions.php");


$id = $_GET['id'];

if(!is_numeric($id)){// just a catchall if the ID is messed with
	header("Location:index.php");
}

$result = mysqli_query($con, "SELECT * FROM communitygallery WHERE id = '$id'") or die(mysqli_error($con));

while($row = mysqli_fetch_array($result)){
	$pageTitle = $row['title'];
}



// NEXT PREVIOUS BUTTONS

//select * from foo where id = (select min(id) from foo where id > 4)
// NEXT/PREVIOUS LINKS
$next= mysqli_query($con,"SELECT id FROM communitygallery WHERE id = (select min(id) from communitygallery where id > '$id') LIMIT 1");
while ($row = mysqli_fetch_array($next)){
	$idNext =  $row['id'];

}
$prev= mysqli_query($con,"SELECT id FROM communitygallery WHERE id = (select max(id) from communitygallery where id < '$id') LIMIT 1");
while ($row = mysqli_fetch_array($prev)){
	$idPrev =  $row['id'];

}

if($idPrev){
	$nextPrevButtons .=  " <a href=\"display.php?id=$idPrev\" class=\"btn btn-info btn-xs\">Previous</a> ";
}else{
	$nextPrevButtons .=  " <a href=\"\" class=\"btn btn-default btn-xs\" disabled>Previous</a> ";
}
if($idNext){
	$nextPrevButtons .= "<a href=\"display.php?id=$idNext\" class=\"btn btn-info btn-xs\">Next</a>";
}else{
	$nextPrevButtons .= "<a href=\"\" class=\"btn btn-default btn-xs\" disabled>Next</a>";
}


?>
<div class="row">
	<div class="col-md-12">
	
		<?php 

			$result = mysqli_query($con, "SELECT * FROM communitygallery JOIN users ON communitygallery.author_id = users.user_id WHERE id = '$id'") or die(mysqli_error($con));
			
			while($row = mysqli_fetch_array($result)):
			
				$picture_id = $row['id'];
				$user_name = ucfirst($row['user_name']);
				$profile_image = $row['profile_img'];
				$authId = $row['author_id']

		?>
		
		<h2 class="display-heading"><?php echo $row['title']; ?></h2>
						
		<div class="display-image-holder">
			<img src="images/display/<?php echo $row['filename'] ?>" class="display-image img-responsive">
		</div>
		<div class="display-info">
			<?php
		if($profile_image === "NULL") {
						$profile_image = "avatar.png";
					}else {
						$profile_image = $profile_image;
					}
		?>
			<h3 class="display-username">
			
				<a class="display-allpost" href="<?php echo BASE_URL ?>/allpost.php?user_id=<?php echo $authId; ?>">
					<img style="border-radius: 10px; width: 40px" src="login/profile-img/resized/<?php echo $profile_image; ?>">
					<?php echo $user_name;?>
				</a>
			</h3>

			<h3 class="display-title"><?php echo $row['title']; ?> </h3>
						
			<div class="display-description"><?php echo nl2br($row['description']) ?></div>

				
					
			<?php	
				if(isset($_SESSION['user_id'])) {

					$raterid = $_SESSION['user_id'];		
		
					$rating = mysqli_query($con, "SELECT * FROM image_rating WHERE picture_id = $picture_id AND rater_id = $raterid");
					$rowcount = mysqli_num_rows($rating);
					if($rowcount === 0) {
						$average = mysqli_query($con, "SELECT AVG(rating) FROM image_rating WHERE picture_id = $picture_id");
							while($row = mysqli_fetch_array($average)):
								$beFirst = "<h3 class=\"be-first\"> BE THE FIRST TO </h3>";
								$average_rating = ($row['AVG(rating)'] !== null) ? round($row['AVG(rating)'], 1) : null;

								if($average_rating == 0) {
									echo "<div class=\"ratings-table\">";
									echo "<div class=\"display-rating-form\">";
									echo "<h4>$beFirst</h4>";
										include("ratingsform.php"); 
									echo "</div>";
									
								}else {
									echo "<div class=\"ratings-table\">";
									echo "<div class=\"display-rating-form\">";
										include("ratingsform.php"); 
									echo "</div>";

									echo "<h4 class=\"average-rating-text\">Average Rating for this picture </h4>";

									echo "<p class=\"average-rating\"> Average: " . $average_rating . " out of 5</p>";
									
									$totatrater = mysqli_query($con, "SELECT * FROM image_rating WHERE picture_id = $picture_id");
									$rated_by = mysqli_num_rows($totatrater);
									echo "<p class=\"rated-by\"> From ". $rated_by . " members</p>";
								}
								
					

							endwhile;
				}else {
				
				?>
				<div class ="done-ratings-table">
					<h2 class="rating-heading">Ratings</h2>
					<p class="rating-done">You have already rated this picture</p>
					<?php

						$howmany = "";

						$ratingsCheck = mysqli_query($con,"SELECT rating FROM image_rating WHERE picture_id = $picture_id AND rater_id = $raterid");
						

						while($row = mysqli_fetch_array($ratingsCheck)):
							$howmany =  $row['rating'];
							include("checkratings.php");
						endwhile;
					?>

					<h4 class="average-rating-text">Average Rating for this picture </h4>
				
			<?php
					$average = mysqli_query($con, "SELECT AVG(rating) FROM image_rating WHERE picture_id = $picture_id");
					
					while($row = mysqli_fetch_array($average)):
						$average_rating = round($row['AVG(rating)'], 1);
						echo "<p class=\"average-rating\"> Average: " . $average_rating . " out of 5</p>";
					
						$totatrater = mysqli_query($con, "SELECT * FROM image_rating WHERE picture_id = $picture_id");
						$rated_by = mysqli_num_rows($totatrater);
						echo "<p class=\"rated-by\"> From ". $rated_by . " members</p>";
				"</div>";
						
			endwhile;
				} 
				echo "</div>";
			?>
		
		
				</div>	
			
		
	
				<?php	
		}	?>				

<?php endwhile; ?>	
</div>		
<div class="nextPrevBtnz"><?php echo $nextPrevButtons; ?></div>	</div>	
	
<?php include ("includes/footer.php"); ?>
	

