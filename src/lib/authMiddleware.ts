import CustomNextRequest from '@/types/CustomNextRequest';
import { NextResponse } from 'next/server';
import { getAuthSession } from './auth';

const authMiddleware = (handler: (req: CustomNextRequest) => void) => {
  return async (req: CustomNextRequest) => {
    try {
      const session = await getAuthSession();
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
      }
      req.email = session.user.email;
      return handler(req);
    } catch {}
  };
};

export default authMiddleware;
