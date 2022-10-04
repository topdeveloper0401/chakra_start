import { model, models, Schema } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    kyc_status: Boolean,
    account_created: Date,
    company: Boolean,
    verified: Boolean,
    is_active: Boolean,
});

const User = models.User || model('User', userSchema);

export default User;
