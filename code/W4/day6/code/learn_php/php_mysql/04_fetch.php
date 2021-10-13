<?php

  header('content-type:text/html;charset=utf-8;');

  # 链接到数据库
  $conn = mysqli_connect('localhost', 'root', '123456','campus');

  # 准备一个 sql 语句
  $sql = 'SELECT * FROM student';

  # php 中使用 mysql_query() 来执行 sql 语句
  $res = mysqli_query($conn,$sql);

  # 做一个条件判断
  if (!$res) {
    die('error for mysql: ' . mysqli_error($conn));
  }

  # 先准备一个 空数组
  $dataArr = array();

  # 先解析楚第一次结果
  $row = mysqli_fetch_assoc($res);
  // print_r($row);

  while ($row) {
    // 进来以后，证明解析出来又东西
    // 丢到数组里

    # array_push(你要追加到哪个数组，你要追加的内容) 向数组中追加内容
    array_push($dataArr, $row);
    // 再来一次
    $row = mysqli_fetch_assoc($res);
  }

  // # 当循环结束以后，数组里面应该有 很多 信息了
  // print_r($dataArr);

  // 获取$dataArr的数据长度
  $arrlength=count($dataArr);
  // 遍历$dataArr的全部下标
  for($i=0;$i<$arrlength;$i++){
    print_r($dataArr[$i]);
    echo "<br>";
  }

  # 关闭数据库链接
  # mysql_close(你要关闭的链接信息)
  # 可以不关闭
  mysqli_close($conn);
  echo 'db closed!';
?>
