const repository = require("./models/employeeRepository");

const user = {
  name: 'Mydeen',
  companyName: 'Zoho',
  role: 'Graduate Engineer Trainee',
  salary: 15000,
  phoneNumber: 9876543234,
  email: 'mydeenabdul@gmail.com'
}


repository.addEmployee(user)
