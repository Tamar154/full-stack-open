const PersonList = ({ persons, query }) => {
  const personsToShow =
    query.length === 0
      ? persons
      : persons.filter((person) => person.name.toLowerCase().includes(query));

  return (
    <div>
      {personsToShow.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default PersonList;
