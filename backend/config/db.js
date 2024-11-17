
const  mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/movie")
// mongoose.connect("mongodb+srv://movie:<Movie1212!>@moive.jcgvb.mongodb.net/?retryWrites=true&w=majority&appName=moive")
const connectToDatabase = async () => {
    try {
      await mongoose.connect("mongodb+srv://movie:Movie1212!@moive.jcgvb.mongodb.net/?retryWrites=true&w=majority&appName=moive");
      console.log("Database connection successful");
    } catch (err) {
      console.error("Database connection error:", err);
    }
  };
  connectToDatabase();
