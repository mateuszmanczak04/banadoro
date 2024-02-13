import authMiddleware from '@/lib/authMiddleware';
import CustomError from '@/lib/CustomError';
import dbConnect from '@/lib/dbConnect';
import errorMiddleware from '@/lib/errorMiddleware';
import Task from '@/models/Task';
import CustomNextRequest from '@/types/CustomNextRequest';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// get all user tasks
export const GET = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		await dbConnect();

		const tasks: Task[] = await Task.find({
			userId: new mongoose.Types.ObjectId(req.token.sub),
		});

		tasks.forEach(task => {
			delete task._id;
		});

		return NextResponse.json({
			tasks,
		});
	}),
);

// create a task
export const POST = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		const { title, id, checked } = await req.json();

		if (!title || title.trim().length === 0)
			throw new CustomError('Title must not be empty.', 400);

		await dbConnect();

		await Task.create({
			id,
			title,
			userId: new mongoose.Types.ObjectId(req.token.sub),
			checked,
		});

		return NextResponse.json({});
	}),
);

// toggle a task
export const PUT = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		const { id } = await req.json();

		if (!id) throw new CustomError('Missing id.', 400);

		await dbConnect();

		const task = await Task.findOne({ id }).select({
			checked: 1,
			userId: 1,
		});

		if (!task) throw new CustomError('Task does not exist.', 404);

		if (task.userId !== req.token.sub)
			throw new CustomError('You are not owner of this task.', 403);

		await Task.findOneAndUpdate({ id }, { $set: { checked: !task.checked } });

		return NextResponse.json({});
	}),
);

// delete a task
export const DELETE = errorMiddleware(
	authMiddleware(async (req: CustomNextRequest) => {
		const url = new URL(req.nextUrl.toString());
		const id = url.searchParams.get('id');

		if (!id) throw new CustomError('Missing task id.', 400);

		await dbConnect();

		await Task.deleteOne({
			id,
			userId: new mongoose.Types.ObjectId(req.token.sub),
		});

		return NextResponse.json({});
	}),
);
