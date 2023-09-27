<?php
require_once("login/classes/Login.php");
include("includes/header.php");

$login = new Login(); 

if($login->isUserLoggedIn() == true){
	// $userMessage =  "Logged in as " . $_SESSION['user_name']. " - User ID is " . $_SESSION['user_id'];
	
	// Lets grab the ID of the authenticated user that will create this blog engtry. Thye are therefor the "author".
	$author_id = $_SESSION['user_id'];
}

include ("includes/_functions.php");

	
	$author_id = "";
	$description ="";
	$profileImg = "";


	//////////// pagination
	$getcount = mysqli_query($con,"SELECT COUNT(DISTINCT(author_id)) FROM communitygallery");
	$postnum = mysqli_result($getcount,0);// this needs a fix for MySQLi upgrade; see custom function below
	$limit = 2;
	if($postnum > $limit){
	$tagend = round($postnum % $limit,0);
	$splits = round(($postnum - $tagend)/$limit,0);

	if($tagend == 0){
	$num_pages = $splits;
	}else{
	$num_pages = $splits + 1;
	}

	if(isset($_GET['pg'])){
	$pg = $_GET['pg'];
	}else{
	$pg = 1;
	}
	$startpos = ($pg*$limit)-$limit;
	$limstring = "LIMIT $startpos,$limit";
	}else{
	$limstring = "LIMIT 0,$limit";
	}

	// MySQLi upgrade: we need this for mysql_result() equivalent
	function mysqli_result($res, $row, $field=0) { 
		$res->data_seek($row); 
		$datarow = $res->fetch_array(); 
		return $datarow[$field]; 
	}

?>

<div class="index-row">
	<div class="index-column">
		<h1>Gallery</h1>
		
		<?php 

			$result = mysqli_query($con, "SELECT DISTINCT user_name, user_id, profile_img FROM communitygallery JOIN users ON communitygallery.author_id = users.user_id ORDER BY id DESC $limstring") or die(mysqli_error($con));

			while($row = mysqli_fetch_array($result)){	
				$name = ucfirst($row['user_name']); 
				$uid = $row['user_id'];
				$profileImg = $row['profile_img'];

				
					if($profileImg === "NULL") {
						$profileImgs = "avatar.png";
					}else {
						$profileImgs = $profileImg;
					}
					echo "<div class=\"index-name\">";	?>
						<img style="border-radius: 10px; width: 30px" src="login/profile-img/resized/<?php echo $profileImgs; ?>">	
						<?php	echo "<span class=\"span-name\">$name</span><span class=\"index-name-span\"> <a href=\"allpost.php?user_id=$uid\">More by $name</span>";
					echo "</div>";
				
				echo "<div class=\"index-card\">";
					$result2 = mysqli_query($con, "SELECT * FROM communitygallery WHERE author_id = $uid LIMIT 5") or die(mysqli_error($con));
				
				while($row = mysqli_fetch_array($result2)){
						
						$filename =  $row['filename'];
						$title =  $row['title'];
						$id =  $row['id'];
						$description = $row['description'];

						echo "<div class=\"index-image-show\">";
								echo "<div class=\"index-image\"><a href=\"display.php?id=$id\"><img src=\"images/thumbs-square/$filename\"></a></div>";
								echo "<h4>$title</h4>";
								echo "<div class=\"index-description\"> <p>$description <div style = \"cursor:pointer\"><a href=\"display.php?id=$id\">Read More...</a></div></p></div>";
						echo "</div>";	
					}
			echo "</div>";
			}
	
			?>
	</div>	
		 <br style="clear:both">
</div>
	


<div class="pagination-block">
<?php 

///////////////// pagination links
// if you don't like the formatting, feel free to change. Look into Bootstrap Pagination
if($postnum > $limit){

echo "<strong>Pages:</strong> &nbsp;&nbsp;&nbsp;";
$n = $pg + 1;
$p = $pg - 1;
$thisroot = $_SERVER['PHP_SELF'];
if($pg > 1){
echo "<a href=\"$thisroot?pg=$p\"><< prev</a>&nbsp;&nbsp;";
}
for($i=1; $i<=$num_pages; $i++){
if($i!= $pg){
echo "<a href=\"$thisroot?pg=$i\">$i</a>&nbsp;&nbsp;";
}else{
echo "$i&nbsp;&nbsp;";
}
}
if($pg < $num_pages){
echo "<a href=\"$thisroot?pg=$n\">next >></a>";
}
echo "&nbsp;&nbsp;";
}
////////////// end pagination
?>
</div><!-- / pagination -->
<?php
include ("includes/footer.php");
?></div>