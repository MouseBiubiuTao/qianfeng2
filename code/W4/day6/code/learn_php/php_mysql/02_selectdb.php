<?php

  # 链接到数据库
  $conn = mysqli_connect('localhost', 'root', '123456','campus');
  print_r($conn);

  //进行一系列增删改查（CreateRetrieveUpdateDelete CRUD）

  // 关闭数据库连接 释放连接资源
  mysqli_close($conn);
  echo 'db closed!';

?>
