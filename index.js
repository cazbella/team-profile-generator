const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.


const team = []; // Store the team members

// When a user starts the application, they're prompted to enter the team manager's:
// Name
// Employee ID
// Email address
// Office numberFunction to prompt for manager information
const promptManager = () => {
  // Inquirer prompts for manager details

