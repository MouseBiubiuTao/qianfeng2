<?php

  header('content-type:text/html;charset=utf-8;');
  
  $conn = mysqli_connect('127.0.0.1', 'root', '123456','campus');

  function read_arr($dataArr){
    $arrlength=count($dataArr);
    for($x=0;$x<$arrlength;$x++){
      print_r($dataArr[$x]);
      echo "<br>";
    }
  }

  function closedb($conn){
    mysqli_close($conn);
    echo 'db closed!';
  }

  function exec_query($conn,$sql){
    $res = mysqli_query($conn,$sql);

    $arr = array();
    while ($row = mysqli_fetch_assoc($res)) {
      array_push($arr, $row);
    }
  
    read_arr($arr);
  }

  /* 执行create创建 update更新 delete删除操作 */
  function exec_cud($conn,$sql){
    if($res = mysqli_query($conn,$sql)){
      print_r($res);
    }else{
      echo 'mysql error:'.mysqli_error($conn);
    }
  }

?>
