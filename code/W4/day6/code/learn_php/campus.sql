-- 创建校园数据库
create database campus charset=utf8;
use campus;

-- 老师表字段：自增长主键id、姓名（非空）、性别（非空）、课程id（默认0）、是否班主任（默认0）；
create table teacher(
  id integer primary key auto_increment,
  name varchar(10) not null,
  gender integer not null,
  courseid integer default 0,
  isMaster integer default 0
);

-- 学生表字段：自增长主键id、姓名（非空）、性别（非空）、班级id（默认0）；
create table student(
  id integer primary key auto_increment,
  name varchar(10) not null,
  gender integer not null,
  classid integer default 0
);

-- 班级表字段：自增长主键id、名称（非空）、班主任id（默认0）；
create table clazz(
  id integer primary key auto_increment,
  name varchar(20) not null,
  masterid integer default 0
);

-- 课程表字段：自增长主键id、名称（非空）；
create table course(
  id integer primary key auto_increment,
  name varchar(10) not null
);

insert into student(name,gender) values ("张三丰",1);
insert into student(name,gender) values ("野间忠一郎",1);
insert into student(name,gender) values ("二郎神",1);
insert into student(name,gender) values ("郭小四",0);
insert into student(name,gender) values ("隔壁老王",1);
insert into student(name,gender) values ("练过的六爷",1);
insert into student(name,gender) values ("洪七公",1);
insert into student(name,gender) values ("香香八婆",0);
insert into student(name,gender) values ("马英九",1);
insert into student(name,gender) values ("十三姨",0);
insert into student(name,gender) values ("山本五十六",1);
insert into student(name,gender) values ("包租婆",0);

insert into teacher(name,gender) values ("bill",1);
insert into teacher(name,gender) values ("steve",1);
insert into teacher(name,gender) values ("jackma",1);
insert into teacher(name,gender) values ("robin",1);

insert into clazz(name) values ("丐帮");
insert into clazz(name) values ("小刀会");
insert into clazz(name) values ("斧头帮");
insert into clazz(name) values ("天地会");

insert into course(name) values ("Python");
insert into course(name) values ("Java");
insert into course(name) values ("HTML5");
insert into course(name) values ("PHP");