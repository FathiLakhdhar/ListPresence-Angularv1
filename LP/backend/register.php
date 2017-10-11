<?php
include 'config.php';

$data = array();
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if (!empty($request))
{
    //echo json_encode(var_dump($request));
    $firstname = $request->firstname;
    $surname = $request->surname;
    $email = $request->email;
    $password = $request->password;
    $age = $request->age;
    $gender = $request->gender;
    
    
    if ( !empty($firstname) && !empty($surname) && !empty($email) && !empty($password) && !empty($age) && !empty($gender) )
    {
        
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            if(isExistEmail($bdd, $email)){
                //compte exist
                $data= array(
                'success'=> false,
                'message'=> 'ERROR EMAIL_EXIST'
                );
            }else{
                //insert Data
                $req = $bdd->prepare('INSERT INTO user (role, firstname, surname, email, password, age, gender, isActive, registered) VALUES(:role, :firstname, :surname, :email, :password, :age, :gender, false, now())'); 
                $req->execute(array(
                    'role' => serialize(array("ROLE_TEACHER")), 
                    'firstname' => $firstname, 
                    'surname' => $surname, 
                    'email' => $email, 
                    'password'=> md5($password),
                    'age'=> $age,
                    'gender'=> $gender
                    ));
                $data= array(
                'success'=> true,
                'message'=> 'NEW USER'
                );
                
            }
        }else{
            $data= array(
            'success'=> false,
            'message'=> 'ERROR VALIDATE_EMAIL'
            );
        }
        
    }else{
        $data= array(
        'success'=> false,
        'message'=> 'ERROR EMPTY'
        );
    }
    
    
    echo json_encode($data);
    
}




function isExistEmail($bdd, $email){
    $req= $bdd->prepare('SELECT * FROM user WHERE email=:email');
    $req->execute(array('email' => $email));
    $user= $req->fetch();
    if(!empty($user)){
        return true;
    }else{
        return false;
    }
}