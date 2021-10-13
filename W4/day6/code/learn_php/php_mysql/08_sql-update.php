<?php

  include './06_base.php';

  # 修改数据库中的每一条信息
  # 修改信息使用 UPDATE
  # 更新 哪个表 更新哪个数据 把哪个数据

  // $sql = 'UPDATE `student` SET `age`=400, `score`=100 WHERE `id`>2 AND `id`<9';
  $sql = 'UPDATE `student` SET `classid` =6 WHERE `gender` = 0';
  exec_cud($conn,$sql);
  closedb($conn);

?>
