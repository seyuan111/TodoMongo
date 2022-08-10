// -------------------------------------
// TodoList using Mongo_db EJS nodeJS
// --------------------------------------

const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 1337;

//=======================================
// Link to Database -_"
//=======================================

require("dotenv").config();
let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = "todoList";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then(
	(client) => {
		console.log(`We are connecting you to ${dbName}`);
		db = client.db(dbName);

		//=======================================
		// Middlewares :
		//=======================================
		app.set("view engine", "ejs");
		app.use(express.static("public"));
		app.use(express.urlencoded({ extended: true }));
		app.use(express.json());

		//======================================
		// Routes :
		//=======================================

		app.get("/", async (req, res) => {
			const Items = await db.collection("todos").find().toArray();
			const LeftTodo = await db
				.collection("todos")
				.countDocuments({ completed: false });
			res.render("index.ejs", { items: Items, LeftTodo: LeftTodo });
		});

		app.post("/addTodo", async (req, res) => {
			await db
				.collection("todos")
				.insertOne({ task: req.body.task, completed: false });
			console.log("task added : =>", req.body.task);
			res.redirect("/");
		});

		app.put("/Completed", (req, res) => {
			db.collection("todos")
				.updateOne(
					{ task: req.body.JsItem },
					{
						$set: {
							completed: req.body.Jstat,
						},
					},
					{
						sort: { _id: -1 },
						upsert: false,
					}
				)
				.then((re) => {
					console.log("Marked ");
					res.json("Marked");
				})
				.catch((err) => console.error(err));
		});

		app.delete("/deleteItem", (req, res) => {
			db.collection("todos")
				.deleteOne({ task: req.body.JsItem })
				.then((result) => {
					console.log(req.body.JsItem, "Deleted task");
					res.json("task Deleted");
				})
				.catch((err) => console.error(err));
		});

		app.listen(PORT, () => console.log(`app on PORT :${PORT} `));
	}
);
