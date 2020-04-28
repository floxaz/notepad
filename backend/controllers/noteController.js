const Note = require('../models/noteModel');

exports.getAllNotes = async (req, res) => {
  try {
    const queryObj  = { ...req.query };
    const exludedFields = ['sort', 'page', 'limit'];

    exludedFields.forEach(field => {
      delete queryObj[field];
    });

    let query = '';
    if (!queryObj.search && !queryObj.sheet) {
      query = Note.find();
    } else if (queryObj.search && !queryObj.sheet) {
      query = Note.find({
        $text: {
          $search: queryObj.search
        }
      });
    } else if (!queryObj.search && queryObj.sheet) {
      query = Note.find({
        sheet: queryObj.sheet
      });
    } else {
      query = Note.find({
        $text: {
          $search: queryObj.search
        },
        sheet: queryObj.sheet
      });
    }

    if (req.query.sort) {
      query.sort(req.query.sort);
    }

    const qc = query.toConstructor();
    const clonedQuery = new qc();
    const totNotes = await clonedQuery.countDocuments();

    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    query.select('-__v');
    const notes = await query;
    const pages = Math.ceil(totNotes / limit);
    res.json({
      status: 'success',
      total: totNotes,
      pages,
      page,
      pageLimit: limit,
      results: notes.length,
       data: {
         notes
       }
    })
  } catch (err) {
    console.log(err);
    res.status(404);
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
      content: req.body.content,
      sheet: req.body.sheet
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
