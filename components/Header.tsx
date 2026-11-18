
import { Suspense } from 'react';
import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-6 shadow-md">
            <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    My Portfolio
                </h1>

                <Suspense fallback={<div className="h-6" />}>
                    <NavLinks />
                </Suspense>

            </nav>
        </header>
    );
}

