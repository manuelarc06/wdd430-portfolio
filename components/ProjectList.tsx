
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import { deleteProject } from '@/lib/actions';

import type { Project } from '@/lib/projects-db';

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <section className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
                <div key={project.id}>
                    <ProjectCard
                        title={project.title}
                        description={project.description}
                        technologies={project.technologies}
                        link={project.link}
                    />

                    <div className="flex gap-3 mt-4">
                        <Link
                            href={`/projects/${project.id}/edit`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Edit
                        </Link>

                        <form action={deleteProject}>
                            <input
                                type="hidden"
                                name="id"
                                value={project.id}
                            />

                            <button
                                type="submit"
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            ))}
        </section>
    );
}
