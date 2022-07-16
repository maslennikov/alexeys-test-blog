// getting all vars from .env in a centralized fashion

function env(keyname: string, fallback?: any) {
  const envVar = process.env[keyname]
  if (!envVar && fallback == undefined)
    throw new Error(`Configuration must include ${keyname}`)
  return envVar ?? fallback
}

export default Object.freeze({
  port: Number(env('PORT'), 5000),
  jwtSecret: env('JWT_SECRET'),
})
