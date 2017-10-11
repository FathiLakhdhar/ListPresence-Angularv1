<?php
include 'config.php';



$data = array();

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (!empty($request))
{
    if ( (!empty($request->email) && !empty($request->password)) )
    {
        $req= $bdd->prepare('SELECT * FROM user WHERE email=:email AND password=:pwd AND isActive=true');
        $req->execute(array('email' => $request->email,'pwd' => md5($request->password)));
        $user= $req->fetch();
        if(!empty($user)){
            $data= array(
            'success'=> true,
            'message'=> 'success',
            'user'=> $user
            );
        }else{
            $data= array(
            'success'=> false,
            'message'=> 'email ou  password incorrect'
            );
        } 
        
    }
    else
    {
        $data= array(
        'success'=> false,
        'message'=> 'error method Post'
        );
    }
    
    echo json_encode($data);
}

