
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth, signIn } from '@/auth';
import { AuthError } from 'next-auth';

const currentYear = new Date().getFullYear();

// Verify that the user is authenticated
async function requireOwnerSession() {
    const session = await auth();

    if (!session?.user) {
        throw new Error('Not authenticated');
    }

    return session;
}

// Login action
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
): Promise<string | undefined> {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return 'Invalid email or password.';
            }

            return 'Something went wrong.';
        }

        throw error;
    }
}

const ProjectFormSchema = z.object({
    title: z.string().trim().min(2, 'Title is required'),

    description: z.string().trim().min(
        10,
        'Description is too short'
    ),

    type: z.enum(['opensource', 'school']),

    technologies: z.string()
        .trim()
        .min(2, 'Technologies are required')
        .transform((value) =>
            value.split(',')
                .map((item) => item.trim())
                .filter(Boolean)
        )
        .refine(
            (items) => items.length > 0,
            'At least one technology is required'
        ),

    link: z.preprocess(
        (value) =>
            typeof value === 'string'
                ? value.trim() || undefined
                : value,
        z.string().url('Enter a valid URL').optional()
    ),

    yearCompleted: z.coerce
        .number()
        .int('Year must be a whole number.')
        .gte(2000, 'Year must be 2000 or later.')
        .lte(currentYear, `Year cannot be greater than ${currentYear}.`),
});

export type State = {
    errors?: {
        title?: string[];
        description?: string[];
        type?: string[];
        technologies?: string[];
        link?: string[];
        yearCompleted?: string[];
    };
    message?: string | null;
};

// CREATE PROJECT
export async function createProject(
    prevState: State,
    formData: FormData
): Promise<State> {

    await requireOwnerSession();

    const parsed = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
        yearCompleted: formData.get('yearCompleted'),
    });

    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const {
        title,
        description,
        type,
        technologies,
        link,
        yearCompleted,
    } = parsed.data;

    const technologiesArray = `{${technologies
        .map((item) => `"${item.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
        .join(',')}}`;

    try {
        await sql`
            INSERT INTO projects
            (title, description, type, technologies, link, year_completed)
            VALUES (
                ${title},
                ${description},
                ${type},
                ${technologiesArray}::text[],
                ${link ?? null},
                ${yearCompleted}
            )
        `;
    } catch {
        return {
            message: 'Database Error: Failed to create project.',
        };
    }

    revalidatePath('/projects');
    redirect('/projects');
}

// UPDATE PROJECT
export async function updateProject(
    id: number,
    formData: FormData
) {
    await requireOwnerSession();

    if (!Number.isSafeInteger(id) || id <= 0) {
        throw new Error('Invalid project ID.');
    }

    const parsed = ProjectFormSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        type: formData.get('type'),
        technologies: formData.get('technologies'),
        link: formData.get('link'),
        yearCompleted: formData.get('yearCompleted'),
    });

    if (!parsed.success) {
        throw new Error('Invalid project input.');
    }

    const {
        title,
        description,
        type,
        technologies,
        link,
        yearCompleted,
    } = parsed.data;

    const technologiesArray = `{${technologies
        .map((item) => `"${item.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`)
        .join(',')}}`;

    await sql`
        UPDATE projects
        SET
            title = ${title},
            description = ${description},
            type = ${type},
            technologies = ${technologiesArray}::text[],
            link = ${link ?? null},
            year_completed = ${yearCompleted}
        WHERE id = ${id}
    `;

    revalidatePath('/projects');
    redirect('/projects');
}

// DELETE PROJECT
export async function deleteProject(formData: FormData) {
    await requireOwnerSession();

    const rawId = formData.get('id');

    if (
        typeof rawId !== 'string' ||
        !/^[1-9]\d*$/.test(rawId)
    ) {
        throw new Error('Invalid project ID.');
    }

    const id = Number(rawId);

    if (!Number.isSafeInteger(id)) {
        throw new Error('Invalid project ID.');
    }

    await sql`
        DELETE FROM projects
        WHERE id = ${id}
    `;

    revalidatePath('/projects');
}
