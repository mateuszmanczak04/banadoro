import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto-js';
import jwt, { Secret } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    await dbConnect();

    const user = await User.exists({ email });

    if (!user)
      return NextResponse.json(
        { message: 'Email not found.' },
        { status: 404 }
      );

    // generate random token with crypto
    const randomToken = crypto.lib.WordArray.random(16).toString();

    await User.findOneAndUpdate({ email }, { resetPasswordToken: randomToken });

    const token = jwt.sign(
      { email, token: randomToken },
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: '15m',
      }
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    const option = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Reset Password',
      text: 'Reset Password',
      html: `<a href="http://localhost:3000/reset-password?&token=${token}">Reset Password</a>`,
    };
    transporter.sendMail(option, (error, info) => {
      if (error) {
        return NextResponse.json(
          {
            message: 'Internal Server Error.',
          },
          { status: 500 }
        );
      }
    });
    return NextResponse.json({ message: 'Email sent.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
