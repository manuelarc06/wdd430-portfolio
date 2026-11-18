
'use client';

import { useEffect, useState } from 'react';
import {
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';

export default function ProjectSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentQuery = searchParams.get('query') ?? '';
    const searchParamsString = searchParams.toString();

    const [searchTerm, setSearchTerm] = useState(currentQuery);

    // Debounce search and update the URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            const normalizedQuery = searchTerm.trim();

            // Avoid unnecessary navigation
            if (currentQuery === normalizedQuery) {
                return;
            }

            const params = new URLSearchParams(searchParamsString);

            if (normalizedQuery) {
                params.set('query', normalizedQuery);
            } else {
                params.delete('query');
            }

            // Every new search starts at page 1
            params.set('page', '1');

            const queryString = params.toString();

            const url = queryString
                ? `${pathname}?${queryString}`
                : pathname;

            router.push(url, { scroll: false });
        }, 400);

        return () => clearTimeout(timeout);
    }, [
        searchTerm,
        currentQuery,
        pathname,
        router,
        searchParamsString,
    ]);

    // Synchronize the input when browser navigation changes the URL
    const displayedValue =
        searchTerm === currentQuery ? searchTerm : currentQuery;

    return (
        <div className="mb-8">
            <label
                htmlFor="project-search"
                className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
            >
                Search Projects
            </label>

            <div className="relative">
                <input
                    id="project-search"
                    type="search"
                    placeholder="Search by title, description, or technology..."
                    value={displayedValue}
                    onChange={(event) =>
                        setSearchTerm(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            </div>
        </div>
    );
}
