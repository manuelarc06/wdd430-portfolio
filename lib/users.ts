import { sql } from '@vercel/postgres';

export interface User {
    id: number;
    name: string;
    email: string;
    passwordHash: string;
}

export async function getUserByEmail(
    email: string
): Promise<User | null> {
    const { rows } = await sql<User>`
        SELECT
            id,
            name,
            email,
            password_hash AS "passwordHash"
        FROM users
        WHERE email = ${email}
        LIMIT 1
    `;

    return rows[0] ?? null;
}
