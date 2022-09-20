import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config();
export const env = {
  POSTGRES_HOST: process.env.POSTGRES_HOST || 'localhost',
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || '5432'),
  POSTGRES_USER: process.env.POSTGRES_USER || 'postgres',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || '123456',
  POSTGRES_DB: process.env.POSTGRES_DB || 'nestjsDB',
  DOMAN_BE: process.env.DOMAN_BE,
  ROOT_PATH: path.join(__dirname, '..'),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'jsonwedtoken'
}

