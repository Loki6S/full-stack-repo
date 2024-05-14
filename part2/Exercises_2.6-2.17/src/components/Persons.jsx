import Person from "./Person"

const Persons = ({ personsToShow, deleteElement }) => {
    return (
        <div>  
            {personsToShow.map(person => (
                <Person key={person.id} person={person} deletePerson={() => deleteElement(person.id)}/>
            ))}
        
        </div>
    );
};

export default Persons