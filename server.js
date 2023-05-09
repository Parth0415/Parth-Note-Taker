const express = require("express");
const path = require("path");
const fs = require("fs");
const dbData = require("./Develop/db/db.json");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static("./Develop/public"));
app.use(express.json());

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(dbData);
});

app.post("/api/notes", (req, res) => {
  dbData.push(req.body);
  console.log(dbData)
  fs.writeFile(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(dbData), (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("congratulations")
    }
  });
  let response = {
    status: 'success',
    data: req.body,
  };

  res.status(200).json(response)
});

app.delete("/api/notes/:id", (req, res)=>{
   dbData.forEach((element)=>{
    if(element.id ==  req.params.id){
        dbData.pop(element)
    }
   })
   fs.writeFile(path.join(__dirname, "Develop/db/db.json"), JSON.stringify(dbData), (err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("congratulations")
    }
  });


   let response = {
    status: 'success',
    data: req.body,
  };

  res.status(200).json(response)
})

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
