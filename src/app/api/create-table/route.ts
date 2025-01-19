import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        force VARCHAR(50),
        level VARCHAR(50),
        mechanic VARCHAR(50),
        equipment VARCHAR(100),
        primary_muscles TEXT[],
        secondary_muscles TEXT[],
        instructions TEXT[],
        category VARCHAR(50)
      )
    `;
    return NextResponse.json({ message: 'Table created successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}