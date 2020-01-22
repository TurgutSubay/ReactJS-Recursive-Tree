<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
//$dir = 'sqlite:./serverNots.sqlite';
require 'path.php';
$dir = 'sqlite:'.$path.'/serverNots.sqlite';

$id = -1;
if (isset($_GET['id'])) {
    $id = $_GET['id'];
} else {
    $res = array('result' => false, 'data' => 'No id');
    echo json_encode($res);
    exit;
}

$SQL2 = "SELECT parent FROM sample  WHERE  id = $id";
$db2 = new PDO($dir) or die('cannot open the database');
$stmt = $db2->query($SQL2);
$row = $stmt->fetch();
$parent = $row['parent'];
$db2 = null;

if ($id > -1) {
    $SQL = "DELETE FROM sample WHERE id = $id";
    $db2 = new PDO($dir) or die('cannot open the database');
    $stmt = $db2->prepare($SQL);
    $stmt->execute();
    $db2 = null;
} else {
    $res = array('result' => false, 'data' => 'Negatif id');
    echo json_encode($res);
    exit;
}

function find_child($id)
{
    global $arry;
    global  $dir;
    $SQL2 = "SELECT * FROM sample  WHERE  Parent=$id";
    $db2 = new PDO($dir) or die('cannot open the database');
    foreach ($db2->query($SQL2) as $row1) {
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $row1['caption'], 'text' => $row1['text']];
        find_child($row1['id']);
    }
    $db2 = null;
}

function myList($id)
{
    $db2 = null;
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

$SQL2 = "SELECT parent FROM sample  WHERE  id = $parent";
$db2 = new PDO($dir) or die('cannot open the database');
$stmt = $db2->query($SQL2);
$row = $stmt->fetch();
$parentParent = $row['parent'];
$db2 = null;

$res = array('result' => true, 'activElement' => $parent, 'data' => $arry, 'parent' => $parentParent);
echo json_encode($res);
