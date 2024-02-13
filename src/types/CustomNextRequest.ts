import { JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export default interface CustomNextRequest extends NextRequest {
	token: JWT;
}
