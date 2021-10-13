<?php

# 解决 php 中文乱码的问题
# 将来我给你输出的内容是 text/html 结构，utf-8 字符集
header('content-type:text/html;charset=utf-8;');

# 条件分支就是  if () {} else if () {} else {}

$num = 50;

if ($num >= 100) {
  echo '大于';
} else {
  echo '小于';
}

?>
