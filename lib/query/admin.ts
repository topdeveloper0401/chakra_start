import { NextApiRequest } from 'next';
import bcrypt from 'bcrypt';
import { toast } from 'react-toastify';

import { connectToDatabase } from "~/lib/util/mongodb";
import User from '../models/user';


export const postUser = async (req: NextApiRequest) => {
    try {
        await connectToDatabase();
        let { db } = await connectToDatabase();
        const collection = db.collection("User");
        const {name, password, email} = req.body;
        let result = (await collection.find({email: email}).toArray()).length;
        if(result > 0) {
            return ({result:false});
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            const result = await collection.insertOne({ name:name, email:email, password:hash, kyc_status: false, account_created: new Date().toISOString(), company: false, verified: false, is_active: false});
            return {result:result};
            // const user = new User({
            //     name: req.body.name,
            //     email: req.body.email,
            //     password: hash,
            //     kyc_status: false,
            //     account_created: new Date().toISOString(),
            //     company: false,
            //     verified: false,
            //     is_active: false
            // });
            // await user.save();
        }
    } catch (error) {
        throw Error('Database operation failed');
    }
};