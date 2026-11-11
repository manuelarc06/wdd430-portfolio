
import { Suspense } from 'react';
import { connection } from 'next/server';
import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

async function ProjectsContent() {
    await connection();

    const projects = await getProjects();

    return <ProjectList projects={projects} />;
}

export default function ProjectsPage() {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold mb-6">
                Projects Overview
            </h1>

            <Suspense fallback={<p>Loading projects...</p>}>
                <ProjectsContent />
            </Suspense>
        </main>
    );
}
