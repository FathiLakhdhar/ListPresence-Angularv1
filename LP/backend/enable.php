<?php
include 'config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$data=[];

if(!empty($request)){
    echo json_encode($request);
    if(isset($request->enable) && isset($request->id_user)){
        $enable = $request->enable;
        $id_user = $request->id_user;
        
        $req = $bdd->prepare('UPDATE user SET isActive = :enable WHERE id = :id_user'); 
        $req->execute(array('enable' => $enable, 'id_user' => $id_user));
        $data= array(
        'success'=> true,
        'message'=> 'UPDATE SUCCESS'
        );
    }else{
        $data= array(
        'success'=> false,
        'message'=> 'ERROR EMPTY DATA'
        );
    }
}else{
    $data= array(
    'success'=> false,
    'message'=> 'ERROR EMPTY REQUEST'
    );
}


echo json_encode($data);