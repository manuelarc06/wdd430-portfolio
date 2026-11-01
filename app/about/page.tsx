import SkillCard from "@/components/SkillCard";

export default function About() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">About Me</h1>

            <p className="text-lg text-gray-700 mb-6">
                Hello! I am a web development student
                passionate about learning new technologies
                and creating websites.
            </p>

            <p className="text-lg text-gray-700 mb-8">
                I am currently learning React, Next.js,
                TypeScript, JavaScript, and Tailwind CSS.
                My goal is to become a skilled web developer.
            </p>

            <SkillCard
                title="My Technical Skills"
                skills={[
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS"
                ]}
            />
        </main>
    );
}
