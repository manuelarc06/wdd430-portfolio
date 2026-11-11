
import { connection } from 'next/server';
import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export default async function OpenSourcePage() {
    await connection();

    const projects = await getProjects('opensource');

    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold mb-6">
                Open Source Projects
            </h1>

            <ProjectList projects={projects} />
        </main>
    );
}

