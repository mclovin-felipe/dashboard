<?php
session_start();
if (!is_null($_SESSION['login_user'])) {
  echo 'holaa';
}else{

         header("location: ./routes/error.php");
}
?>
