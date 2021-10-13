import dbConnect from "../../../db/dbConnect";
import Provider from "../../../models/Provider";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  verifyToken(req, res);

  switch (method) {
    case "POST":
      try {
        const data = req.body;
        console.log(data)
        const provider = await Provider.create(data); /* create a new model in the database */
        console.log("provider:", provider)
        res.status(201).json({ success: true, data: provider });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}