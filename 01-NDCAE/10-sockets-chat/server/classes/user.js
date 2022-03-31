class User{
    
    constructor(){
        this.people = [];
    }

    addPeople(id, name, room){
        let person = {id, name, room};
        this.people.push(person);
        return this.people;
    }

    getPerson(id){
        let person = this.people.filter(personArray => personArray.id === id)[0];
        return person;
    }

    getPeople(){
        return this.people;
    }

    getRoomPeople(room){
        let peopleInRoom = this.people.filter(person => person.room == room);
        return peopleInRoom;
    }

    delPerson(id){
        let personDel = this.getPerson(id);
        this.people = this.people.filter(person => person.id != id);
        return personDel;
    }
}

module.exports = {
    User
}