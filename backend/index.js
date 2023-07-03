const express = require('express');
const cors = require('cors');
const app = express();

const allowedOrigins = ['http://localhost:5173',
                      'localhost:3000'];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));

app.get("/", (req, res) => {
    res.json({success: true, message: "Hello World!"});
});

app.post("/api/v1/auth/login", (req, res) => {
    return res.json({success: true, message: "Login successful!"});
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
});