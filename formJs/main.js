document.addEventListener('DOMContentLoaded', function () {
    loadCriticality();
    loadVerticals();

    const verticalDropdown = document.getElementById('vertical');
    const subVerticalDropdown = document.getElementById('subVertical');

    if (verticalDropdown) {
        verticalDropdown.addEventListener('change', function () {
            loadSubVerticals(this.value);
        });
    }

    if (subVerticalDropdown) {
        subVerticalDropdown.addEventListener('change', function () {
            loadReviewers(document.getElementById('vertical').value, this.value);
        });
    }
});

function loadCriticality() {
    fetch('http://localhost:8000/api/getCriticality')
        .then(response => response.json())
        .then(data => {
            const criticalitySelect = document.getElementById('critical');
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.criticality;
                option.textContent = item.criticality;
                criticalitySelect.appendChild(option);
            });
        });
}

function loadVerticals() {
    fetch('http://localhost:8000/api/getVertical')
        .then(response => response.json())
        .then(data => {
            const verticalSelect = document.getElementById('vertical');
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.vertical_id;
                option.textContent = item.vertical;
                verticalSelect.appendChild(option);
            });
        });
}

function loadSubVerticals(verticalId) {
  
    const subVerticalSelect = document.getElementById('subVertical');
    subVerticalSelect.innerHTML = '<option>Select Sub Vertical</option>';

    fetch(`http://localhost:8000/api/getSubVerticals?verticalId=${verticalId}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.sub_vertical;
                option.textContent = item.sub_vertical;
                subVerticalSelect.appendChild(option);
            });
          
        })
        .catch(error => {
            console.error('Error fetching sub verticals:', error);
        });
}

function loadReviewers(verticalId, subVertical) {
    console.log(verticalId);
    console.log(subVertical);
    const reviewerSelect = document.getElementById('reviewer');
    reviewerSelect.innerHTML = '<option>Select Reviewer</option>';
    reviewerSelect.disabled = true;
    const encodedSubVertical = encodeURIComponent(subVertical);
    console.log(encodedSubVertical);
    fetch(`http://localhost:8000/api/getReviewers?verticalId=${verticalId}&subVertical=${encodedSubVertical}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.emp_name;
                option.textContent = item.emp_name;
                reviewerSelect.appendChild(option);
            });
            reviewerSelect.disabled = false;
        })
        .catch(error => {
            console.error('Error fetching reviewers:', error);
        });
}


function submitForm() {
    const criticality = document.getElementById('critical').value;
    const subject = document.getElementById('subject').value;
    const description = quill.root.innerHTML;
    const verticalId = document.getElementById('vertical').value;
    const subVertical = document.getElementById('subVertical').value;
    const reviewer = document.getElementById('reviewer').value;

    const formData = {
        criticality: criticality,
        subject: subject,
        description: description,
        verticalId: verticalId,
        subVertical: subVertical,
        reviewer: reviewer
    };

    fetch('http://localhost:8000/api/submitNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally close the modal or display a success message
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

