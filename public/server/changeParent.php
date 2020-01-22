<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
require 'path.php';
$dir = 'sqlite:'.$path.'/serverNots.sqlite'; //$dir = 'sqlite:./serverNots.sqlite';

$parent = -1;
$child = -1;

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['parent'])) {
    $parent = $data['parent'];
} else {
    $res = array('result' => false, 'data' => 'no parent', 'req' => $data);
    echo json_encode($res);
    exit;
}
if (isset($data['child'])) {
    $child = $data['child'];
} else {
    $res = array('result' => false, 'data' => 'no child', 'req' => $data);
    echo json_encode($res);
    exit;
}

if ($parent > -1 && $child > -1) {
    $SQL = "UPDATE sample SET parent=$parent WHERE id = $child";
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
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $row1['caption'], 'text' => $row1['text']];
    }
    $db2 = null;
}

myList(0);
$res = array('result' => true, 'data' => $arry);

echo json_encode($res);
