const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/transactions-app", {
  useNewUrlParser: true,
});

const path = require("path");
const Transaction = require("./server/models/transactionSchema");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  next();
});
app.get("/transactions", async function (req, res) {
  res.send(await Transaction.find({}));
  res.end();
});
app.post("/transaction", async function (req, res) {
  let data = req.body;
  let transaction = new Transaction({
    vendor: data.vendor,
    amount: data.amount,
    category: data.category,
    id: data.id,
    typeAc: data.typeAc,
  });
  transaction.save();
  res.send("ok");
  res.end();
});

app.delete("/transaction/:idTrans", async function (req, res) {
  const idTrans = req.params.idTrans;
  await Transaction.find({ id: idTrans }).deleteOne();
  res.send("ok");
  res.end();
});
const port = 3050;
app.listen(port, function () {
  console.log(`running server in port: ${port}`);
});
