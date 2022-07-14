/**
 * For fine-tuning,see
 * https://github.com/ranisalt/node-argon2
 */

import * as argon2 from 'argon2'

export async function hash(password: string): Promise<string> {
  return argon2.hash(password)
}

export async function verify(password: string, hash: string): Promise<boolean> {
  return argon2.verify(hash, password)
}
