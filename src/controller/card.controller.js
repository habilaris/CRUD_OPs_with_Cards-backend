const getCards = async (req, res) => {
  console.log("Got a request at api/admin/cards");
  const users = await userModel.find();
  console.log("Fetched users at /api/admin/cards\n");
  res.status(200).send(users);
};

const createCard = async (req, res) => {
  try {
    const { name, age, gender } = req.body;

    const newUser = await userModel.create({ name, age, gender });
    res.status(201).send({ message: "User Created", newUser });
    console.log("A new user is created.", newUser);
  } catch (err) {
    res.status(400).send({ message: "Could not create the user!" });
    console.log("Error creating the user:", err);
  }
};

const updateCard = async (req, res) => {
  console.log(`\n${req.ip} visited /update-card\n`);
  try {
    const { card_id, name, age, gender } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      card_id,
      {
        $set: { name, age, gender },
        $inc: { updateCount: 1 },
      },
      {
        runValidators: true /* Validated the Model */,
        new: true /* Returns the new document instead of the old one*/,
      },
    );
    console.log("User updated successfully.", updatedUser);
    res.status(200).send({ message: "User has been updated", updatedUser });
  } catch (err) {
    res.status(400).send({ message: "Could not update the user!" });
    console.log("Error updating the user:", err);
  }
};

const deleteCard = async (req, res) => {
  const { name, age } = req.body;
  console.log("\nSomeone visited /delete-cards\n");
  try {
    await userModel.deleteOne({ name, age });
    res.status(200).send({
      message: `The card of the user ${name} of age ${age} has been deleted!`,
    });
  } catch (err) {
    console.error("Something went wrong in deleting the user card.", err);
    res
      .status(404)
      .send({ message: "Something went wrong in deleting the user card." });
  }
};

module.exports = {
  createCard,
  getCards,
  updateCard,
  deleteCard,
};
