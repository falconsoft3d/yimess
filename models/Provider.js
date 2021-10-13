import mongoose from 'mongoose'

const Providerchema = new mongoose.Schema(
    {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    state: { type: String },
    },  
    { timestamps: true }
  )

module.exports = mongoose.models.Provider || mongoose.model('Provider', Providerchema)