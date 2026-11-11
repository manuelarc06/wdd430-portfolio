import ProjectsData from '@/components/ProjectsData';

export default function OpenSourcePage() {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold mb-6">
                Open Source Projects
            </h1>

            <ProjectsData endpoint="/api/projects?type=opensource" />
        </main>
    );
}
