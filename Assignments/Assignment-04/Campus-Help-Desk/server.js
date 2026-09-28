import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

// GET all requests
app.get("/api/requests", (req, res) => {
  const data = fs.readFileSync("requests.json", "utf-8");

  const requests = JSON.parse(data);

  res.json(requests);
});

// POST a new request
app.post("/api/requests", (req, res) => {
  const data = fs.readFileSync("requests.json", "utf-8");

  const requests = JSON.parse(data);

  const newRequest = {
    id: requests.length > 0
      ? requests[requests.length - 1].id + 1
      : 1,

    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority
  };

  requests.push(newRequest);

  fs.writeFileSync(
    "requests.json",
    JSON.stringify(requests, null, 2)
  );

  res.json(newRequest);
});

// GET a single request
app.get("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync("requests.json", "utf-8");

  const requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const request = requests.find(
    (item) => item.id === id
  );

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  res.json(request);
});

// UPDATE a request
app.put("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync("requests.json", "utf-8");

  let requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const index = requests.findIndex(
    (item) => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  requests[index] = {
    id: id,
    studentName: req.body.studentName,
    email: req.body.email,
    category: req.body.category,
    description: req.body.description,
    priority: req.body.priority
  };

  fs.writeFileSync(
    "requests.json",
    JSON.stringify(requests, null, 2)
  );

  res.json({
    message: "Request updated successfully",
    request: requests[index]
  });
});

// DELETE a request
app.delete("/api/requests/:id", (req, res) => {
  const data = fs.readFileSync("requests.json", "utf-8");

  let requests = JSON.parse(data);

  const id = parseInt(req.params.id);

  const requestExists = requests.some(
    (item) => item.id === id
  );

  if (!requestExists) {
    return res.status(404).json({
      message: "Request not found"
    });
  }

  requests = requests.filter(
    (item) => item.id !== id
  );

  fs.writeFileSync(
    "requests.json",
    JSON.stringify(requests, null, 2)
  );

  res.json({
    message: "Request deleted successfully"
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});