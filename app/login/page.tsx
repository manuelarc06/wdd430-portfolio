import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                    Sign In
                </h1>

                <p className="mb-6 text-gray-600">
                    Sign in to manage your portfolio.
                </p>

                <LoginForm />
            </div>
        </main>
    );
}
