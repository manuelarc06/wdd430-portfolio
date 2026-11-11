
import { Suspense } from 'react';
import { connection } from 'next/server';

import ProjectList from '@/components/ProjectList';
import ProjectSearch from '@/components/ProjectSearch';
import Pagination from '@/components/Pagination';

import {
    fetchFilteredProjects,
    fetchProjectsPages,
    sanitizeSearchQuery,
    sanitizePage,
} from '@/lib/projects-db';

interface ProjectsPageProps {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>;
}

// This component handles dynamic data inside Suspense
async function ProjectsContent({
    searchParams,
}: ProjectsPageProps) {
    await connection();

    const params = await searchParams;

    const query = sanitizeSearchQuery(params.query);
    const requestedPage = sanitizePage(params.page);

    const totalPages = await fetchProjectsPages(query);

    const currentPage = Math.min(
        requestedPage,
        Math.max(totalPages, 1)
    );

    const projects = await fetchFilteredProjects(
        query,
        currentPage
    );

    return (
        <>
            <Suspense fallback={<p>Loading search...</p>}>
                <ProjectSearch />
            </Suspense>

            {projects.length > 0 ? (
                <ProjectList projects={projects} />
            ) : (
                <p className="text-gray-600 dark:text-gray-300 py-6">
                    No projects found. Try another search.
                </p>
            )}

            <Suspense fallback={<p>Loading pagination...</p>}>
                <Pagination totalPages={totalPages} />
            </Suspense>
        </>
    );
}

export default function ProjectsPage({
    searchParams,
}: ProjectsPageProps) {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold mb-6">
                Projects Overview
            </h1>

            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectsContent searchParams={searchParams} />
            </Suspense>
        </main>
    );
}
