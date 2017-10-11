<?php
include 'config.php';

//echo var_dump($_GET);
$data=[];
if(!empty($_GET) && !empty($_GET['email'])){
    $email = $_GET['email'];
    //echo $email;

    $req= $bdd->prepare("SELECT c.id, c.name, c.id_teacher, case when c.archive = true then 'true' else 'false' end as archive FROM class c, user u WHERE u.id=c.id_teacher AND u.email=:email");
    $req->execute(array('email' => $email));
    $class= $req->fetchAll();

    $data=array(
        'success'=>true,
        'message'=> 'success',
        'class'=>$class
    );

}else{
    $data=array(
        'success'=>false,
        'message'=> 'ERROR METHOD GET'
    );
}

echo json_encode($data);