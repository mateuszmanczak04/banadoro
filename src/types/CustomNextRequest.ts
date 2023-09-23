import { NextRequest } from 'next/server';

export default interface CustomNextRequest extends NextRequest {
  email: string;
}
