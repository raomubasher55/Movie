require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./config/db')



const express  = require('express');
const app = express();
app.use(express.json())
app.use(express.static('public'));
app.use(cookieParser());

app.use(cors({
  origin: ['https://fiilmywap.com/' , 'http://localhost:3000/' , 'http://localhost:5173/'],  // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true 
}));

app.use((err, req, res, next) => {
    console.error(err.stack);  // Log the error for debugging
    res.status(500).json({ error: 'Something went wrong!' });
});

const movieRoute = require('./routes/movieRoute');
const userRoute = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoute');
const deletecategory = require('./routes/deletecategory')

app.get('test', (req ,res)=>{
  res.send("Hello world")
})
app.use('/api/v1', userRoute);
app.use('/api/v1', movieRoute);
app.use('/api/v1', categoryRoutes);
app.use('/api/v1', deletecategory);






// Simulated mode state
const Mode = require('./models/mode')
// Route to toggle mode
app.post("/api/mode/toggle", async (req, res) => {
    const { onMode: newMode, link } = req.body; // Assuming you're sending a link too

    try {
        // Delete any existing mode data
        await Mode.deleteMany({}); // Deletes all existing mode data

        // Create new mode object
        const mode = new Mode({
            onMode: newMode,
            link: link || '',  // Assuming link might be part of the request
        });

        // Save the new mode data
        await mode.save();

        res.json({ onMode: mode.onMode, link: mode.link });
    } catch (err) {
        console.error("Error toggling mode:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});



  // Server-side route for saving the link
app.post("/api/mode/saveLink", async (req, res) => {
    const { link } = req.body;
    console.log(req.body);
    
  
    if (!link) {
      return res.status(400).json({ error: "Link is required." });
    }
  
    try {
      let mode = await Mode.findOne();
      if (!mode) {
        mode = new Mode(); // If no mode document exists, create a new one
      }

      mode.link = link;
  
      // Save the mode document with the link
      await mode.save();
  
      res.json({ link: mode.link });
    } catch (err) {
      console.error("Error saving link:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

  app.get("/api/mode/status", async (req, res) => {
    try {
      const mode = await Mode.findOne();
      
      res.json(mode);
    } catch (err) {
      console.error("Error fetching mode status:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });


const port = process.env.SERVER_PORT | 4000;
// console.log(process.env.SERVER_PORT);
app.listen(port,'0.0.0.0' , ()=>{ 
    console.log("server is runing on port : " + port);
});