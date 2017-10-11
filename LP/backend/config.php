<?php

$host = "localhost";
$dbname = "ng-lp";
$root = "root";
$pwd = "";

try {
    $bdd = new PDO('mysql:host='.$host.';dbname='.$dbname, $root, $pwd); 
} 
catch(Exception $e) {
    die('Erreur : '.$e->getMessage()); 
}