import { Suspense } from 'react';
import ProjectList from '@/components/ProjectList';
import { Project } from '@/lib/projects-db';

async function ProjectsContent() {
    const response = await fetch('http://localhost:3000/api/projects');

    if (!response.ok) {
        throw new Error('Error al obtener los proyectos');
    }

    const projects: Project[] = await response.json();

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
