const express = require("express");
const app = express();

app.use(express.json());

const persons = [
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

const PORT = 3001;
app.listen(PORT, () => console.log("Listening on PORT: ", PORT));
