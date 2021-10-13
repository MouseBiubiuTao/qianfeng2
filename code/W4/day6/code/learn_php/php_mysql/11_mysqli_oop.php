<?php
  header('content-type:text/html;charset=utf-8;');

  $servername = "localhost";
  $username = "root";
  $password = "123456";
  $dbname = "campus";
  
  // 创建链接
  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // 检查链接
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  
  $sql = "INSERT INTO
  student (name, gender, classid)
  VALUES ('你妹1', '0', '-1');";
  
  $sql .= "INSERT INTO
  student (name, gender, classid)
  VALUES ('你妹2', '0', '-1');";
  
  $sql .= "INSERT INTO
  student (name, gender, classid)
  VALUES ('你妹3', '0', '-1');";
  
  
  if ($conn->multi_query($sql) === TRUE) {
    echo "New records created successfully";
} else {
    echo "Error: " . $sql . "" . $conn->error;
  }
  
  $conn->close();
?>