module.exports = {
  async up(db, client) {
    const adminEmail = 'admin@example.com';
    const existingAdmin = await db.collection('users').findOne({ email: adminEmail });

    if (!existingAdmin) {
      await db.collection('users').insertOne({
        name: 'Admin User',
        email: adminEmail,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Admin User seeded successfully');
    } else {
      console.log('Admin User already exists, skipping seed');
    }
  },

  async down(db, client) {
    // Optional: Undo the seed. Usually for seeds we might want to keep data, but strictly speaking 'down' should reverse 'up'.
    // await db.collection('users').deleteOne({ email: 'admin@example.com' });
  }
};
