// Node + Express example
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use((req,res,next)=>{ res.header("Access-Control-Allow-Origin","*"); res.header("Access-Control-Allow-Headers","Content-Type"); next(); });

app.post('/api/ask', (req, res) => {
  const prompt = req.body.prompt || "";
  // For testing, just echo or return a static reply
  res.json({ reply: "You asked: " + prompt });
});

app.listen(5000, () => console.log('Server running http://localhost:5000'));
