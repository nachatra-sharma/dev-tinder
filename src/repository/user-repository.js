const User = require("../models/user-models");

async function get(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getAll() {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.log(error);
  }
}

async function destroy(id) {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function update(id, data) {
  try {
    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function create(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
  getAll,
  destroy,
  create,
  update,
};
