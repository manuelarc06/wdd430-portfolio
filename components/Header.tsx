
import { Suspense } from 'react';
import NavLinks from './NavLinks';
import AuthControls from './auth-controls';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-6 shadow-md">
            <nav className="max-w-5xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">

                <h1 className="text-2xl font-bold">
                    My Portfolio
                </h1>

                <div className="flex flex-wrap items-center gap-6">
                    <Suspense fallback={<div className="h-6" />}>
                        <NavLinks />
                    </Suspense>

                    <Suspense fallback={<div className="h-10 w-20" />}>
                        <AuthControls />
                    </Suspense>
                </div>

            </nav>
        </header>
    );
}
