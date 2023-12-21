// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

//In object-oriented programming, the extends keyword is used to create a subclass (or derived class) that inherits properties and methods from another class, known as the superclass (or base class). The subclass extends the functionality of the superclass, allowing you to reuse code and establish a hierarchical relationship between classes.

const Employee = require('./Employee');


class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        //The super keyword is used in class constructors to invoke the constructor of the parent class. Inheritance in object-oriented programming allows a class (subclass or derived class) to inherit properties and methods from another class (superclass or base class).
      super(name, id, email);
      this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
      return this.officeNumber;
  }
  
    getRole() {
      return 'Manager';
    }
  }
  
module.exports = Manager;

//, typeof managerInstance.getOfficeNumber will output "function" because getOfficeNumber is a method defined in the Manager class, and methods in JavaScript are functions.

//So, when you call getOfficeNumber() on an instance of the Manager class, it will execute the function and return the value of the officeNumber property for that instance.