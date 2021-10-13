import dbConnect from '../../../../db/dbConnect';
import Provider from '../../../../models/Provider';
import User from '../../../../models/User';
import { verifyTokenAndAuthorization } from "../../../../utils/verifyToken";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req
  await dbConnect();
  const user = await User.findById(id)
  if (!user) return res.status(400).json({ success: false, error: "Error User" })
  
  verifyTokenAndAuthorization(req, res, id);
  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const providers = await Provider.find({
          userId: {
            $in: [id],
          },
        }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, providers })
      } catch (error) {
        res.status(400).json({ success: false, error})
      }
      break

    default:
      res.status(400).json({ success: false, error: "only Get" })
      break
  }
}