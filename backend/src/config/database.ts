import AWS from 'aws-sdk'

export type DbConfigSource = 'aws-secrets-manager' | 'environment'

type DbSecret = {
  username?: string
  password?: string
  host?: string
  port?: number | string
  dbname?: string
  database?: string
  DATABASE_URL?: string
}

function buildDatabaseUrlFromSecret(secret: DbSecret): string | null {
  if (typeof secret.DATABASE_URL === 'string' && secret.DATABASE_URL.length > 0) {
    return secret.DATABASE_URL
  }

  const username = secret.username
  const password = secret.password
  const host = secret.host
  const port = secret.port ?? 5432
  const database = secret.dbname ?? secret.database ?? 'postgres'

  if (!username || !password || !host) {
    return null
  }

  return `postgresql://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:${port}/${database}?schema=public&sslmode=require`
}

export async function initializeDatabaseUrlFromSecrets(): Promise<DbConfigSource> {
  const secretId = process.env.AWS_SECRET_ID
  if (!secretId) {
    return 'environment'
  }

  const region = process.env.AWS_REGION || 'eu-north-1'
  AWS.config.update({ region })

  const sm = new AWS.SecretsManager()
  const sec = await sm.getSecretValue({ SecretId: secretId }).promise()

  if (!sec.SecretString) {
    throw new Error('SecretString is missing in Secrets Manager response')
  }

  let parsedSecret: DbSecret
  try {
    parsedSecret = JSON.parse(sec.SecretString) as DbSecret
  } catch {
    throw new Error('Failed to parse Secrets Manager SecretString as JSON')
  }

  const databaseUrl = buildDatabaseUrlFromSecret(parsedSecret)
  if (!databaseUrl) {
    throw new Error('Secret is missing required database fields')
  }

  process.env.DATABASE_URL = databaseUrl
  return 'aws-secrets-manager'
}