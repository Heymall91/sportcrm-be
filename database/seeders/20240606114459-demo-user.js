"use strict";
const argon2 = require('argon2');
const { v4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: v4(),
        firstName: "Admin",
        lastName: "Admin",
        phone: "+1(111)1111111",
        email: "admin@gmail.com",
        password: await argon2.hash("Admin123"),
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        firstName: "John",
        lastName: "Doe",
        phone: "+1(111)1111111",
        email: "john_doe@gmail.com",
        password: await argon2.hash("john_doe"),
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        firstName: "John",
        lastName: "Doe",
        phone: "+1(111)1111111",
        email: "john@gmail.com",
        password: await argon2.hash("12345678"),
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        firstName: "John",
        lastName: "Doe",
        phone: "+1(111)1111111",
        email: "doe@gmail.com",
        password: await argon2.hash("12345678"),
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: v4(),
        firstName: "Guest",
        lastName: "Guest",
        phone: "+1(111)1111111",
        email: "guest@gmail.com",
        password: await argon2.hash("password"),
        gender: "male",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};