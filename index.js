const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const render = require('./src/page-template.js');

//this is for html output. Need to create output directory
//detects environment and inserts proper slash
const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const team = []; // Store the team members

//empty/not empty
const validateNotEmpty = (input) => {
  return input.trim() !== '' ? true : 'This field cannot be empty.';
};

//checks numeric input
const validateNumeric = (input) => {
  return !isNaN(input) ? true : 'Please enter a valid number.';
};
//checks has charachters relevant to email
const validateEmail = (input) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(input) ? true : 'Please enter a valid email address.';
};

// Create a function to write the HTML content to the file system
//used the xpert helper here 
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Team profile generated successfully!');
  });
}

//inquirer questions - code from class and last challenge
const promptManager = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name:",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the manager's employee ID:",
        //https://stackoverflow.com/questions/57321266/how-to-test-inquirer-validation
        validate: validateNumeric,
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the manager's email address:",
        validate: validateEmail,
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Enter the manager's office number:",
        validate: validateNumeric,
      },
    ])
    //below is to handle the answers. Code found at https://www.educative.io/answers/how-to-use-the-inquirer-node-package and edited
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      //push to array
      team.push(manager);
      //prompt for next team member
      promptTeamMembers();
    });
};

//gives choices for next bootstrap card/team member
const promptTeamMembers = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'memberType',
        message: 'Select the type of team member to add:',
        choices: ['Engineer', 'Intern', 'Finish building the team'],
      },
    ])
    .then((answer) => {
      if (answer.memberType === 'Engineer') {
        promptEngineer();
      } else if (answer.memberType === 'Intern') {
        //calls function to gather internn info if intern is chosen
        promptIntern();
      } else {
        const htmlContent = render(team);
        writeToFile(outputPath, htmlContent);
        console.log('Team HTML generated successfully!');
      }
    });
};

const promptEngineer = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the engineer's name:",
        validate: validateNotEmpty,
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the engineer's employee ID:",
        validate: validateNumeric,
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the engineer's email address:",
        validate: validateEmail,
      },
      {
        type: 'input',
        name: 'github',
        message: "Enter the engineer's GitHub username:",
        validate: validateNotEmpty,
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      promptTeamMembers();
    });
};


const promptIntern = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the intern's name:",
        validate: validateNotEmpty,
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter the intern's employee ID:",
        validate: validateNumeric,
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter the intern's email address:",
        validate: validateEmail,
      },
      {
        type: 'input',
        name: 'school',
        message: "Enter the intern's school:",
        validate: validateNotEmpty,
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
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