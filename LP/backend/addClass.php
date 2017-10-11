<?php
include 'config.php';

$data = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);



if(!empty($request)){
    
    if(!empty($request->name) && !empty($request->email)){
        $req = $bdd->prepare("INSERT INTO `class` SELECT NULL, :name, id, false FROM user WHERE email=:email");
        $req->execute(array(
        'name'=> $request->name,
        'email'=> $request->email
        ));
        $data=array(
            'success'=>true,
            'message'=>'success'
        );
    }else{
        $data=array(
            'success'=>false,
            'message'=>'ERROR EMPTY POST'
        );
    }
}else{
    $data=array(
            'success'=>false,
            'message'=>'ERROR EMPTY REQUEST'
        );
}

echo json_encode($data);