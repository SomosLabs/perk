const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first: String,
  last: String,
  email: String,
  phone: String,
  image: String,
  hasJob: Boolean,
  resume: { type: Schema.ObjectId, ref: 'Resume' },
  auth: [{
    provider: String,
    id: String,
    oauth_token: String,
    last_login: Date,
  }],
  perks: [{
    id: { type: Schema.ObjectId, ref: 'Perk' },
    used: Boolean,
    used_on: Date,
  }],
  companies: [{
    id: { type: Schema.ObjectId, ref: 'Company' },
    applied: Boolean,
    applied_on: Date,
  }],

}, { timestamps: true }, { collection: 'users' });

const UserModel = mongoose.model('User', UserSchema);
module.exports.User = UserModel;
module.exports.Schema = UserSchema;
