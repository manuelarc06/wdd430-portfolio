
import { Suspense } from "react";
import { connection } from "next/server";
import ProjectList from "@/components/ProjectList";
import { getProjects } from "@/lib/projects-db";

async function ProjectsContent() {
  await connection();

  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Welcome to My Portfolio
        </h1>

        <p className="text-lg text-gray-700">
          Hello! I am a student learning web development.
          Welcome to my personal portfolio where I share
          my projects and skills.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">
          My Projects
        </h2>

        <Suspense fallback={<p>Loading projects...</p>}>
          <ProjectsContent />
        </Suspense>
      </section>
    </main>
  );
}

