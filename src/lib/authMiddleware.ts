import { getAuthSession } from '@/app/api/auth/[...nextauth]/route';
import CustomNextRequest from '@/types/CustomNextRequest';

import CustomError from './CustomError';

const authMiddleware = (handler: (req: CustomNextRequest) => void) => {
	return async (req: CustomNextRequest) => {
		const session = await getAuthSession();
		if (!session || !session.user || !session.user.email) {
			throw new CustomError('Unauthorized.', 401);
		}

		req.email = session.user.email;
		return handler(req);
	};
};

export default authMiddleware;
