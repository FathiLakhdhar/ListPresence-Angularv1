<?php
include 'config.php';



$roles= ['ROLE_ADMIN','ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_WORKER'];
$users= [];
//echo serialize($roles);
if(!empty($_GET) ){
    $roles = json_decode($_GET['roles']);
}
$sql="SELECT `id`,`firstName`,`surname`,`email`,`gender`,`age`,`registered`,case when isActive = TRUE then 'true' else 'false' end as isActive,`phone`,`address`,`about`,`picture`,`id_class`  FROM `user` ";
    $numRoles = count($roles);
if($numRoles > 0){
    $sql.='WHERE ';
}
$i = 0;
foreach ($roles as $role){
    
    if(++$i === $numRoles) {
        $sql.= 'role LIKE "%'.$role.'%"';
    }else{
        $sql.= 'role LIKE "%'.$role.'%" OR ';
    }
}
$req = $bdd->prepare($sql);
$req->execute();


$users= $req->fetchAll();



echo json_encode($users);