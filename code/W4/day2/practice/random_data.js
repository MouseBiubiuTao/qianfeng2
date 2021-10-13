// 学生ID	学生姓名	学生年龄	学生性别	学生班级	学生薪水
function Student(id, name, age, gender, clazz, salary) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.clazz = clazz;
    this.salary = salary;
}

/* 预备生成随机姓名和性别 */
const firstName = "赵钱孙李周吴郑王冯陈楚魏蒋沈韩杨朱秦尤许何吕施章";
const middleaName = "氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙";
const lastName = "一二三四五六七八九十";
const gender = "男女";

/* 获得区间随机数 */
const getRandom = (a, b) => a + parseInt(Math.random() * (b - a + 1));

/* 生成的指定长度的number字符串 例如：0023 0006 */
function createLengthedNumber(num, len) {
    let str = "";
    for (let i = 0; i < len - num.toString().length; i++) {
        str += "0";
    }
    str += num.toString();
    return str;
}

/* 生成随机姓名 */
function createRandomName() {
    return `${firstName[getRandom(0, firstName.length - 1)]}${
        middleaName[getRandom(0, middleaName.length - 1)]
    }${lastName[getRandom(0, lastName.length - 1)]}`;
}

/* 创建指定数量的学生数据 以数组的形式返回 */
function getStudents(n) {
    const arr = [];
    for (let i = 1; i < n + 1; i++) {
        const stu = new Student(
            createLengthedNumber(i, 4),
            createRandomName(),
            getRandom(20, 40),
            gender[getRandom(0, gender.length - 1)],
            getRandom(2101, 2199),
            getRandom(5000, 30000)
        );
        arr.push(stu);
    }

    return arr;
}
