import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  { params: { _id } }: { params: { _id: string } }
) {
  try {
    if (!_id) {
      return NextResponse.json(
        { message: 'Missing task id.' },
        { status: 400 }
      );
    }

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ message: 'Invalid token.' }, { status: 401 });
    }

    await dbConnect();

    const taskToDelete = await Task.findOne({ _id }).select('authorEmail');

    if (!taskToDelete) {
      return NextResponse.json(
        { message: 'Task does not exist.' },
        { status: 404 }
      );
    }

    if (taskToDelete.authorEmail !== token.email) {
      return NextResponse.json(
        { message: 'You can not delete task of someone else.' },
        { status: 403 }
      );
    }

    await Task.deleteOne({ _id });

    return NextResponse.json({ message: 'Successfully deleted a task.' });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
}
