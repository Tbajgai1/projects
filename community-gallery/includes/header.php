<?php
include("mysql_connect.php");
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
   

    <title>
<?php 
   if(isset($pageTitle)){
    echo  "Gallery - " . $pageTitle;
   }else{
    echo "Gallery";
   }
 ?>
  </title>


<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>


<link href="<?php echo BASE_URL ?>css/styles.css" rel="stylesheet">
<link href="<?php echo BASE_URL ?>css/bootstrap.css" rel="stylesheet">

</head>

  <body>

    

      <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <!--  We'll use the BASE_URL set in the connection script to resolve all links -->
            <a class="navbar-brand" href="<?php echo BASE_URL ?>">Gallery</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                          
                  <li><a href="<?php echo BASE_URL ?>admin/insert.php">Upload Image</a></li>
                  <li><a href="<?php echo BASE_URL ?>admin/edit.php">Edit image</a></li>
                
            </ul>
            <ul class="nav navbar-nav navbar-right">
            
              <li style="margin-top: 1.5rem;">
              
                <?php  
                $user_id = "";
                $userMessage = "";
                $profileImg = "";

                if(isset($_SESSION['user_id'])){  
                  $user_id = $_SESSION['user_id'];

			            $result = mysqli_query($con, "SELECT * FROM users  WHERE user_id = '$user_id'") or die(mysqli_error($con));
                  while($row = mysqli_fetch_array($result)):
                    $profileImg = $row['profile_img'];
                  endwhile;

                    $userMessage =  "<span style=\"color:green\">Logged in as " . ucfirst($_SESSION['user_name']) . "</span> "; 
                    
                    if($profileImg === "NULL") {
                      $profileImgs = "avatar.png";
                    }else {
                      $profileImgs = $profileImg;
                    }
                    ?>

                    <img style="border-radius: 10px; width: 30px" src="login/profile-img/resized/<?php echo $profileImgs; ?>">
                    <?php echo $userMessage ?> 
                    <a style="display:inline" href="<?php echo BASE_URL ?>login/index.php?logout"> LOG OUT </a>
                  <?php }else{ ?>
                    <a href="<?php echo BASE_URL ?>login/index.php"> <?php echo "LOGIN"; ?> </a>
                  <?php }
                ?>
              
              </li>
                  
            </ul>
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>

    <div class="container">

      

    




