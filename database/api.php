<?php
include("config.php");
$sql = "SELECT * FROM APIS";
	$result = $conn->query($sql);
$data = array();
while ($row = $result->fetch_assoc()){
	$row_data = array(
		'puertos' => $row['puerto']
	);
	array_push($data, $row_data);

}
echo json_encode($data);
?>
