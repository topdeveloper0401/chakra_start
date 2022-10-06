
import { errorWrapper } from 'helpers/errorWrapper';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getUser, postUser } from '~/lib/query/admin';

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
    } else if (req.method === 'POST') {
        const user = await postUser(req);
        return res.status(200).json({});
    }
};

export default errorWrapper(userHandler);
