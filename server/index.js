// server/index.js
const path = require("path")
const express = require("express");
const uri = process.env.MONGODB_URI

const PORT = process.env.PORT || 3001;

const app = express();

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection 

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
    res.semdFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

db.on('error', console.error.bind(console, "Database connection failed"))