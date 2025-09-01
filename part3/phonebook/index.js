const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

morgan.token("body", (request) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// GET (info page)
app.get("/info", (request, response) => {
  const date = new Date();
  const info = `Phonebook has info for ${persons.length} people`;
  response.send(`
    <p>${info}</p>
    <p>${date}</p>`);
});

// GET all
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// GET by id
app.get("/api/persons/:id", (request, response) => {
  const requestedId = request.params.id;

  const data = persons.find((person) => person.id === requestedId);

  if (data) {
    response.json(data);
  } else {
    response.status(404).end();
  }
});

// DELETE
app.delete("/api/persons/:id", (request, response) => {
  const requestedId = request.params.id;

  persons = persons.filter((person) => person.id !== requestedId);
  response.status(204).end();
});

const generateId = () => {
  const id = Math.floor(Math.random() * 1_000_000);
  return String(id);
};

// POST
app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "missing name or number" });
  }

  if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => console.log("Listening on PORT: ", PORT));
