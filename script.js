const employeeTable = document.getElementById('employee-table');
const addNewBtn = document.getElementById('add-new-btn');
let employees = [];

async function fetchEmployees() {
  const response = await fetch('employees.json');
  employees = await response.json();
  renderTable();
}

function renderTable() {
  employeeTable.innerHTML = '';
  employees.forEach(employee => {
    employeeTable.innerHTML += `
      <tr>
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.phone}</td>
        <td class="actions">
          <i class="edit" onclick="editEmployee(${employee.id})">✏️</i>
          <i class="delete" onclick="deleteEmployee(${employee.id})">🗑️</i>
        </td>
      </tr>
    `;
  });
}

addNewBtn.addEventListener('click', () => {
  const name = prompt('Enter Name:');
  const email = prompt('Enter Email:');
  const phone = prompt('Enter Phone:');
  if (name && email && phone) {
    const newEmployee = {
      id: employees.length + 1,
      name,
      email,
      phone,
    };
    employees.push(newEmployee);
    renderTable();
  }
});

function editEmployee(id) {
  const employee = employees.find(emp => emp.id === id);
  if (employee) {
    const name = prompt('Enter New Name:', employee.name);
    const email = prompt('Enter New Email:', employee.email);
    const phone = prompt('Enter New Phone:', employee.phone);
    if (name && email && phone) {
      employee.name = name;
      employee.email = email;
      employee.phone = phone;
      renderTable();
    }
  }
}

function deleteEmployee(id) {
  if (confirm('Are you sure you want to delete this employee?')) {
    employees = employees.filter(emp => emp.id !== id);
    renderTable();
  }
}

fetchEmployees();
