'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
    const pathname = usePathname();

    const links = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
        { href: '/projects', label: 'Projects' },
    ];

    return (
        <ul className="flex flex-wrap gap-6">

            {links.map((link) => {
                const isActive =
                    link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href);

                return (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`font-semibold transition-colors ${isActive
                                    ? 'text-yellow-300 border-b-2 border-yellow-300 pb-1'
                                    : 'text-white hover:text-yellow-200'
                                }`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {link.label}
                        </Link>
                    </li>
                );
            })}

        </ul>
    );
}
