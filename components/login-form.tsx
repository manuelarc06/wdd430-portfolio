
'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';

export function LoginForm() {
    const [errorMessage, formAction, isPending] =
        useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="space-y-5">

            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="username"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
                {isPending ? 'Signing in...' : 'Sign In'}
            </button>

            {errorMessage && (
                <p role="alert" className="text-sm text-red-600">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
