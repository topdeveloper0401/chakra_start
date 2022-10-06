import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import { toast } from 'react-toastify';

import { connectToDatabase } from "~/lib/util/mongodb";
import User from '../models/user';
import { isNil } from '../util';



export const getUser = async ({
    id,
    email,
}: {
    id?: number;
    email?: string;
}) => {
    try {
        await connectToDatabase();
        const query = {
            ...(!isNil(id) && { id }),
            ...(!isNil(email) && { email }),
        };

        const user = await User.findOne(query);
        return user;
    } catch (error) {
        throw Error('Database operation failed');
    }
};

export const postUser = async (req: NextApiRequest) => {
    try {
        await connectToDatabase();
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            password: hash,
            email: req.body.email,
            company: false,
            kyc_status: false,
            account_created: new Date().toISOString(),
        });
        await user.save();
        return user;
    } catch (error) {
        throw Error('Database operation failed');
    }
};
export const updateUser = async ({ _id, ...updatedUser }: any) => {
    try {
        const user = await User.findByIdAndUpdate(
            _id,
            { $set: { ...updatedUser } },
            { new: true }
        );
        return user;
    } catch (error) {
        throw Error('Database operation failed');
    }
};

