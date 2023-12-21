const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Employee = require('./lib/Employee');
const Intern = require("./lib/Intern");
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
    // A simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) ? true : "Please enter a valid email address.";
  };
  //NEED TO IMPLEMENT THESE


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

  //https://www.educative.io/answers/how-to-use-the-inquirer-node-package
  //Inquirer.js, the .answers syntax is often used in the callbacks provided to handle user responses after using inquirer.prompt().
  .then((answers) => {
    // Create a new Manager object and add it to the team
    //'new' syntax from lesson
    //example of OOP
    //creates a new object
    const manager = new Manager(
      answers.name,
      answers.id,
      answers.email,
      answers.officeNumber
    );
    //push to created array
    team.push(manager);

    // Call the function to get additional team members????
      
          promptTeamMembers();
        });
    };
    
    // Function to prompt for additional team members
    const promptTeamMembers = () => {
      // Inquirer prompts for selecting team members or finishing
      inquirer
        .prompt([
          {
            type: "list",
            name: "memberType",
            message: "Select the type of team member to add:",
            choices: ["Engineer", "Intern", "Finish building the team"],
          },
        ])
        .then((answer) => {
          // Handle the user's choice
          if (answer.memberType === "Engineer") {
            // Call function to prompt for engineer information
            promptEngineer();
          } else if (answer.memberType === "Intern") {
            // Call function to prompt for intern information
            promptIntern();
          } else {
            // Need to finish building the team and generate HTML don't know HOW??????
            //code from xpert learning assistant 
            //Import the writeFile function from the fs module at the top of the file:


            const { writeFile } = require('fs');
            
            
            //After gathering all the user input and creating the team member objects, call the render function passing in the array of team member objects. This will generate the HTML content for the team profile:
            
            
            const htmlContent = render(team);
            
            
            //Create a function to write the HTML content to the file system. You can use the writeFile function from the fs module for this:
            
            
            function writeToFile(fileName, data) {
              writeFile(fileName, data, (err) => {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log('Team profile generated successfully!');
              });
            }
            
            
            //Call the writeToFile function, passing in the file path and the generated HTML content:
            
            
            writeToFile('/Users/carolinelane/Desktop/class/challenges/12-team-profile-generator/team-profile-generator/src/page-template.js', htmlContent);
            
            //Make sure to replace the file path with the actual path to the HTML file you want to write.
            
            
            //With these modifications, the user's answers will be written to the HTML file specified in the writeToFile function.
            
            console.log("Team HTML generated successfully!");
          }
        });
    };
    
    // Function to prompt for engineer information
    const promptEngineer = () => {
      // Inquirer prompts for engineer details
      inquirer
        .prompt([
          // like manager, prompt for engineer details
        ])
        .then((answers) => {
          // Create a new Engineer object and add it to the team
          const engineer = new Engineer(/* pass answers here */);
          team.push(engineer);
    
          // Call function to prompt for additional team members
          promptTeamMembers();
        });
    };
    
    // Function to prompt for intern information
    const promptIntern = () => {
      // Inquirer prompts for intern details
      inquirer
        .prompt([
          // Similar to manager, prompt for intern details
        ])
        .then((answers) => {
          // Create a new Intern object and add it to the team
          const intern = new Intern(/* pass answers here */);
          team.push(intern);
    
          // Call the function to prompt for additional team members
          promptTeamMembers();
        });
    };
    
    // Start the application by prompting for manager information
    promptManager();

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