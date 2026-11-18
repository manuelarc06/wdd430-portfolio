
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { getProjectById } from '@/lib/projects-db';
import { updateProject } from '@/lib/actions';

async function EditProjectContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: rawId } = await params;

    if (!/^[1-9]\d*$/.test(rawId)) {
        notFound();
    }

    const id = Number(rawId);

    if (!Number.isSafeInteger(id)) {
        notFound();
    }

    const project = await getProjectById(id);

    if (!project) {
        notFound();
    }

    const updateProjectWithId = updateProject.bind(null, id);

    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
            <h1 className="text-3xl font-bold mb-6">
                Edit Project
            </h1>

            <form action={updateProjectWithId} className="space-y-5">

                <div>
                    <label htmlFor="title" className="block mb-2 font-semibold">
                        Project Title
                    </label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={project.title}
                        required
                        minLength={2}
                        className="w-full border rounded-lg p-3 text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block mb-2 font-semibold">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={project.description}
                        required
                        minLength={10}
                        rows={4}
                        className="w-full border rounded-lg p-3 text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="type" className="block mb-2 font-semibold">
                        Project Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        defaultValue={project.type}
                        required
                        className="w-full border rounded-lg p-3 text-gray-900"
                    >
                        <option value="opensource">Open Source</option>
                        <option value="school">School</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="technologies" className="block mb-2 font-semibold">
                        Technologies
                    </label>
                    <input
                        id="technologies"
                        name="technologies"
                        defaultValue={project.technologies.join(', ')}
                        required
                        className="w-full border rounded-lg p-3 text-gray-900"
                    />
                </div>

                <div>
                    <label htmlFor="link" className="block mb-2 font-semibold">
                        Project Link (optional)
                    </label>
                    <input
                        id="link"
                        name="link"
                        type="url"
                        defaultValue={project.link ?? ''}
                        className="w-full border rounded-lg p-3 text-gray-900"
                    />
                </div>


                <div>
                    <label
                        htmlFor="yearCompleted"
                        className="block mb-2 font-semibold"
                    >
                        Year Completed
                    </label>

                    <input
                        id="yearCompleted"
                        name="yearCompleted"
                        type="number"
                        min="2000"
                        max={new Date().getFullYear()}
                        defaultValue={
                            project.year_completed ?? new Date().getFullYear()
                        }
                        required
                        className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                    >
                        Update Project
                    </button>

                    <Link
                        href="/projects"
                        className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-lg"
                    >
                        Cancel
                    </Link>
                </div>
            </form>
        </main>
    );
}

export default function EditProjectPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<p className="p-8">Loading project...</p>}>
            <EditProjectContent params={params} />
        </Suspense>
    );
}
