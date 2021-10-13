<?php

  # 只要再这个文件里面把 base.php 里面的代码引入
  # include 引入一个 php 文件使用的
  include './06_base.php';

  $res = mysqli_query($conn,'SELECT * FROM student');

  $arr = array();

  // 循环fetch_assoc取出对象 丢给$row
  while ($row = mysqli_fetch_assoc($res)) {
    // 将row追加到arr
    array_push($arr, $row);
  }

  // print_r(json_encode($arr));
  read_arr($arr);
  
  mysqli_close($conn);
  echo 'db closed!';
?>
