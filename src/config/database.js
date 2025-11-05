const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://soumyamanna729_db_user:zlSQyyu4icsmGQD0@cluster0.zfjdubj.mongodb.net/"
  );
};

module.exports = connectDB


