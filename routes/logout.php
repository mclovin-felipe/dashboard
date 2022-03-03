<?php
session_start();
session_destroy();
echo 'Cerrando sesion.';
sleep(1);
header("location:../index.php")
?>
