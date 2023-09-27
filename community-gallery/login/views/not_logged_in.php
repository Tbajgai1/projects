
<?php

// show potential errors / feedback (from login object)
if (isset($login)) {
    if ($login->errors) {
        foreach ($login->errors as $error) {
            echo "<h4 style=\"color:red; text-align:center; margin-top: 1rem\"> $error  </h4>";
        }
    }
    if ($login->messages) {
        foreach ($login->messages as $message) {
            echo "<h4 style=\"color:green; text-align:center\"> $message  </h4>";
        }
    }
}
?>

<!-- login form box -->
<div class="col-12 col-lg-8 col-lg-6 col-xl-5 login-background" style="width: 100%; display: flex; justify-content: center">
    <div class="card-body p-5 text-center" style="width: 50%" >

        <h3 style="font-size: 4rem; margin-bottom: 2rem">Sign in</h3>

        <form method="post" action="index.php" name="loginform" style="display:flex; flex-direction:column; justify-content: center">

            <label for="login_input_username" style="font-size: 2rem"><i class="fas fa-user fa-lg me-3 fa-fw"></i>Username</label>
            <input style="margin-bottom: 3rem; " id="login_input_username" class="login_input form-control" type="text" name="user_name" required />

            <label for="login_input_password" style="font-size: 2rem"><i class="fas fa-key fa-lg me-3 fa-fw"></i></i>Password</label>
            <input style="margin-bottom: 3rem; padding: 1rem;" id="login_input_password" class="login_input form-control" type="password" name="user_password" autocomplete="off" required />

            <input type="submit"  class="btn btn-primary btn-lg btn-block" name="login" value="Log in" />

        </form>
        <div style="margin-top: 3rem; font-size: 1.7rem">
            <a href="register.php" >Register new account</a> 
        </div>
    </div>
</div>

          
         
