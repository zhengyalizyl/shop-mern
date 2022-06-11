import bcrypt from 'bcryptjs';

const users = [
    { name: 'zyl', email: 'zyl@qq.com', password: bcrypt.hashSync('123', 10), isAdmin: true },
    { name: 'John Doe', email: 'john@example.com', password: bcrypt.hashSync('123456', 10) },
    { name: 'Jane Doe', email: 'Jane@example.com', password: bcrypt.hashSync('123456', 10) },
];

export default users;