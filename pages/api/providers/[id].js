import dbConnect from '../../../db/dbConnect';
import Provider from '../../../models/Provider';
import { verifyTokenAndAuthorization } from "../../../utils/verifyToken";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect();
  // Verify the Id user
  const provider = await Provider.findById(id)
  if (!provider) return res.status(400).json({ success: false })
  verifyTokenAndAuthorization(req, res, provider.userId);

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        res.status(200).json({ success: true, data: provider })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      console.log("PUT")
      try {
        const provider = await Provider.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })


        if (!provider) {
          return res.status(400).json({ success: false, error: "provider"})
        }
        res.status(200).json({ success: true, data: provider })
      } catch (error) {
        res.status(400).json({ success: false, error: error })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedProvider = await Provider.deleteOne({ _id: id })
        if (!deletedProvider) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}