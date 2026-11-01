import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-6 shadow-md">
            <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Portfolio</h1>

                <ul className="flex gap-6">
                    <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                    <li><Link href="/about" className="hover:text-blue-200">About</Link></li>
                </ul>
            </nav>
        </header>
    );
}
