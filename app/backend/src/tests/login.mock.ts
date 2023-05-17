import { query } from "express";

interface Query {
  0: {where: {email: string}}
}
const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

export const usersDataBase =  [
  {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      // senha: secret_admin
  },
  {
    username: 'User',
    role: 'user',
    email: 'user@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  },
  // os logins abaixo são intencionalmente inválidos, pois serão usados nos testes
  {
    username: 'User',
    role: 'user',
    email: '@user.com',
    password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO', 
      // senha: secret_user
  },
  {
    username: 'User',
    role: 'user',
    email: 'invalid.user@user.com',
    password: '$2a$10$HDkFwOMKOI6PTza0F7.YRu1Bqsqb9hx7XkuV7QeYB5dRL4z9DI1Mu',
    // senha: 12345
  },
];

const UsersMock = dbMock.define('users');

UsersMock.$queryInterface.$useHandler((query: string, queryOptions: Query ) => {
  const { where } = queryOptions[0]
  if(query === 'findOne') {
    if(where.email === 'adminasdf@admin.com') {
      return null
    }
    const result = usersDataBase.find((user) => user.email === where.email)
    return result
  }
})

export default UsersMock;