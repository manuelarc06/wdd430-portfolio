
import nextEnv from '@next/env';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

async function createAdmin() {
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL?.toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password || password.length < 8) {
        throw new Error(
            'Check your administrator environment variables.'
        );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await sql`
        INSERT INTO users (name, email, password_hash)
        VALUES (${name}, ${email}, ${passwordHash})
        ON CONFLICT (email)
        DO UPDATE SET
            name = EXCLUDED.name,
            password_hash = EXCLUDED.password_hash
    `;

    console.log('Administrator created successfully!');
}

try {
    await createAdmin();
} catch (error) {
    console.error('Error creating administrator:', error);
    process.exitCode = 1;
}
