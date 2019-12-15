<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
$dir = 'sqlite:./serverNots.sqlite';

$parent = -1;
if (isset($_POST['parent'])) {
    $parent = $_POST['parent'];
}

$child = -1;
if (isset($_POST['child'])) {
    $child = $_POST['child'];
}

if ($parent > -1 && $child > -1) {
    $SQL = "UPDATE sample SET parent=$parent WHERE id = $child";
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

find_child(0);
$res = array('result' => 'TRUE', 'data' => $arry);

echo json_encode($res);
