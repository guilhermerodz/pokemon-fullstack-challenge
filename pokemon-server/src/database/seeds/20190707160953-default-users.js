module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          nickname: 'admin',
          password_hash:
            '$2a$08$X99NUFFNVsc/Zr7hJBLxiOQ3X9mN5LuW9osNDjPnTLlJFgciVC6Kq',
          admin: true,
          avatar_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('users', null, {}),
};
