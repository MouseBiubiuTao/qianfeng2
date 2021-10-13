<?php

  # 链接到数据库
  # 再 php 里面有一个方法
  # mysql_connect() 用来和数据库建立链接的
  # 接受三个参数
  # 参数1： 数据库的 ip 地址 localhost || 127.0.0.1
  # 参数2： 数据库用户名 root
  # 参数3： 数据库密码 root
  # 返回值： 链接信息
  #   成功： 链接信息
  #   失败： false

  $conn = mysqli_connect('localhost', 'root', '123456');

  var_dump($conn);//object(mysqli)#1 (19)...
?>
