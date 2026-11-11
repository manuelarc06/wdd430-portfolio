
import { connection } from 'next/server';
import ProjectList from '@/components/ProjectList';
import { getProjects } from '@/lib/projects-db';

export default async function SchoolProjectList() {
    await connection();

    const projects = await getProjects('school');

    return <ProjectList projects={projects} />;
}
