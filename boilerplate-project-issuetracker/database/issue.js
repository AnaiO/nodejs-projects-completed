const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IssueSchema = new Schema({
  issue_title: {
    type: String,
    required: true,
    maxLength: 50
  },
  issue_text: {
    type: String,
    required: true,
    maxLength: 250
  },
  created_by: {
    type: String,
    required: true,
    maxLength: 50
  },
  assigned_to: {
    type: String,
    required: false,
    maxLength: 50
  },
  open: {
    type: Boolean,
    default: true
  },
  status_text: {
    type: String,
    required: false,
    maxLength: 50
  },
  project: {
    type: String,
    required: true,
    maxLength: 50
  }
}, { 
  timestamps: {
    createdAt: "created_on",
    updatedAt: "updated_on"
  }
});

const Issue = mongoose.model('Issue', IssueSchema);


module.exports = { Issue };
