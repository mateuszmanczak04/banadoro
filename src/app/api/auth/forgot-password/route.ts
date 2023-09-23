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

    const user = await User.findOne({ email }).select({ username: 1 });

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

    const options = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: 'Reset Password',
      text: 'Reset Password',
      // html: `<a href="">Reset Password</a>`,
      html: `
        <div style="background: #111827; color: white; padding: 2rem; border-radius: 1rem; font-family: sans-serif;">
          <h1 style="display: block;">Hi ${user.username}</h1>
          <h2 style="display: block;">It is a response for your reset password request.</h2>
          <a href="${process.env.BASE_URL}/reset-password?&token=${token}" style="background-color: #ffbe0a; color: #111827; padding: 0.25rem 0.5rem;cursor: pointer; display: block; border-radius: 0.25rem; font-size: 1rem; font-weight: medium; width: fit-content; text-decoration: none;">Click here to reset your password.</a>
          <small style="opacity: 75%; display: block; margin-top: 0.5rem;">Ignore this email if it was not you trying to reset it.</small>
        </div>
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          return reject(error);
        }

        return resolve(success);
      });
    });

    await new Promise((resolve, reject) => {
      transporter.sendMail(options, (error, info) => {
        if (error) {
          return reject(error);
        }
        return resolve(info);
      });
    });

    return NextResponse.json({ message: 'Email sent.' }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: 'Internal Server Error.' },
      { status: 500 }
    );
  }
}
