import ProjectsData from '@/components/ProjectsData';

export default function SchoolPage() {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-4xl font-bold mb-6">
                School Projects
            </h1>

            <ProjectsData endpoint="/api/projects?type=school" />
        </main>
    );
}
