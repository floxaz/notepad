const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({
      status: 'success',
      results: notes.length,
      data: {
        notes
      }
    })
  } catch(err) {
    res.status(400);
    res.json({
      status: 'failure',
      message: err
    })
  }
};

exports.getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    res.json({
      status: 'success',
      data: {
        note
      }
    });
  } catch(err) {
    res.status(400);
    res.json({
      status: 'failure',
      message: err
    });
  }
}

exports.createNote = async (req, res) => {
  try {
    const newNote = await Note.create({
      subject: req.body.subject,
      content: req.body.content
    });
    res.json({
      status: 'success',
      data: {
        note: newNote
      }
    });
  } catch(err) {
    res.status(400);
    res.json({
      status: 'failure',
      message: err
    });
  }
}

exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    res.json({
      status: 'success',
      data: {
        note: updatedNote
      }
    });
  } catch(err) {
    res.status(400);
    res.json({
      status: 'failure',
      message: err
    });
  }
}

exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);
    res.status(204);
    res.json({
      status: 'success',
      data: {
        note: deletedNote
      }
    });
  } catch(err) {
    res.status(400);
    res.json({
      status: 'failure',
      message: err
    });
  }
}
