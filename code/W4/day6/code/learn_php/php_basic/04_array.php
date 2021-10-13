<?php
# php 的数组
# php 没有对象这个东西

# 索引型数组
$arr = array(1, 2, 3); # 等价于 [1, 2, 3]
// var_dump($arr);//array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) }
// echo '<br>';

# 关联型数组
# 等价于 { name: 'Jack', age: 18 }
$arr2 = array('name' => 'Jack', 'age' => 18,'gender'=>false); 
// var_dump($arr2);//array(2) { ["name"]=> string(4) "Jack" ["age"]=> int(18) }
// echo '<br>';

# $arr2 就是我们理解意义上的对象
# 访问成员不能 点
# 只能用 ['成员名称']

var_dump($arr[0]);//int(1)
echo '<br>';
var_dump($arr2['name']);//string(4) "Jack"
echo '<br>';


# 将来我们是要和 php 交互

# 每一个语言都已一套自己转 json 的方法

# php 转换 json 格式使用的是
# json_encode  =>  把自己的数据类型转成 json 格式的字符串
# json_decode  =>  把 json 格式的字符串转成给自己的数据类型

// 将数组编码为json
$str = json_encode($arr2);
var_dump($str);//string(24) "{"name":"Jack","age":18}"
echo '<br>';

// 将json字符串解码为php数组
var_dump(json_decode($str));//object(stdClass)#1 (2) { ["name"]=> string(4) "Jack" ["age"]=> int(18) }
echo '<br>';

?>
