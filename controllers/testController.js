const testUserController = (req, res) => {
  try {
    res.status(200).send("<h1>welcome to new page</h1>");
  } catch (error) {
    console.log('Error In test API', error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { testUserController };
