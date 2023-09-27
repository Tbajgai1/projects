<?php
require_once("login/classes/Login.php");
include ("includes/header.php");

$login = new Login(); 

if($login->isUserLoggedIn() == true){
    
    // Lets grab the ID of the authenticated user that will create this blog engtry. Thye are therefor the "author".
	$author_id = $_SESSION['user_id'];
}

if(isset($_GET['user_id'])) {
    $uid =  $_GET['user_id'];
}

    $filename = "";
    $title ="";
    $id = "";
    $user_name = "";
    $description = "";
    $profileImg = "";
    


    echo "<div class=\"index-card bg-info\">";

        $result2 = mysqli_query($con, "SELECT * FROM communitygallery JOIN users ON communitygallery.author_id = users.user_id WHERE author_id = $uid") or die(mysqli_error($con));
        while($row = mysqli_fetch_array($result2)){

            $profileImg = $row['profile_img'];				
            $filename =  $row['filename'];
            $title =  $row['title'];
            $id =  $row['id']; 
            $user_name = ucfirst($row['user_name']);
            $description = $row['description'];
            echo "<div class=\"index-image-show allpost-cards\">"; 
                
                echo "<div class=\"index-image\"><a href=\"display.php?id=$id\"><img src=\"images/thumbs-square/$filename\"></a></div>";
                echo "<h4>$title</h4>";
                echo "<div class=\"index-description\"> <p>$description <div><a href=\"display.php?id=$id\">Read More...</a></div></p></div>";
            echo "</div>";
        }
         
             
                  if($profileImg === "NULL") {
						$profileImgs = "avatar.png";
					}else {
						$profileImgs = $profileImg;
					}
		?>
                    <div class="allpost-userinfo">
                        <img style="border-radius: 10px; width: 40px" src="login/profile-img/resized/<?php echo $profileImgs; ?>">
                        <span style="font-size: 2rem"><?php echo $user_name; ?></span>
                    </div>			
    </div>	
