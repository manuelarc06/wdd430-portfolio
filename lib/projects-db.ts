export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'My Portfolio Website',
        description: 'A personal portfolio website created with Next.js.',
        type: 'opensource',
        technologies: ['Next.js', 'React', 'TypeScript'],
        link: 'https://github.com/'
    },
    {
        id: 2,
        title: 'Database Design Project',
        description: 'A database design project completed during my studies.',
        type: 'school',
        technologies: ['PostgreSQL', 'SQL']
    },
    {
        id: 3,
        title: 'Web Development Project',
        description: 'A website developed as part of my school assignments.',
        type: 'school',
        technologies: ['HTML', 'CSS', 'JavaScript']
    }
];

export function getProjects(type?: string | null): Project[] {
    if (type) {
        return projects.filter((project) => project.type === type);
    }

    return projects;
}

export function getProjectById(id: number): Project | null {
    return projects.find((project) => project.id === id) ?? null;
}
