const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
  name: String,
  location: String,
  image: String,
  website: String,
  social: {
    twitter: String,
    facebook: String,
  },
  company: { type: Schema.ObjectId, ref: 'Company' },

}, { timestamps: true }, { collection: 'partners' });

const PartnerModel = mongoose.model('Partner', PartnerSchema);
module.exports.Partner = PartnerModel;
module.exports.Schema = PartnerSchema;
