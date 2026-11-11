
'use client';

import Link from 'next/link';
import {
    usePathname,
    useSearchParams,
} from 'next/navigation';

interface PaginationProps {
    totalPages: number;
}

export default function Pagination({
    totalPages,
}: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const requestedPage = Number(searchParams.get('page') || '1');

    const currentPage =
        Number.isSafeInteger(requestedPage) && requestedPage > 0
            ? Math.min(requestedPage, Math.max(totalPages, 1))
            : 1;

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(
            searchParams.toString()
        );

        params.set('page', pageNumber.toString());

        return `${pathname}?${params.toString()}`;
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav
            aria-label="Project pagination"
            className="flex items-center justify-center gap-4 mt-8"
        >
            {currentPage > 1 ? (
                <Link
                    href={createPageURL(currentPage - 1)}
                    scroll={false}
                    className="rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                    Previous
                </Link>
            ) : (
                <span className="rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 px-4 py-2 cursor-not-allowed">
                    Previous
                </span>
            )}

            <span className="text-sm text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
                <Link
                    href={createPageURL(currentPage + 1)}
                    scroll={false}
                    className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                >
                    Next
                </Link>
            ) : (
                <span className="rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400 px-4 py-2 cursor-not-allowed">
                    Next
                </span>
            )}
        </nav>
    );
}
