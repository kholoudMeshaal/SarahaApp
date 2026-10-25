import mongoose from 'mongoose';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);




export const connectionDB = async () => {
  try {
 await mongoose.connect('mongodb+srv://kholoud:kholoud123@cluster0.25a3wtf.mongodb.net/AssignmentSaraha');  
  
    console.log('mongoose Connected Successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};
