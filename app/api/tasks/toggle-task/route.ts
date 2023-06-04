import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Invalid _id.' }, { status: 400 });
    }

    await dbConnect();

    const task = await Task.findOne({ _id }).select('checked authorEmail');

    if (!task) {
      return NextResponse.json(
        { message: 'This task does not exist.' },
        { status: 404 }
      );
    }

    if (task.authorEmail !== token.email) {
      return NextResponse.json(
        { message: 'You can not toggle tasks of someone else.' },
        { status: 403 }
      );
    }

    await Task.findOneAndUpdate({ _id }, { checked: !task.checked });

    return NextResponse.json({ message: 'Successfully toggled task' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
