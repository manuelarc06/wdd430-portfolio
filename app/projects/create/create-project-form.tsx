
'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { createProject, type State } from '@/lib/actions';

const initialState: State = {
    message: null,
    errors: {},
};

export default function CreateProjectForm() {
    const [state, formAction, isPending] = useActionState(
        createProject,
        initialState
    );

    return (
        <form action={formAction} className="space-y-5">

            <div>
                <label htmlFor="title" className="block mb-2 font-semibold">
                    Project Title
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    minLength={2}
                    aria-describedby="title-error"
                    className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <div id="title-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.title?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="description" className="block mb-2 font-semibold">
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    required
                    minLength={10}
                    rows={4}
                    aria-describedby="description-error"
                    className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <div id="description-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.description?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="type" className="block mb-2 font-semibold">
                    Project Type
                </label>

                <select
                    id="type"
                    name="type"
                    required
                    aria-describedby="type-error"
                    className="w-full border rounded-lg p-3 text-gray-900"
                >
                    <option value="opensource">Open Source</option>
                    <option value="school">School</option>
                </select>

                <div id="type-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.type?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="technologies" className="block mb-2 font-semibold">
                    Technologies
                </label>

                <input
                    id="technologies"
                    name="technologies"
                    type="text"
                    required
                    placeholder="React, Next.js, TypeScript"
                    aria-describedby="technologies-error"
                    className="w-full border rounded-lg p-3 text-gray-900"
                />

                <div id="technologies-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.technologies?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="link" className="block mb-2 font-semibold">
                    Project Link (optional)
                </label>

                <input
                    id="link"
                    name="link"
                    type="url"
                    placeholder="https://example.com"
                    aria-describedby="link-error"
                    className="w-full border rounded-lg p-3 text-gray-900"
                />

                <div id="link-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.link?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="yearCompleted" className="block mb-2 font-semibold">
                    Year Completed
                </label>

                <input
                    id="yearCompleted"
                    name="yearCompleted"
                    type="number"
                    min="2000"
                    required
                    aria-describedby="yearCompleted-error"
                    className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-500"
                />

                <div id="yearCompleted-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.yearCompleted?.map((error) => (
                        <p key={error} className="text-red-600 text-sm mt-1">
                            {error}
                        </p>
                    ))}
                </div>
            </div>

            {state.message && (
                <p role="alert" className="text-red-600">
                    {state.message}
                </p>
            )}

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg disabled:opacity-60"
                >
                    {isPending ? 'Saving...' : 'Save Project'}
                </button>

                <Link
                    href="/projects"
                    className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-3 rounded-lg"
                >
                    Cancel
                </Link>
            </div>

        </form>
    );
}
