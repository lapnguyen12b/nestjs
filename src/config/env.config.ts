import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
export const env = { 
  DOMAN_BE: process.env.DOMAN_BE,
  ROOT_PATH: path.join(__dirname, '...'),
}

