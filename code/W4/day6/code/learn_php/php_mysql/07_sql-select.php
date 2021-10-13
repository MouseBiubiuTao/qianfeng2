<?php

  // 引入外部PHP 获得字符集声明和数据库连接对象$conn
  include './06_base.php';

  # 截取
  # LIMIT 关键字
  # LIMIT 从第几个开始，查多少条
  // $sql = 'SELECT * FROM student WHERE `name` LIKE "%三%"';
  $sql = 'SELECT * FROM `student` WHERE `name` LIKE "%三%" ORDER BY `gender` DESC LIMIT 1, 3';
  exec_query($conn,$sql);
  closedb($conn);
?>
