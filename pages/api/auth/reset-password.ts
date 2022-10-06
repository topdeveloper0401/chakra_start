import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

import { errorWrapper } from 'helpers/errorWrapper';
import { getUser, updateUser } from '~/lib/query/admin';
import { sendEmail } from '~/lib/util/ses';
import { emailTemplates } from '~/lib/util/emailTemplates';

const resetPassword = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        const email = req.query.email as string;
        const user = await getUser({ email });

        if (!user) {
            throw new Error('UserNotFound');
        }

        const token = jwt.sign(
            { email },
            process.env.NEXT_PUBLIC_EMAIL_VERIFICATION_SECRET + email
        );

        const link = `${process.env.NEXT_PUBLIC_HOST}/login/reset?token=${token}`;
        const statusCode = await sendEmail({
            to: email,
            template: 'ResetPassword' as emailTemplates,
            link,
        });

        if (statusCode == 200) {
            res.status(200).json({ success: true });
        } else {
            throw new Error('EmailSendError');
        }
    } else if (req.method === 'PUT') {
        const { email, password, verify } = req.body;
        const user = await getUser({ email });
        const saltRounds = 10;

        const hash = await bcrypt.hash(password, saltRounds);

        const fieldsToUpdate = verify
            ? { password: hash, verified: true }
            : { password: hash };

        const updatedObject = { ...user.toObject(), ...fieldsToUpdate };
        const response = await updateUser(updatedObject);

        res.status(200).json({ success: response ? true : false });
    } else {
        throw Error('Method not allowed');
    }
};

export default errorWrapper(resetPassword);
