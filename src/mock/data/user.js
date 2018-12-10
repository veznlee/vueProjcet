import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'http://liguixing.com/wp-content/uploads/2018/12/logo-1.png',
    name: '李老表'
  }
];

const Users = [];

let Random = Mock.Random;
for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Random.guid(), // 随机id
    name: Random.cname(), // 随机中文名
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1, // 自增长年龄，18-60，每次加1
    birth: Random.date(),  // 随机出生日期
    sex: Random.integer(0, 1) // 随机性别
  }));
}

export { LoginUsers, Users };
