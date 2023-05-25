import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5500'
}));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

let users = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
];

app.get("/api/users", (req, res) => {
  res.json({ status: "success", data: users });
});

app.post("/api/users", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ status: "success", data: user });
});
