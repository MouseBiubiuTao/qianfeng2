<?php

header('content-type:text/html;charset=utf-8;');

# 再 php 里面
# 单引号和双引号是有区别
# 单引号不能解析变量
# 双引号可以解析变量

// for ($i = 0; $i < 3; $i++) {
//   // echo $i;

//   // 双引号中可以解析变量的值
//   echo "我是当前的第$i 个";
//   echo '<br>';
// }
// echo '<br>';

# 字符串拼接的问题
# 再 php 里面使用 点 进行字符串拼接

// for ($i = 0; $i < 3; $i++) {
//   echo '我是当前的第'.$i.'个';
//   echo '<br>';
// }

$count = 0;
while($count<3){
  $count += 1;
  echo $count;
  echo '<br>';
}

?>
