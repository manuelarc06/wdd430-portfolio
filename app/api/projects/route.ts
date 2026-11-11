import { NextRequest, NextResponse } from 'next/server';
import { getProjects } from '@/lib/projects-db';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get('type');

    if (type && type !== 'opensource' && type !== 'school') {
        return NextResponse.json(
            { error: 'Invalid project type' },
            { status: 400 }
        );
    }

    const filteredProjects = getProjects(type);

    return NextResponse.json(filteredProjects);
}
