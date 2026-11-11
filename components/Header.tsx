import NavLinks from './NavLinks';

export default function Header() {
    return (
        <header className="bg-blue-600 text-white py-6 shadow-md">
            <nav className="max-w-5xl mx-auto px-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">My Portfolio</h1>
                <NavLinks />
            </nav>
        </header>
    );
}

