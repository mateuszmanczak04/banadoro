import authMiddleware from '@/lib/authMiddleware';
import dbConnect from '@/lib/dbConnect';
import Task from '@/models/Task';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

// get all user tasks
export const GET = authMiddleware(async (req: CustomNextRequest) => {
  try {
    await dbConnect();

    const tasks = await Task.find({ authorEmail: req.email });

    return NextResponse.json({ tasks });
  } catch (err) {
    return NextResponse.json({ message: 'Server error.' }, { status: 500 });
  }
});

// create a task
export const POST = authMiddleware(async (req: CustomNextRequest) => {
  try {
    const { title, _id } = await req.json();

    if (!title || title.trim().length === 0 || !_id) {
      return NextResponse.json({ message: 'Invalid data.' }, { status: 400 });
    }

    await dbConnect();

    const task = await Task.create({ title, _id, authorEmail: req.email });

    return NextResponse.json({ task });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
});

// toggle a task
export const PUT = authMiddleware(async (req: CustomNextRequest) => {
  try {
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

    if (task.authorEmail !== req.email) {
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
});

// delete a task
export const DELETE = authMiddleware(async (req: CustomNextRequest) => {
  try {
    const url = new URL(req.nextUrl.toString());
    const _id = url.searchParams.get('_id');

    if (!_id) {
      return NextResponse.json(
        { message: 'Missing task id.' },
        { status: 400 }
      );
    }

    await dbConnect();

    const taskToDelete = await Task.findOne({ _id }).select('authorEmail');

    if (!taskToDelete) {
      return NextResponse.json(
        { message: 'Task does not exist.' },
        { status: 404 }
      );
    }

    if (taskToDelete.authorEmail !== req.email) {
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
});
