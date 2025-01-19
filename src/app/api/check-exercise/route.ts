import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`SELECT COUNT(*) FROM exercises`;
    return NextResponse.json({ count: rows[0].count }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}