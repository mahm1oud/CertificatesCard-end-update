import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  password: '700125733Mm',
  host: 'localhost',
  port: 5432,
  database: 'u240955251_colliderdb'
});

client.connect()
  .then(() => console.log('✅ الاتصال ناجح'))
  .catch(err => console.error('❌ فشل الاتصال:', err))
  .finally(() => client.end());
