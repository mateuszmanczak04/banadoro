import CustomNextRequest from '@/types/CustomNextRequest';
import { getToken } from 'next-auth/jwt';

import CustomError from './CustomError';

const authMiddleware = (handler: (req: CustomNextRequest) => void) => {
	return async (req: CustomNextRequest) => {
		const token = await getToken({ req });

		if (!token || !token.sub) {
			throw new CustomError('Invalid token.', 401);
		}

		req.token = token;
		return handler(req);
	};
};

export default authMiddleware;
