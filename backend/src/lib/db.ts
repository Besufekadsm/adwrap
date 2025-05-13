import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 seconds

async function connectWithRetry(retries = MAX_RETRIES): Promise<PrismaClient> {
  try {
    // Test the connection
    await prisma.$connect();
    console.log('Successfully connected to the database');
    return prisma;
  } catch (error) {
    if (retries === 0) {
      console.error('Failed to connect to the database after multiple retries:', error);
      throw error;
    }
    console.log(`Failed to connect to the database. Retrying in ${RETRY_INTERVAL/1000} seconds... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
    return connectWithRetry(retries - 1);
  }
}

// Initialize the connection
const db = await connectWithRetry();

export { db as prisma }; 