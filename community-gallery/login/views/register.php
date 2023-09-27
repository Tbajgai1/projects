
<?php

// show potential errors / feedback (from registration object)
if (isset($registration)) {
    if ($registration->errors) {
        foreach ($registration->errors as $error) {
            echo "<div class=\"registerMsgErr\"> $error </div>";
        }
    }
    if ($registration->messages) {
        foreach ($registration->messages as $message) {
            echo "<div class=\"registerMsg\"> $message </div>";
        }
    }
}
?>

<!-- register form -->

<form method="post" action="register.php" name="registerform" style="padding:4rem" enctype="multipart/form-data">
        <p class="text-center h1">Register</p>
        <div style="display:flex; justify-content:center; width: 50%; margin: 2rem auto">
            <div style="flex: 1">
                <label for="profile-image"><i class="fas fa-user fa-lg me-3 fa-fw"></i>Profile Image</label>
                <input type="file" name="myfile" class="login_input form-control">
              
            </div>
        </div>

        <div style="display:flex; justify-content:center; width: 50%; margin: 2rem auto">
            <div style="flex: 1">
                <!-- the user name input field uses a HTML5 pattern check -->
                <label for="login_input_username" style="font-size: 1.7rem">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i> Username <span style="color: red; font-size:1.12rem">*(only letters and numbers, 2 to 64 characters)</span>
                </label>
                <input id="login_input_username" class="login_input form-control" type="text" pattern="[a-zA-Z0-9]{2,64}" name="user_name" required />
            </div>
        </div>

        <div style="display:flex; justify-content:center; width: 50%; margin: 2rem auto">
            <div style="flex: 1">
                <!-- the email input field uses a HTML5 email type check -->
                <label for="login_input_email" style="font-size: 1.7rem">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>User's email
                </label>
                <input id="login_input_email" class="login_input form-control" type="email" name="user_email" required />
            </div>
        </div>

        <div style="display:flex; justify-content:center;  width: 50%; margin: 2rem auto">
            
            <div style="flex: 1;">
                <label for="login_input_password_new" style="font-size: 1.7rem">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>Password (min. 6 characters)
                </label>
                <input id="login_input_password_new" class="login_input form-control" type="password" name="user_password_new" pattern=".{6,}" required autocomplete="off" />
            </div>
        </div>
        <div style="display:flex; justify-content:center; width: 50%; margin: 2rem auto">
            <div  style="flex: 1;">
                <label for="login_input_password_repeat" style="font-size: 1.7rem"> 
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>Repeat password
                </label>
                <input id="login_input_password_repeat" class="login_input form-control" type="password" name="user_password_repeat" pattern=".{6,}" required autocomplete="off" />
            </div>
        </div>
        <div style="display:flex; justify-content:center; margin-bottom: 2rem">
            <input type="submit"  name="register" value="Register" style="background-color: #4CAF50; /* Green */
                border: none;
                color: white;
                padding: 15px 32px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                margin: 4px 2px;
                cursor: pointer;
                -webkit-transition-duration: 0.4s; /* Safari */
                transition-duration: 0.4s;
                width: 50%;
                margin-top: 2rem"
            />
        </div>
        <!-- backlink -->
        <div style="display: flex; justify-content: center; margin-top: 3rem">
            <a href="index.php" class="back-home" style="width: 30%; padding: 10px; border: 2px solid green; text-align: center; color: green; text-decoration: none">Back to Login Page</a>
        </div>
</form>






