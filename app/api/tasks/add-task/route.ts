import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, _id } = await req.json();

    if (!title || title.trim().length === 0 || !_id) {
      return NextResponse.json({ message: 'Invalid data.' }, { status: 400 });
    }

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();

    const task = await Task.create({ title, _id, authorEmail: token.email });

    return NextResponse.json({ task });
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
