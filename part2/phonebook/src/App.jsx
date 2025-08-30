import { useEffect, useState } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  // Handler for when the form is submitted
  const addPerson = (event) => {
    event.preventDefault(); // Prevent page reload

    const personObject = {
      name: newName,
      number: newNumber,
    };

    // Alert the user if name/number already exists
    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const numberExists = persons.some((person) => person.number === newNumber);

    if (nameExists && numberExists) {
      alert(`${newName} and ${newNumber} are already added to phonebook`);
      return;
    } else if (nameExists) {
      if (
        window.confirm(
          `${personObject.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        );
        changePerson(existingPerson.id, personObject);
      }
      return;
    } else if (numberExists) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  const changePerson = (id, updatedPerson) => {
    personService.update(id, updatedPerson).then((returnedPerson) => {
      setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
    });
    setNewName("");
    setNewNumber("");
  };

  // Handler for updating input state on each keystroke
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleQuery = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div>
        <h2>PhoneBook</h2>

        <Filter value={query} onChange={handleQuery} />

        <h3>Add a new</h3>

        <PersonForm
          person={{ newName, newNumber }}
          onNameChange={handleNameChange}
          onNumberChange={handleNumberChange}
          onSubmit={addPerson}
        />

        <h3>Numbers</h3>

        <PersonList persons={persons} query={query} onDelete={deletePerson} />
      </div>
    </>
  );
};

export default App;
