
import { sql } from '@vercel/postgres';

export interface Project {
    id: number;
    title: string;
    description: string;
    type: 'opensource' | 'school';
    technologies: string[];
    link?: string;
}

export const ITEMS_PER_PAGE = 6;

// Validate and sanitize search input
export function sanitizeSearchQuery(query: unknown): string {
    if (typeof query !== 'string') {
        return '';
    }

    return query
        .replace(/[\u0000-\u001F\u007F]/g, '')
        .trim()
        .slice(0, 100);
}

// Validate page number
export function sanitizePage(page: unknown): number {
    if (typeof page !== 'string' || !/^[1-9]\d*$/.test(page)) {
        return 1;
    }

    const parsedPage = Number(page);

    if (!Number.isSafeInteger(parsedPage)) {
        return 1;
    }

    return Math.min(parsedPage, 1000000);
}

// Get all projects or filter by type
export async function getProjects(
    type?: string | null
): Promise<Project[]> {
    if (type) {
        const { rows } = await sql<Project>`
            SELECT * FROM projects
            WHERE type = ${type}
            ORDER BY id
        `;

        return rows;
    }

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        ORDER BY id
    `;

    return rows;
}

// Get one project by ID
export async function getProjectById(
    id: number
): Promise<Project | null> {
    const { rows } = await sql<Project>`
        SELECT * FROM projects
        WHERE id = ${id}
    `;

    return rows[0] ?? null;
}

// Get filtered projects with pagination
export async function fetchFilteredProjects(
    query: string,
    page: number
): Promise<Project[]> {
    const safeQuery = sanitizeSearchQuery(query);
    const safePage = sanitizePage(String(page));
    const offset = (safePage - 1) * ITEMS_PER_PAGE;

    if (safeQuery) {
        const { rows } = await sql<Project>`
            SELECT * FROM projects
            WHERE
                POSITION(LOWER(${safeQuery}) IN LOWER(title)) > 0
                OR POSITION(LOWER(${safeQuery}) IN LOWER(COALESCE(description, ''))) > 0
                OR POSITION(
                    LOWER(${safeQuery})
                    IN LOWER(COALESCE(array_to_string(technologies, ' '), ''))
                ) > 0
            ORDER BY id
            LIMIT ${ITEMS_PER_PAGE}
            OFFSET ${offset}
        `;

        return rows;
    }

    const { rows } = await sql<Project>`
        SELECT * FROM projects
        ORDER BY id
        LIMIT ${ITEMS_PER_PAGE}
        OFFSET ${offset}
    `;

    return rows;
}

// Count pages for filtered projects
export async function fetchProjectsPages(
    query: string
): Promise<number> {
    const safeQuery = sanitizeSearchQuery(query);

    if (safeQuery) {
        const { rows } = await sql<{ total: number }>`
            SELECT COUNT(*) AS total
            FROM projects
            WHERE
                POSITION(LOWER(${safeQuery}) IN LOWER(title)) > 0
                OR POSITION(LOWER(${safeQuery}) IN LOWER(COALESCE(description, ''))) > 0
                OR POSITION(
                    LOWER(${safeQuery})
                    IN LOWER(COALESCE(array_to_string(technologies, ' '), ''))
                ) > 0
        `;

        return Math.ceil(Number(rows[0]?.total ?? 0) / ITEMS_PER_PAGE);
    }

    const { rows } = await sql<{ total: number }>`
        SELECT COUNT(*) AS total
        FROM projects
    `;

    return Math.ceil(Number(rows[0]?.total ?? 0) / ITEMS_PER_PAGE);
}

