<?php

  # php 代码写在 "<?php  写在这里  \?\>

  # 注释
  // 双斜线也能注释
  /*
  也可以注释
  */

  # 定义变量
  # $单词
  $num = 100;
  $num2 = 200;
  $num = 101;

  # 向让变量输出再页面上
  # echo 只是让变量输出
  # 因为我是用 页面访问的 这个 php 文件
  # 所以这个变量会输出再 页面上
  // echo $num;//101
  // echo "<br>";

  # 让变量输出
  # 数据类型输出
  // var_dump($num2);//int(200)
  // echo "<br>";

  # 让变量输出
  # 布尔数据类型也能输出
  // echo $num2;
  // echo "<br>";
  // print_r($num2);//100
  // echo "<br>";


  $istuhao = false;
  // echo $istuhao;
  // print_r($istuhao);
  // var_dump($istuhao);//bool(false)
  // echo "<br>";


  // echo array(1, 2, 3);//Notice: Array to string conversion in D:\phpStudy\WWW\ceshi\01_code.php on line 40 Array
  // print_r(array(1, 2, "4"));//Array ( [0] => 1 [1] => 2 [2] => 3 )
  // echo "<br>";

  var_dump(array(1, 2, "4"));//array(3) { [0]=> int(1) [1]=> int(2) [2]=> string(1) "3" }
  // echo "<br>";

?>
