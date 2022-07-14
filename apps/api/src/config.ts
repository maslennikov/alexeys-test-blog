// getting all vars from .env in a centralized fashion

function env(keyname) {
  const envVar = process.env[keyname]
  if (!envVar) throw new Error(`Configuration must include ${keyname}`)
  return envVar
}

export default Object.freeze({
  jwtSecret: env('JWT_SECRET'),
})
