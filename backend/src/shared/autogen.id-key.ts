import * as crypto from 'crypto';

class GenerarRandomHash {

  private constructor() { /* Utility Class */ }

  public static generateSalt(): Buffer {
    const salt = crypto.randomBytes(16);
    return salt;
  }

  public static generar(input: string, salt: Buffer): string {
    const hash = crypto.createHash('sha256');
    hash.update(salt);
    hash.update(input);
    const hashedValue = hash.digest('hex');
    return hashedValue;
  }

  public static bytesToHex(bytes: Buffer): string {
    return bytes.toString('hex');
  }

}

function randomKey(): string {
  const fechaActualEnMilisegundos = new Date().getTime();
  const fechaActualEnNanosegundos = BigInt(fechaActualEnMilisegundos) * BigInt(1_000_000);
  return String(fechaActualEnNanosegundos);
}

export function generarID(): string {

  const salt = GenerarRandomHash.generateSalt();
    
  try {
    const hashed = GenerarRandomHash.generar(randomKey(), salt);
    return GenerarRandomHash.bytesToHex(Buffer.from(hashed, 'hex'));
  }catch (error) {
    console.error('Error al generar el ID:', error);
  }

}