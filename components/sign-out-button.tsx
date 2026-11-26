
'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
    return (
        <button
            type="button"
            onClick={() => signOut({ callbackUrl: '/' })}
            className="rounded-lg bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 transition-colors"
        >
            Sign Out
        </button>
    );
}
