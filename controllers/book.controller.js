const bookModel = require("../model/book.model");

const getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find();
    res.json({ success: true, books });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const getSingleBook = async (req, res) => {
  try {
    const book = await bookModel.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ success: false, error: 'No book found' });
    }

    res.json({ success: true, book });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const addBook = async (req, res) => {
  try {
    const { author, title, description } = req.body;

    if (!author || !title || !description) {
      return res.status(400).json({ success: false, error: 'Please fill all fields' });
    }

    const book = await bookModel.create({
      author,
      title,
      description,
    });

    res.status(201).json({ success: true, id: book._id });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, description } = req.body;

    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { author, title, description },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ success: false, error: 'No book found' });
    }

    res.json({ success: true, updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ success: false, error: 'No book found' });
    }

    res.json({ success: true, deletedBook });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  getAllBooks,
  getSingleBook,
  addBook,
  updateBook,
  deleteBook,
};
