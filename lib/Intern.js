// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

//https://jenkov.com/tutorials/java/constructors.html#:~:text=A%20class%20that%20extends%20another,must%20call%20the%20superclass%20constructor. Extending constructor classes

// Intern.js

const Employee = require("./Employee");
//super used to apply previous/invoke constructor of parent class
class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
