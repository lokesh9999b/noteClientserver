document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('navigate').addEventListener('click', function() {
      window.location.href = 'form.html';
    });
  
    fetch('http://localhost:3000/getNotes')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('notesTableBody');
        data.forEach(note => {
          const row = document.createElement('tr');
          row.innerHTML = `
          <tr>
            <td>${note.note_id}</td>
            <td>${note.subject}</td>
            
            <td>${note.criticality}</td>
            <td>${note.vertical}</td>
            <td>${note.sub_vertical}</td>
            <td>${note.reviewer_name}</td>
            <td>${note.entry_date.slice(0,10)}</td>
            <td>${note.status}</td>`;
          console.log(row);
          tableBody.appendChild(row);   
        });
      })
      .catch(error => console.error('Error fetching notes:', error));
  });
  // <td>${note.description}</td>