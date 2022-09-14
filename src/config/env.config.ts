import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config();
export const env = {
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  DOMAN_BE: process.env.DOMAN_BE,
  ROOT_PATH: path.join(__dirname, '..'),
}

