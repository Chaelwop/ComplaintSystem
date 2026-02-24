document.addEventListener('DOMContentLoaded', () => {
    const complaintForm = document.getElementById('complaintForm');
    const complaintBody = document.getElementById('complaintBody');

    // Function to fetch and display complaints
    const fetchComplaints = async () => {
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
    };

    // Function to handle form submission
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
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(complaint)
            });

            if (response.ok) {
                complaintForm.reset();
                fetchComplaints();
            } else {
                alert('Failed to submit complaint');
            }
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    });

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

    // Initial fetch
    fetchComplaints();
});
