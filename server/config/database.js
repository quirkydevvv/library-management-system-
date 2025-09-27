const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Create indexes for better performance
    await createIndexes();
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

const createIndexes = async () => {
  try {
    // User indexes
    await mongoose.connection.db.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.db.collection('users').createIndex({ role: 1 });
    await mongoose.connection.db.collection('users').createIndex({ status: 1 });

    // Book indexes
    await mongoose.connection.db.collection('books').createIndex({ isbn: 1 }, { unique: true, sparse: true });
    await mongoose.connection.db.collection('books').createIndex({ title: 'text', description: 'text' });
    await mongoose.connection.db.collection('books').createIndex({ genre: 1 });
    await mongoose.connection.db.collection('books').createIndex({ status: 1 });
    await mongoose.connection.db.collection('books').createIndex({ availableCopies: 1 });

    // Transaction indexes
    await mongoose.connection.db.collection('transactions').createIndex({ userId: 1 });
    await mongoose.connection.db.collection('transactions').createIndex({ bookId: 1 });
    await mongoose.connection.db.collection('transactions').createIndex({ status: 1 });
    await mongoose.connection.db.collection('transactions').createIndex({ dueDate: 1 });
    await mongoose.connection.db.collection('transactions').createIndex({ borrowDate: 1 });

    // Author indexes
    await mongoose.connection.db.collection('authors').createIndex({ name: 1 });

    // Category indexes
    await mongoose.connection.db.collection('categories').createIndex({ name: 1 }, { unique: true });

    // Reservation indexes
    await mongoose.connection.db.collection('reservations').createIndex({ userId: 1 });
    await mongoose.connection.db.collection('reservations').createIndex({ bookId: 1 });
    await mongoose.connection.db.collection('reservations').createIndex({ status: 1 });

    console.log('Database indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error.message);
  }
};

module.exports = connectDB;
