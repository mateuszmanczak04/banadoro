import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';
import CustomError from './CustomError';

const errorMiddleware = (handler: (req: CustomNextRequest) => any) => {
	return async (req: CustomNextRequest) => {
		try {
			return await handler(req);
		} catch (error: CustomError | any) {
			if (!process.env.NODE_END || process.env.NODE_ENV === 'development') {
				console.error('ERROR🔥:', error.message);
			}
			return NextResponse.json(
				{ message: error.message || 'Internal Server Error.' },
				{ status: error.status || 500 },
			);
		}
	};
};

export default errorMiddleware;
