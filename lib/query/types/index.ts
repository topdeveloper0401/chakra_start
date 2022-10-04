import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
export interface UserType {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    wallet_id: string;
    title: string;
    kyc_status?: boolean;
    account_created: string;
    company: boolean;
    verified: boolean;
    is_active: boolean;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    wallet_id: string;
    title: string;
    kyc_status?: boolean;
    account_created: string;
    company: boolean;
    verified: boolean;
    is_active: boolean;
}
