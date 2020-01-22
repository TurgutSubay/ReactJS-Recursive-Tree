<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

require 'path.php';
$dir = 'sqlite:'.$path.'/serverNots.sqlite'; //$dir = 'sqlite:./serverNots.sqlite';
$data = json_decode(file_get_contents('php://input'), true);
$id = -1;
$text = '';

  if (isset($data['id'])) {
      $id = $data['id'];
  } else {
      $res = array('result' => false, 'data' => 'no id', 'req' => $data);
      echo json_encode($res);
      exit;
  }

  if (isset($data['text'])) {
      $noNeed = array('"', '\'');
      $change = array('&quot;', '&apos;');
      $text = str_replace($noNeed, $change, $data['text']);
  } else {
      $res = array('result' => false, 'data' => 'no text');
      echo json_encode($res);
      exit;
  }

if ($id > -1) {
    $SQL = "UPDATE sample SET text='$text' WHERE id = $id";
    $db2 = new PDO($dir) or die('cannot open the database');
    $stmt = $db2->prepare($SQL);
    $stmt->execute();
    $db2 = null;
}

$res = array('result' => true, 'data' => $data);
echo json_encode($res);
