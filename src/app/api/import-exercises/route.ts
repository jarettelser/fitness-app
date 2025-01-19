import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const exercises = await request.json();

    for (const exercise of exercises) {
      await sql`
        INSERT INTO exercises (
          name, force, level, mechanic, equipment, 
          primary_muscles, secondary_muscles, instructions, category
        ) VALUES (
          ${exercise.name},
          ${exercise.force},
          ${exercise.level},
          ${exercise.mechanic},
          ${exercise.equipment},
          ${exercise.primaryMuscles},
          ${exercise.secondaryMuscles},
          ${exercise.instructions},
          ${exercise.category}
        )
      `;
    }

    return NextResponse.json({ message: 'Data imported successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}