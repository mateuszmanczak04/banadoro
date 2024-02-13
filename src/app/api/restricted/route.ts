import { getServerSession } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/route';

export const GET = async (req: NextRequest) => {
	const session = await getAuthSession();
	const token = await getToken({ req });

	return NextResponse.json({ session, token });
};
