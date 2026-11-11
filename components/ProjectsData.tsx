'use client';

import { useEffect, useState } from 'react';
import ProjectList from './ProjectList';

interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export default function ProjectsData({
    endpoint,
}: {
    endpoint: string;
}) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchProjects() {
            try {
                setLoading(true);
                setError('');

                const response = await fetch(endpoint);

                if (!response.ok) {
                    throw new Error('Could not fetch projects');
                }

                const data: Project[] = await response.json();

                setProjects(data);
            } catch {
                setError('Something went wrong loading projects.');
            } finally {
                setLoading(false);
            }
        }

        fetchProjects();
    }, [endpoint]);

    if (loading) return <p>Loading projects...</p>;

    if (error) return <p className="text-red-500">{error}</p>;

    return <ProjectList projects={projects} />;
}
