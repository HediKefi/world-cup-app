const fs = require('fs')
const { Client } = require('pg')
const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.AWS_REGION || 'eu-north-1' })

async function getDbPassword(secretId) {
  const sm = new AWS.SecretsManager()
  const sec = await sm.getSecretValue({ SecretId: secretId }).promise()

  if (!sec.SecretString) {
    throw new Error('SecretString is missing in Secrets Manager response')
  }

  const parsed = JSON.parse(sec.SecretString)
  if (!parsed.password) {
    throw new Error('password is missing in secret JSON')
  }

  return parsed.password
}

async function main() {
  const secretId = process.env.AWS_SECRET_ID || 'arn:aws:secretsmanager:eu-north-1:625738166785:secret:rds!db-d80e1439-78ee-4d42-99af-f68771d90737-5F8olj'
  const host = process.env.RDS_HOST || 'worldcup-db.cpmqaem40279.eu-north-1.rds.amazonaws.com'
  const port = Number(process.env.RDS_PORT || 5432)
  const database = process.env.RDS_DATABASE || 'postgres'
  const user = process.env.RDS_USER || 'postgres'
  const caPath = process.env.RDS_CA_PATH || './global-bundle.pem'

  if (!fs.existsSync(caPath)) {
    throw new Error(`CA bundle not found at ${caPath}. Download the AWS RDS global bundle and place it there.`)
  }

  const password = await getDbPassword(secretId)

  const client = new Client({
    host,
    port,
    database,
    user,
    password,
    ssl: {
      rejectUnauthorized: false,
      ca: fs.readFileSync(caPath).toString()
    }
  })

  try {
    await client.connect()
    const res = await client.query('SELECT version()')
    console.log('Connected. PostgreSQL version:')
    console.log(res.rows[0].version)
  } catch (error) {
    console.error('Database error:', error)
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
