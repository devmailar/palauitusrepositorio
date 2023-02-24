const Persons = ({ deletePerson, persons }) => {
  return persons.map((person) => (
    <div key={person.id}>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  ));
};

export default Persons;
