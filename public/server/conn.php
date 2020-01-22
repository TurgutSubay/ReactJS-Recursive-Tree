<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description, Auth, X-Requested-With');

$arry = [];
require 'path.php';
$dir = 'sqlite:'.$path.'/serverNots.sqlite'; //$dir = 'sqlite:./serverNots.sqlite';

function find_child($id)
{
    global $arry;
    global  $dir;
    $SQL2 = "SELECT * FROM sample  WHERE  Parent=$id";
    $db2 = new PDO($dir) or die('cannot open the database');
    foreach ($db2->query($SQL2) as $row1) {
        $noNeed = array('"', '\'');
        $change = array('&quot;', '&apos;');
        $text = str_replace($noNeed, $change, $row1['text']);
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $row1['caption'], 'text' => $text];
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
        $noNeed = array('&quot;', '&apos;');
        $change = array('"', '\'');
        $text = str_replace($noNeed, $change, $row1['text']);
        $caption = str_replace($noNeed, $change, $row1['caption']);
        $arry[] = ['id' => $row1['id'], 'parent' => $row1['parent'], 'caption' => $caption, 'text' => $text];
    }
    $db2 = null;
}

myList(0);
$res = array('result' => true, 'data' => $arry);
echo json_encode($res);
