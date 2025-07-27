const categoryModel = require("../models/categoryModel");

// ===========================
// @desc    Create a new category
// @route   POST /api/v1/category
// ===========================
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // Validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please provide a category title",
      });
    }

    // Create and save new category
    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();

    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category API",
      error,
    });
  }
};

// ===========================
// @desc    Get all categories
// @route   GET /api/v1/category
// ===========================
const getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    res.status(200).send({
      success: true,
      totalCategories: categories.length,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Get All Categories API",
      error,
    });
  }
};

// ===========================
// @desc    Update a category
// @route   PUT /api/v1/category/:id
// ===========================
const updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    // Update the category
    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Category updated successfully",
      updatedCategory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category API",
      error,
    });
  }
};

// ===========================
// @desc    Delete a category
// @route   DELETE /api/v1/category/:id
// ===========================
const deleteCatController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        success: false,
        message: "Please provide a category ID",
      });
    }

    // Check if category exists
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "No category found with this ID",
      });
    }

    // Delete category
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Category API",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
