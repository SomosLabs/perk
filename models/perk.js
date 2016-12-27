const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PerkSchema = new Schema({
  title: String,
  description: String,
  image: String,
  provided_by: { type: Schema.ObjectId, ref: 'Partner' },
  view: {
    class: String,
    button: String,
    how_to: String,
  },
  redeem: {
    promo: String,
    url: String,
  },
}, { timestamps: true }, { collection: 'perks' });

const PerkModel = mongoose.model('Perk', PerkSchema);
module.exports.Perk = PerkModel;
module.exports.Schema = PerkSchema;
