import { NextApiRequest, NextApiResponse } from "next";

import { postUser } from '~/lib/query/admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
  ) {
  // let { db } = await connectToDatabase();

  // const blogs = await db.collection("User").find().toArray();
  // res.status(200).json({ blogs });
  if (req.method === 'GET') {
  } else if (req.method === 'POST') {
      const user = await postUser(req);
      return res.status(200).json({user});
  }
}