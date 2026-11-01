
import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "My First Next.js App",
    description:"My first portfolio application built with Next.js as part of my WDD 430 course.",
    technologies: [ "Next.js", "React", "TypeScript", "Tailwind CSS"],
    link: "https://github.com/manuelarc06/wdd430-portfolio"
  },
  {
    title: "Manga & Manhwa Explorer",
    description:
      "A web application where users can explore popular manga and manhwa, discover titles by genre, search for their favorite series, view detailed information, and save favorite titles to their personal library. The application uses APIs to retrieve manga information.",
    technologies: [ "JavaScript", "React", "HTML", "CSS", "REST APIs"],
    link: "https://manga-manhwa-explorer.onrender.com"
  }
];

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome to My Portfolio</h1>

        <p className="text-lg text-gray-700">
          Hello! I am a student learning web development.
          Welcome to my personal portfolio where I share
          my projects and skills.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">My Projects</h2>

        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
