<?php

  include './06_base.php';

  # INSERT INTO `student` () VALUES() 增加指定字段
  # 剩下的字段没有设置，没有的统一走默认值
  $sql = 'INSERT INTO `student` (`name`, `classid`) VALUES("萧十一郎", 2)';

  exec_cud($conn,$sql);

  closedb($conn);
?>
