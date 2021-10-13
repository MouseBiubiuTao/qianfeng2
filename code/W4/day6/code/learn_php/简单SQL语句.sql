-- 创建数据库campus
create database campus 
-- 字符集设置为utf8
charset=utf8;

-- 创建数据表student
create table student (
    -- id整型主键（数据记录的唯一标志）自增长
    id int primary key auto_increment,
    -- name最大20长度的可变长字符串唯一（不允许重名）不许为空
    name varchar(20) unique not null,  
    -- gender整型不许为空
    gender int not null,
    -- classid（班级外键,即班级表的主键）整型默认值为0
    classid int default 0
);

-- 插入学生数据的姓名和性别
insert into student(name,gender) 
-- 姓名三将军，性别男
values("三将军",1);


insert into student(name,gender) values("胡汉三",1);

-- 一次性插入多条数据
insert into student(name,gender) values
("斯古拉寺赵四",1),
("烧饼武大",0),
("六小龄童",1);


-- 删除数据库campus
drop database campus;

-- 删除数据表student
drop table student;

-- 删除姓名为六小龄童的数据
delete from student where name = "六小龄童";

-- 修改表数据，设置id=1的那条记录的姓名为张三丰
update student set name="张三丰" where id=1;

-- 查询全部学生记录的全部字段
select * from student;

-- 查询指定字段
select name,gender from student;

-- 查询性别为女的记录的全部字段
select * from student where gender = 0;

-- 查询id>1的全部记录
select * from student where id >= 1;
-- 查询id>=1且性别为男的全部记录
select * from student where id >= 1 and gender=1;

-- 复杂条件查询
select * from student where (id >= 1 and gender=1) or (id<10 and gender=0);
-- 模糊查询：名字中带三的
select * from student where name like "%三%";

-- 对查询结果排序
select * 
from student 
where name like "%三%"
-- 对查询结果按班级id升序
-- order by classid asc;
-- 对查询结果按班级id降序
order by classid desc;

-- 对查询结果取前3条
select * 
from student 
where name like "%三%"
-- order by classid asc;
order by classid desc
-- 对查询结果取前3条
limit 3;
