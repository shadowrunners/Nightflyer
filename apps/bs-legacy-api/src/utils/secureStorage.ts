import { config } from 'dotenv';
import cryptr from 'cryptr';

config();

/** The Secure Storage module of Evelyn that keeps your shit safe. */
export class SecureStorage {
	/**
	 * Encrypts the provided value.
	 * @public
	 * @param value The value that will be encrypted.
	 * @returns {string}
	 */
	public encrypt(value: string): string {
		const keepMyDataSecure = new cryptr(process.env.DECRYPTION_KEY, {
			pbkdf2Iterations: 15000,
			saltLength: 15,
		});

		return keepMyDataSecure.encrypt(value);
	}
}
