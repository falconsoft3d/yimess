import dbConnect from "../../../db/dbConnect";
import Provider from "../../../models/Provider";
import { verifyToken } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  verifyToken(req, res);

  switch (method) {
    case "GET":
      const idUser = req.query.iduser;
      if (!idUser) {
        res.status(400).json({ success: false, error: "Invalid Query" });
      }
      try {
        const providers = await Provider.find({
          userId: {
            $in: [idUser],
          },
        }).sort({ createdAt: -1 }); /* find all the data in our database */
        res.status(200).json({ success: true, data: providers });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const shortened = Math.random().toString(36).substr(2, 7);
        const data = req.body;
        const provider = await Provider.create({
          clicks: 0,
          shortened,
          ...data,
        }); /* create a new model in the database */
        res.status(201).json({ success: true, data: provider });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}