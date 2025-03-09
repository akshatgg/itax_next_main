import { errorHandler, errorMessages } from '@/helper/api/error-handler';
import db from '@/lib/db';
import { emailTypes } from '@/lib/mailingService';
import { z } from 'zod';
import { safeParse } from 'zod-error';

const otpVerificationValidation = z.object({
  email: z.string().email(),
  otp_key: z.number(),
  otp: z.string().min(6),
  type: z.enum(Object.keys(emailTypes)),
});

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('🚀 ~ POST ~ body:', body);
    const validationRes = safeParse(otpVerificationValidation, body);
    console.log('🚀 ~ POST ~ validationRes:', validationRes);

    if (!validationRes.success) {
      const { error } = validationRes;
      req.error = error;
      throw new Error(errorMessages.validationError);
    }

    const { email, otp_key, otp, type } = validationRes.data;

    const isOtp = await db.otp.findFirst({
      where: {
        id: parseInt(otp_key, 10),
      },
    });
    console.log('🚀 ~ POST ~ isOtp:', isOtp);

    if (!isOtp) {
      throw new Error('Invalid Otp');
    }

    const otpTime = isOtp.createdAt.getTime();
    const tenMinutes = 10 * 60 * 1000;
    const currentTime = Date.now();
    const isOtpExpired = currentTime > otpTime + tenMinutes;

    if (isOtpExpired) {
      throw new Error('Otp expired');
    }

    if (isOtp.otp !== otp) {
      throw new Error('Invalid Otp');
    }

    const updatedUser = await db.user.update({
      where: {
        id: isOtp.userId,
        email: email,
      },
      data: {
        verified: true,
      },
    });

    if (!updatedUser) {
      throw new Error('Invalid Otp');
    }

    if (type === 'email') {
      await db.otp.update({
        where: {
          id: otp_key,
        },
        data: {
          used: true,
        },
      });
    }

    return new Response(
      JSON.stringify({
        status: 200,
        message: `User is successfully verified!`,
      }),
    );
  } catch (err) {
    return errorHandler(err, req);
  }
}
