
import Link from "next/link";

export default function ProjectsLayout({ children, }: { children: React.ReactNode; }) {
    return (
        <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-6 py-10">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Projects</h2>

                <nav className="flex flex-wrap gap-4 border-b border-gray-300 dark:border-gray-700 pb-4 mb-8">
                    <Link href="/projects" className="text-blue-600 hover:text-blue-800 font-medium transition"> Overview</Link>
                    <Link href="/projects/opensource" className="text-blue-600 hover:text-blue-800 font-medium transition"> Open Source</Link>
                    <Link href="/projects/school" className="text-blue-600 hover:text-blue-800 font-medium transition"> School</Link>
                </nav>
                {children}
            </div>
        </section>
    );
}
