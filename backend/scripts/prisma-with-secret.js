const { spawn } = require('child_process')
const AWS = require('aws-sdk')

function buildDatabaseUrlFromSecret(secret) {
  if (typeof secret.DATABASE_URL === 'string' && secret.DATABASE_URL.length > 0) {
    return secret.DATABASE_URL
  }

  const username = secret.username
  const password = secret.password
  const host = secret.host
  const port = secret.port || 5432
  const database = secret.dbname || secret.database || 'postgres'

  if (!username || !password || !host) {
    return null
  }

  return `postgresql://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}?schema=public&sslmode=require`
}

async function getDatabaseUrlFromSecret() {
  const secretId = process.env.AWS_SECRET_ID
  if (!secretId) {
    return process.env.DATABASE_URL
  }

  const region = process.env.AWS_REGION || 'eu-north-1'
  AWS.config.update({ region })

  const sm = new AWS.SecretsManager()
  const sec = await sm.getSecretValue({ SecretId: secretId }).promise()

  if (!sec.SecretString) {
    throw new Error('SecretString is missing in Secrets Manager response')
  }

  const parsed = JSON.parse(sec.SecretString)
  const databaseUrl = buildDatabaseUrlFromSecret(parsed)

  if (!databaseUrl) {
    throw new Error('Secret is missing required database fields')
  }

  return databaseUrl
}

async function main() {
  const prismaArgs = process.argv.slice(2)
  if (prismaArgs.length === 0) {
    console.error('Usage: node scripts/prisma-with-secret.js <prisma args>')
    process.exit(1)
  }

  const databaseUrl = await getDatabaseUrlFromSecret()
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not set and AWS_SECRET_ID is not configured')
  }

  const env = {
    ...process.env,
    DATABASE_URL: databaseUrl
  }

  const child = spawn('npx', ['prisma', ...prismaArgs], {
    stdio: 'inherit',
    shell: true,
    env
  })

  child.on('exit', (code) => {
    process.exit(code || 0)
  })
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
