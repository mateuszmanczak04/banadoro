import CustomNextRequest from '@/types/CustomNextRequest';
import { getToken } from 'next-auth/jwt';

import CustomError from './CustomError';

const authMiddleware = (handler: (req: CustomNextRequest) => void) => {
	return async (req: CustomNextRequest) => {
		const token = await getToken({ req });

		console.log('token', token);

		if (!token) {
			throw new CustomError('Unauthorized.', 401);
		}

		req.token = token;
		return handler(req);
	};
};

export default authMiddleware;
