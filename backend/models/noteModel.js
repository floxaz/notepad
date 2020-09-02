const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  edited: {
    type: Boolean,
    default: false
  },
  sheet: {
    type: String,
    required: true
  }
});

noteSchema.index({
  subject: 'text',
  content: 'text'
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
