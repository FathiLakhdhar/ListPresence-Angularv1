<?php
include 'config.php';

$data = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(!empty($request)){
    
    if(!empty($request->id_class) && !empty($request->id_teacher) && !empty($request->archive)){

        $req = $bdd->prepare('UPDATE class SET archive = :archive WHERE id = :id_class AND id_teacher= :id_teacher'); 
        $req->execute(array('archive' => $request->archive, 'id_class' => $request->id_class, 'id_teacher'=>$request->id_teacher));
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
