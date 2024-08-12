import mongoose from 'mongoose';

const connect_db = async () => {
  try {
    const db_connection = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log(`Database connected on ${db_connection.connection.host}`);
    return;
  } catch (error) {
    console.log('Database connection failed', error);
  }
};

export default connect_db;
