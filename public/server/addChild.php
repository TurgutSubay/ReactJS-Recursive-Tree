<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
require 'path.php';
$dir = 'sqlite:'.$path.'/serverNots.sqlite'; //$dir = 'sqlite:./serverNots.sqlite';
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['parent'])) {
    $parent = $data['parent'];
} else {
    $res = array('result' => false, 'data' => 'No Parent', 'req' => $data);
    echo json_encode($res);
    exit;
}

$text = '';
if (isset($data['text'])) {
    $noNeed = array('"', '\'');
    $change = array('&quot;', '&apos;');
    $text = str_replace($noNeed, $change, $data['text']);
}

if (isset($data['caption'])) {
    $caption = $data['caption'];
} elseif (isset($_GET['caption'])) {
    $caption = $_GET['caption'];
} else {
    $res = array('result' => false, 'data' => 'No Caption');
    echo json_encode($res);
    exit;
}
$noNeed = array('"', '\'');
$change = array('&quot;', '&apos;');
$caption = str_replace($noNeed, $change, $caption);

if ($parent > -1) {
    $SQL = "INSERT INTO sample (parent, caption, text) VALUES ($parent,'$caption','$text')";
    $db2 = new PDO($dir) or die('cannot open the database');
    $stmt = $db2->prepare($SQL);
    $stmt->execute();
    $db2 = null;
}

function myList($id)
{
    global $arry;
    global  $dir;
    $SQL2 = "SELECT * FROM sample  WHERE  id>$id order by parent, id";
    $db2 = new PDO($dir) or die('cannot open the database');
    foreach ($db2->query($SQL2) as $row1) {
        $noNeed = array('&quot;', '&apos;');
        $change = array('"', '\'');
        $text = str_replace($noNeed, $change, $row1['text']);
        $caption = str_replace($noNeed, $change, $row1['caption']);
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $caption, 'text' => $text];
    }
    $db2 = null;
}

myList(0);
$SQL = 'SELECT max(id) as id from sample';
$db2 = new PDO($dir) or die('cannot open the database');
$stmt = $db2->query($SQL);
$row = $stmt->fetchObject();
$newId = $row->id;
$db2 = null;

$res = array('result' => true, 'data' => $arry, 'newAdded' => $newId, 'parent' => $parent);

echo json_encode($res);
