document.addEventListener('DOMContentLoaded', () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
        window.location.href = 'login.html';
        return;
    }

    const user = JSON.parse(userStr);
    const userInfo = document.getElementById('userInfo');
    const studentSection = document.getElementById('studentSection');
    const adminSection = document.getElementById('adminSection');
    const complaintForm = document.getElementById('complaintForm');
    const complaintBody = document.getElementById('complaintBody');

    userInfo.textContent = `Logged in as: ${user.username} (${user.role})`;

    // Show sections based on role
    if (user.role === 'Admin') {
        adminSection.classList.remove('hidden');
        fetchComplaints();
    } else {
        studentSection.classList.remove('hidden');
    }

    // Function to fetch and display complaints (Admin only)
    async function fetchComplaints() {
        try {
            const response = await fetch('/api/complaint');
            const complaints = await response.json();
            
            complaintBody.innerHTML = '';
            complaints.forEach(complaint => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${complaint.id}</td>
                    <td>${complaint.studentName}</td>
                    <td>${complaint.studentId}</td>
                    <td>${complaint.subject}</td>
                    <td>${new Date(complaint.createdAt).toLocaleString()}</td>
                    <td><span class="status-badge">${complaint.status}</span></td>
                    <td>
                        <button class="btn-delete" onclick="deleteComplaint(${complaint.id})">Delete</button>
                    </td>
                `;
                complaintBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    }

    // Function to handle form submission (Student only)
    if (complaintForm) {
        complaintForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const complaint = {
                studentName: document.getElementById('studentName').value,
                studentId: document.getElementById('studentId').value,
                subject: document.getElementById('subject').value,
                description: document.getElementById('description').value
            };

            try {
                const response = await fetch('/api/complaint', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(complaint)
                });

                if (response.ok) {
                    studentSection.classList.add('hidden');
                    document.getElementById('thanksSection').classList.remove('hidden');
                } else {
                    alert('Failed to submit complaint');
                }
            } catch (error) {
                console.error('Error submitting complaint:', error);
            }
        });
    }

    // Global function to delete a complaint
    window.deleteComplaint = async (id) => {
        if (!confirm('Are you sure you want to delete this complaint?')) return;

        try {
            const response = await fetch(`/api/complaint/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                fetchComplaints();
            } else {
                alert('Failed to delete complaint');
            }
        } catch (error) {
            console.error('Error deleting complaint:', error);
        }
    };

    window.logout = () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    };
});
