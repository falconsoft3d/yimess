import mongoose from 'mongoose'

const Providerchema = new mongoose.Schema(
    {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    active: {
      type: Boolean,
      default: false,
    }
    },  
    { timestamps: true }
  )

module.exports = mongoose.models.Provider || mongoose.model('Provider', Providerchema)