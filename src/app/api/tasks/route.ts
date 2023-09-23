import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import Task from '@/models/Task';
import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';

// get all user tasks
export const GET = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    await dbConnect();

    const tasks = await Task.find({ authorEmail: req.email });

    return NextResponse.json({ tasks });
  })
);

// create a task
export const POST = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    const { title } = await req.json();

    if (!title || title.trim().length === 0)
      throw new CustomError('Invalid data.', 400);

    await dbConnect();

    const task = await Task.create({
      title,
      authorEmail: req.email,
      checked: false,
    });

    return NextResponse.json({ task });
  })
);

// toggle a task
export const PUT = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    const { _id } = await req.json();

    if (!_id) throw new CustomError('Missing _id.', 400);

    await dbConnect();

    const task = await Task.findOne({ _id }).select({
      checked: 1,
      authorEmail: 1,
    });

    if (!task) throw new CustomError('Task does not exist.', 404);

    if (task.authorEmail !== req.email)
      throw new CustomError('You are not owner of this task.', 403);

    await Task.findOneAndUpdate({ _id }, { checked: !task.checked });

    return NextResponse.json({});
  })
);

// delete a task
export const DELETE = errorMiddleware(
  authMiddleware(async (req: CustomNextRequest) => {
    const url = new URL(req.nextUrl.toString());
    const _id = url.searchParams.get('_id');

    if (!_id) throw new CustomError('Missing task id.', 400);

    await dbConnect();

    const taskToDelete = await Task.findOne({ _id }).select({ authorEmail: 1 });

    if (!taskToDelete) throw new CustomError('Task does not exist.', 404);

    if (taskToDelete.authorEmail !== req.email)
      throw new CustomError('You are not owner of this task.', 403);

    await Task.deleteOne({ _id });

    return NextResponse.json({});
  })
);
