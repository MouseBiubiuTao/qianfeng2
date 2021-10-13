<?php

  include './06_base.php';

  # 拿到前台传递的数据
  # 再地址栏传递过来的信息我们使用 $_GET 方式获取

  $username = $_GET['username'];
  $password = $_GET['password'];

  $sql = "SELECT * FROM `user` WHERE `name`='$username' AND `password`='$password'";

  // 去表中查询
  $res = mysql_query($sql);

  if (!$res) {
    die('error for mysql: ' . mysql_error());
  }

  // 解析查询结果
  $row = mysql_fetch_assoc($res);

  // 可以判断
  // 如果 $row 有东西证明我用你给我的用户名和密码查到数据了
  // 如果 $row 没有东西证明我用你给我的用户名和密码没有查到数据

  if (!$row) {
    echo '用户名或密码不正确！';
  } else {
    // 登录成功
    // 直接跳转页面
    // 用 php 控制前端跳转页面
    // 告诉浏览器，把你的 location 地址变成  ./index.html
    header('location: ./home.html');
  }
?>
