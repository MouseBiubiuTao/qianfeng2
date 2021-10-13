<?php

  include './06_base.php';

  # 删除数据库中的某一个数据
  # DELETE 关键字
  # 删除 哪一个表 哪一个数据

  // $sql = 'DELETE FROM `student` WHERE `gender`="男" AND id < 10';
  $sql = 'DELETE FROM `student` WHERE `gender`=1 AND id > 4';
  exec_cud($conn,$sql);
  closedb($conn);
?>
