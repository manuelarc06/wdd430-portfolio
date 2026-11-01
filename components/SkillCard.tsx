interface SkillCardProps {
    title: string;
    skills: string[];
}

export default function SkillCard({ title, skills }: SkillCardProps) {
    return (
        <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">{title}</h2>

            <ul className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                    <li key={skill} className="bg-white text-blue-800 px-4 py-2 rounded-full border border-blue-200 font-medium">{skill} </li>
                ))}
            </ul>
        </section>
    );
}
