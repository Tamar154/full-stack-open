const PersonList = ({ persons, query, onDelete }) => {
  const personsToShow =
    query.length === 0
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(query));

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      ))}
    </div>
  );
};

export default PersonList;
