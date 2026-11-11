import ProjectCard from './ProjectCard';

interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

interface ProjectListProps {
    projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
    return (
        <section className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    title={project.title}
                    description={project.description}
                    technologies={project.technologies}
                    link={project.link}
                />
            ))}
        </section>
    );
}

