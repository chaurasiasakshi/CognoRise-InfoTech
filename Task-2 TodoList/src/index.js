const express = require("express");
const path = require("path");
bcrypt = require("bcrypt");
DB = require("./database.js");
app = express();
port = 8080;

// Middleware
app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.listen(port ,()=>{console.log( `My Server is running on ${port}`)});

// EJS
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"../public")));

app.get("/task",(req,res)=>{
    res.render("task")
});

// Create
app.post("/task",async(req,res)=>{
    const {Name,Date}=req.body;
    TaskData = new DB({
        Name,Date
    });
    tasksave = await TaskData.save();
    res.redirect('/');
});

// Read
app.get("/"  , async (req,res) => {
    Tt = await DB.find()
    res.render('index',{
        page:"NodeJS",
        Tt:Tt
    });
    });

// Update
app.get('/update/:id', async (req, res) => {
	id = req.params.id;
	updateData = await DB.findById({_id: id});
    if(updateData==null){res.redirect('/')}
    else {res.render('update',{Tt:updateData})}
});

app.post("/update/:id", async (req, res) => {
	id = req.params.id;
	const {Name, Date} = req.body;
	updateData = await DB.findByIdAndUpdate({_id: id},
     {Name,Date	},
     {new: true});
	res.redirect("/")
});

// Delete
app.get("/delete/:id",async(req,res)=>{
    // const {id} = req.params;
    try{
       const deleteData = await DB.findByIdAndDelete(req.params.id);
        res.redirect("/")

    }
    catch(error){
        console.log(error);
        res.status(500).send("Internal server error")
    }
});

