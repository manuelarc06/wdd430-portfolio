
export default function Loading() {
    return (
        <main className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 animate-pulse">
            <h1 className="text-4xl font-bold mb-6 text-gray-300 dark:text-gray-600">
                Open Source Projects
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 space-y-4"
                    >
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />

                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />

                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />

                        <div className="flex gap-2">
                            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
                        </div>

                        <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                ))}
            </div>
        </main>
    );
}
