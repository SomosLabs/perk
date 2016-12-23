const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
  url: String,
}, { timestamps: true }, { collection: 'resumes' });

const ResumeModel = mongoose.model('Resume', ResumeSchema);
module.exports.User = ResumeModel;
module.exports.Schema = ResumeSchema;
