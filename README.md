Mongoose Flow (Schema → Model → Document)

1️⃣ Create a Schema

A schema defines the structure of documents inside a MongoDB collection.
It describes what fields a user will have and what type each field is.

<!-- const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  emailId: String,
  password: String,
}); -->

2️⃣ Create a Model

A model is created from the schema.
It acts like a class and gives you functions to create, read, update, or delete data.

<!-- const User = mongoose.model("User", userSchema); -->


3️⃣ Create a Document (Instance)

A document (also called an instance) is created using the model.
This represents one actual user.

<!-- const user = new User({
  firstName: "Example",
  lastName: "User",
}); -->

4️⃣ Save the Document to MongoDB

Saving stores the document permanently in the database.

<!-- await user.save(); -->

✔ Summary (Easy to Remember)

Schema → Model → Document → Save

Schema = blueprint

Model = class

Document/Instance = actual object created from the model

Save = store it in MongoDB
