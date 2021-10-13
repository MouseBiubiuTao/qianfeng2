<?php
header('content-type:text/html;charset=utf-8;');

class Car
{
    // var $color;
    function Car($wheels,$price,$color="green") {
        $this->wheels = $wheels;
        $this->price = $price;
        $this->color = $color;
    }
    function what_color() {   
        return $this->color;
    }
}

function print_vars($obj) {
    foreach (get_object_vars($obj) as $prop => $val) {
        echo "$prop = $val";
    }
}

// 使用 new 语句实例化一个对象（类）。
$herbie = new Car(3,100,"white");

// 输出变量 $herbie 的属性。
echo "herbie: Properties<br>";
print_vars($herbie);
echo '<br>';

print_r($herbie->price);
echo '<br>';

print_r($herbie->what_color());
echo '<br>';

?> 