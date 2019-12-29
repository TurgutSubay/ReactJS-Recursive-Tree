<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
$dir = 'sqlite:./serverNots.sqlite';

$id = -1;
if (isset($_POST['id'])) {
    $id = $_POST['id'];
} else {
    $res = array('result' => 'FALSE', 'data' => '');
    echo json_encode($res);
}
$text = '';
if (isset($_POST['text'])) {
    $text = $_POST['text'];
} else {
    $res = array('result' => 'FALSE', 'data' => '');
    echo json_encode($res);
}

if ($id > -1) {
    $SQL = "UPDATE sample SET text='$text' WHERE id = $id";
    $db2 = new PDO($dir) or die('cannot open the database');
    $stmt = $db2->prepare($SQL);
    $stmt->execute();
    $db2 = null;
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
    global $arry;
    global  $dir;
    $SQL2 = "SELECT * FROM sample  WHERE  id>$id order by parent, id";
    $db2 = new PDO($dir) or die('cannot open the database');
    foreach ($db2->query($SQL2) as $row1) {
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $row1['caption'], 'text' => $row1['text']];
    }
    $db2 = null;
}

//find_child(0);
//myList(0);

$res = array('result' => $text, 'data' => $arry);

echo json_encode($res);
