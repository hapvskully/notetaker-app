// const http = require('http');
const fs = require('fs');
const express = require("express");
const path = require('path')
const uniqid = require("uniqid")

const app = express()
const PORT = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))

app.get('/notes', (req, res) => {
    // console.log(req)
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get('/api/notes', (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if(err) throw err;
        res.json(JSON.parse(data))
    })
})

app.post('/api/notes', (req, res) => {
    let newNote = req.body
    newNote.id = uniqid()

    fs.readFile("./db/db.json", (err, data) => {
        if(err) throw err;
        let array = JSON.parse(data)
        array.push(newNote)

        fs.writeFile("./db/db.json", JSON.stringify(array), (err) =>{
            if (err) throw err;
            res.json(array)
        })
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.listen(PORT, ()=> {
    console.log("listening")
})
