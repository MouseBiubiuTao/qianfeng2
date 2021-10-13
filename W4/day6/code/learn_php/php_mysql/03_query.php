<?php

  # 链接到数据库
  $conn = mysqli_connect('localhost', 'root', '123456','campus');

  # 要执行对应的 sql 语句
  # 准备一个 sql 语句
  $sql = 'SELECT * FROM student';

  # php 中使用 mysql_query() 来执行 sql 语句
  # 参数1： 你要执行的 sql 语句
  # 参数2： 你使用那个数据库链接信息（可以不写，默认使用距离最近的一次数据库信息）
  # 返回值： 就是执行 sql 语句的结果
  #    成功： 返回一个结果
  #    失败： 返回一个 false
  $res = mysqli_query($conn,$sql);
  // print_r($res);
  // var_dump($res);//如果查询失败 则$res为false

  # 做一个条件判断
  # 如果失败了值为false，那么我给出一个失败信息
  if (!$res) {
    # 如果能进入到 if 条件内部，证明 !$res 是 true，$res 就是 false
    # 如果进入不到 if 条件内部，证明 !$res 是 false，$res 就是 true

    # php 里面有一个方法叫做 die
    # 参数： 是一个信息
    die('error for mysql: ' . mysqli_error($conn));
  }

  var_dump($res);//resource(4) of type (mysql result)
  // // var_dump(1111);

  mysqli_close($conn);
  echo 'db closed!';

?>
