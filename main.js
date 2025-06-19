
let students = [];
let currentId = 1;
let editingId = null;

// Open form modal
function openForm(isEdit = false) {
  document.getElementById('studentFormModal').style.display = 'flex';

  if (!isEdit) {
    editingId = null;
    document.getElementById('studentForm').reset();
  }
}

// Close form
function closeForm() {
  document.getElementById('studentFormModal').style.display = 'none';
  document.getElementById('studentForm').reset();
  editingId = null;
}

// Handle form submit
document.getElementById('studentForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const surname = document.getElementById('surname').value;
  const courseCode = document.getElementById('courseCode').value;
  const email = document.getElementById('email').value;

  if (editingId) {
    const student = students.find(s => s.id === editingId);
    if (student) {
      student.firstName = firstName;
      student.surname = surname;
      student.courseCode = courseCode;
      student.email = email;
    }
  } else {
    const student = {
      id: currentId++,
      firstName,
      surname,
      courseCode,
      email
    };
    students.push(student);
  }

  renderStudents();
  closeForm();
});

// Render students
function renderStudents() {
  const tbody = document.getElementById('student-list');
  tbody.innerHTML = '';
  students.forEach(student => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.firstName}</td>
      <td>${student.surname}</td>
      <td>${student.courseCode}</td>
      <td>${student.email}</td>
      <td>
        <div class="actions">
          <button class="edit" onclick="editStudent(${student.id})"><i class="fas fa-edit"></i></button>
          <button class="delete" onclick="deleteStudent(${student.id})"><i class="fas fa-trash-alt"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Edit logic
function editStudent(id) {
  const student = students.find(s => s.id === id);
  if (student) {
    editingId = id;
    openForm(true);
    document.getElementById('firstName').value = student.firstName;
    document.getElementById('surname').value = student.surname;
    document.getElementById('courseCode').value = student.courseCode;
    document.getElementById('email').value = student.email;
  }
}

// Delete logic
function deleteStudent(id) {
  if (confirm('Are you sure you want to delete this student?')) {
    students = students.filter(student => student.id !== id);
    renderStudents();
  }
}

// Add student button listener
document.querySelector('.toolbar button').addEventListener('click', () => openForm());

