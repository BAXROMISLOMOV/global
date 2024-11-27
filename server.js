const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let employees = [
  { id: 1, name: 'John Doe', email: 'johndoe@mail.com', phone: '(171) 555-2222' },
  { id: 2, name: 'Peter Parker', email: 'peterparker@mail.com', phone: '(313) 555-5735' },
  { id: 3, name: 'Fran Wilson', email: 'franwilson@mail.com', phone: '(503) 555-9931' }
];

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.post('/employees', (req, res) => {
  const newEmployee = { id: employees.length + 1, ...req.body };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const index = employees.findIndex(emp => emp.id === parseInt(id));
  if (index !== -1) {
    employees[index] = { id: parseInt(id), ...req.body };
    res.json(employees[index]);
  } else {
    res.status(404).json({ message: 'Employee not found' });
  }
});

app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  employees = employees.filter(emp => emp.id !== parseInt(id));
  res.json({ message: 'Employee deleted' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
