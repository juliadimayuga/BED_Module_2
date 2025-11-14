# Project Overview
The API is used to manage the employees and branches of the organization. The endpoints allow you to view, create, update, and delete employees or branches. These are useful because you can easily make any changes to the database by inputting the required data since the logic is separated into different routes. There are also ways to filter employees to see all of the employees from a certain branch or department. This is helpful when you need to find specific information or group of people.

## Installation Instructions
Once you have a copy of the repository, you can install any dependencies required and start the API to host it on the server. Then you can open Postman or a brower with the URL http://localhost:3000/api/v1 to begin using the endpoints.

## API Request Examples
1. Get All Employees
GET http://localhost:3000/api/v1/employees
Response:
{ "status": "success", "data": [{ "id": 1, "name": "Alice Johnson", "position": "Branch Manager", "department": "Management", "email": "alice.johnson@pixell-river.com", "phone": "604-555-0148", "branchId": 1 }, { "id": 2, "name": "Amandeep Singh", "position": "Customer Service Representative", "department": "Customer Service", "email": "amandeep.singh@pixell-river.com", "phone": "780-555-0172", "branchId": 2 }, { "id": 3, "name": "Maria Garcia", "position": "Loan Officer", "department": "Loans", "email": "maria.garcia@pixell-river.com", "phone": "204-555-0193", "branchId": 3 }], "message": "Retrieved all employees successfully." }

2. Get Employees From Department Loans
GET http://localhost:3000/api/v1/employees/department/Loans
Response:
{ "status": "success", "data": [{ "id": 3, "name": "Maria Garcia", "position": "Loan Officer", "department": "Loans", "email": "maria.garcia@pixell-river.com", "phone": "204-555-0193", "branchId": 3 }], "message": "Employees retrieved successfully." }

3. Update Branch Information
PUT http://localhost:3000/api/v1/branches/1760398631564
Inputted Data: 
{
    "name": "Winnipeg Branch",
    "address": "321 Updated Ave, Winnipeg, MB, ABC 123",
    "phone": "123-456-7890"
}
Response:
{ "status": "success", "data": { "id": 1760398631564, "name": "Winnipeg Branch", "address": "321 Updated Ave, Winnipeg, MB, ABC 123", "phone": "123-456-7890" }, "message": "Branch updated successfully." }

## Link to Public Documentation
You can use this link to find the public API documentation: https://juliadimayuga.github.io/BED_Module_2/

## Local Documentation Access
Use the "npm run start" command to start the server, and enter http://localhost:3000/api-docs into Postman or a browser to see the endpoint documentation.