<?php
include 'config.php';

$data = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


$data=[];

if (!empty($request))
{

    if ( !empty($request->date) && !empty($request->list) )
    {
    $date = $request->date;
    $d = DateTime::createFromFormat('Y-m-d H:i:s', $date);
    $date=$d->format('Y-m-d H:i:s');
    $list = $request->list;
    //echo json_encode($list[0]->present);
    

    $req = $bdd->prepare("INSERT INTO `presence` (`id_user`,`isPresent`, `presentAt`)VALUES (:id_user, :isPresent, :presentAt)"); 
    
    foreach ($list as $value){
        $req->execute(array(
            'id_user'=> $value->id_user,
            'isPresent'=> $value->isPresent,
            'presentAt'=> $date
        ));
        //echo json_encode($value);
    }
    $data= array(
                'success'=> true,
                'message'=> 'NEW ListPresent'
                );

    
    }else{
        $data= array(
                'success'=> false,
                'message'=> 'ERROR EMPTY'
                );
    }
    


}else{
    $data= array(
                'success'=> false,
                'message'=> 'ERROR EMPTY REQUEST'
                );
}


echo json_encode($data);

