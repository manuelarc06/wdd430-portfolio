
import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">
                Create New Project
            </h1>

            <CreateProjectForm />
        </main>
    );
}
