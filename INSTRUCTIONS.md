## Jurassic World Visitor Dashboard
Nutshell is a new product offering that you have been tasked with building. You will be utilizing all of the skills and concepts that you've learned up to this point in the course.
- Functions
- Databases/API
- Github
- Objects
- CSS/SASS
- Handling user events
- Data entry/editing
- Modular code with Webpack
- Relational data
- CRUD

## Mentor
Abbey

## Project Requirements
- Clean code - single responsibility principle
- ES6 Modules bundled with webpack
- No errors - linters should be clean
- Jquery for any DOM manipulation (selectors, modifying css classes, events)
- SASS and Bootstrap for styling
- Completely planned out - before each section you should be making new cards before you code. You should have wireframes and an ERD

## Planning and Setup
For planning and setup, your team will need to divide and conquer. All of these items will need to be completed and reviewed by noon on Saturday.
- Create an ERD and add to Readme
- Create Wireframes on Figma and add to Readme

## Setup:
Create a setup branch and setup webpack (make a ticket for this first)
- Issue Ticket Template
- Pull request Template
- Set up readme

## Create 2 branches: Main and Development
- Protect the Main branch from merging (DO NOT MERGE TO MAIN UNTIL APPROVAL FROM YOUR MENTOR IS OBTAINED)
- All development should be done on the Development branch
- When a milestone is completed, make a PR against the Main branch for your mentor to review.
- DO NOT move on to another milestone until everyone on your team is completed with the milestone AND you get approval from your mentor.
- Create a new firebase project and enable google authentication
- Share API keys with team (DO NOT PUSH TO GITHUB)
- One person run deploys

## Expectations
- Break each section below into milestones
- Deploy each milestone
- Deployed URL on Readme

Create a PR against the Main branch with:
- The tickets completed that sprint
- Explanation of what was completed in the sprint

# Week 1
## Description
You are tasked with creating a dashboard to maintain the greatest biological experiment that doubles as the greatest theme park, Jurassic World! You will need to keep track of the dinosaurs, the staff, the rides, the vendors, and the equipment needed to run a successful biological experiment... I mean, theme park. To provide a more immersive and suspenseful experience, the creators of the park have introduced the Chaos Monkey that you are tasked with keeping track of. The Chaos Monkey gets loose at the same time every day and usually wreaks havoc around the park.

## Requirements
- Authentication for (CUD), Read-only without authentication
- Dinosaurs module
- Staff module
- Rides module
- Vendors module
- Equipment module
- Show a toast on the page when the Chaos Monkey strikes
## User Stories

### Authentication
- As a user, I should be able to log in to add, edit, or delete from any of the modules.
- As a user, if I'm not authenticated, I can only read the information.
- As a user, I should be able to login using Google
- As a user, I should be able to logout

### Dinosaurs
- As a user, I should be able to add new dinosaurs
- As a user, I should be able to delete dinosaurs
- As a user, I should be able to edit the dinosaurs
- As a user, I should be able to view all the dinosaurs

### Staff
- As a user, I should be able to add new staff
- As a user, I should be able to delete staff
- As a user, I should be able to edit the staff
- As a user, I should be able to view all the staff

### Rides
- As a user, I should be able to add new rides
- As a user, I should be able to delete rides
- As a user, I should be able to edit the rides
- As a user, I should be able to view all the rides

### Vendors
- As a user, I should be able to add new vendors
- As a user, I should be able to delete vendors
- As a user, I should be able to edit the vendors
- As a user, I should be able to view all the vendors

### Equipment
- As a user, I should be able to add new equipment
- As a user, I should be able to delete equipment
- As a user, I should be able to edit the equipment
- As a user, I should be able to view all the equipment

### Chaos Monkey
- As a user, I should be shown a toast whenever the Chaos Monkey strikes
- As a user, I should allow the Chaos Monkey to do one random act for a set interval
- As a user, the Chaos Monkey should have a chance to break down a random ride
- As a user, the Chaos Monkey should have a chance to kidnap a random staff member
- As a user, the Chaos Monkey should have a chance to break a random piece of equipment

## Week 2
### Description
After the first group of developers mysteriously disappeared in a freak accident (conveniently right before the checks cleared), you'll need to pick up where they left off.  The higher-ups really like the dashboard the last team built, but also want to keep track of the staff, and want to know the schedule of each staff.  They should be able to assign a staff member to a dinosaur, or a vendor, as well as the ability to assign equipment to a staff member.  The Chaos Monkey doesn't really appreciate all the micro-management, and has developed more heinous ways to cause trouble.  The higher-ups are starting to understand the impact that introducing a Chaos Monkey has on the park, and has tasked you with creating a system that will alert the park manager when and where the Chaos Monkey strikes.  
### Requirements
- Chaos Monkey Requirements: 
  - When Chaos Monkey kidnaps staff member, remove them from the roster and any assigned roles/equipment/dinos
  - When Chaos Monkey breaks a ride, the ride should no longer be operational
  - Chaos Monkey can break a random piece of equipment
* Scheduling Requirement:
  * List view of unassigned staff members
  * List view of unstaffed rides, vendors, dinosaurs
  * Each dinosaur needs 2 staff members to prevent from getting loose
  * Each ride needs to be staffed to be operational
  * Each vendor needs to be staffed to be operational
  * Calendar view
* Alerts Requirement
  - Breakout alarm - if a dinosaur doesn't have enough keepers, alert the user
  - Keep a log of all the Chaos Monkey incidents
  - Test Equipment, I should have a button that tests all of my equipment and alerts the user of each equipment that's broken.
### User Stories
#### Chaos Monkey
- As a user, when the Chaos Monkey kidnaps an employee, they should be automatically unassigned from their station and removed from the staff list.  They're not coming back.
- As a user, when the Chaos Monkey breaks a ride, the ride should no longer be operational
- As a user, when the Chaos Monkey breaks a piece of equipment, any assigned staff can no longer use it and are unassigned.
#### Scheduling 
- As a user, I should be able to assign a staff member to either a dinosaur, a ride, or a vendor
- As a user, I should be able to assign a piece of equipment to a staff member
- As a user, I should be able to see all unassigned staff members to keep slacking to a minimum
- As a user, I should be able to see all unattended rides, vendors, dinosaurs, and equipment
- As a user, I should be able to view the schedule in a calendar view
#### Alerts
- As a user, I should be alerted whenever there is a dinosaur that has less than 2 handlers
- As a user, I should be alerted when the Chaos Monkey strikes, including info on what it did, and to whom.
- As a user, I should be able to test all the equipment.  When I click the button, I should be alerted to each broken piece of equipment