const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Employee = require('./lib/Employee.js');
const Intern = require("./lib/Intern.js");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const render = require("./src/page-template.js");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const team = []; // Store the team members

// When a user starts the application, they're prompted to enter the team manager's:
// Name
// Employee ID
// Email address
// Office numberFunction to prompt for manager information

////consider adding validation to ensure that user input is in the proper format
//code examples from expert learning assistant
//ternary operators in arrow function 

const validateNotEmpty = (input) => {
    return input.trim() !== "" ? true : "This field cannot be empty.";
  };
  
  const validateNumeric = (input) => {
    return !isNaN(input) ? true : "Please enter a valid number.";
  };
  
  const validateEmail = (input) => {
    // A simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) ? true : "Please enter a valid email address.";
  };


const promptManager = () => {
  // Inquirer prompts for manager details
//code from last activity
  inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Enter the manager's name:",
    },
    {
      type: "input",
      name: "id",
      message: "Enter the manager's employee ID:",
    },
    {
      type: "input",
      name: "email",
      message: "Enter the manager's email address:",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "Enter the manager's office number:",
    },
  ])
  .then((answers) => {
    // Create a new Manager object and add it to the team
    //'new' syntax from lesson
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    team.push(manager);

    // Call the function to get additional team members????
    promptTeamMembers();
  });
};

// When a user enters those requirements, the user is presented with a menu with the option to:
// Add an engineer
// Add an intern
// Finish building the team
// When a user selects the engineer option, the user is prompted to enter the following and then taken back to the menu:
// Engineer's Name
// ID
// Email
// GitHub username
// When a user selects the intern option, the user is prompted to enter the following and then taken back to the menu:
// Intern’s name
// ID
// Email
// School
// When a user decides to finish building their team, they exit the application and the HTML is generated.
// Call the render function (provided for you) and pass in an array containing all employee objects.
// The render function will generate and return a block of HTML including templated div elements for each employee.
// Create an HTML file using the HTML returned from the render function.
// Write it to a file named team.html in the output folder.
// You can use the provided variable outputPath to target this location.


//need to call validation functions
//this code from the learning exprt for email validation 
//// Event listener for form submission
// document.getElementById("myForm").addEventListener("submit", function(event) {
//     event.preventDefault(); // Prevent form submission
    
//     const userEmail = emailInput.value;
    
//     if (validateEmail(userEmail)) {
//       // Email is valid, proceed with form submission or other actions
//       console.log("Email is valid");
//       // ... additional code here
//     } else {
//       // Email is invalid, show an error message or take appropriate action
//       console.log("Email is invalid");
//       // ... additional code here
//     }
//   });