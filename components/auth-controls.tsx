
import Link from 'next/link';
import { auth } from '@/auth';
import { SignOutButton } from './sign-out-button';
import { connection } from 'next/server';

export default async function AuthControls() {
    await connection();

    const session = await auth();

    if (session?.user) {
        return <SignOutButton />;
    }

    return (
        <Link
            href="/login"
            className="rounded-lg bg-yellow-400 px-4 py-2 text-blue-900 font-semibold hover:bg-yellow-300 transition-colors"
        >
            Sign In
        </Link>
    );
}
