function updateDashboard() {
    const requests = JSON.parse(localStorage.getItem('assetRequests')) || [];
    document.getElementById('totalRequests').textContent = requests.length;
    document.getElementById('pendingRequests').textContent = requests.filter(req => req.status === 'Pending').length;
    document.getElementById('approvedRequests').textContent = requests.filter(req => req.status === 'Approved').length;
    document.getElementById('rejectedRequests').textContent = requests.filter(req => req.status === 'Rejected').length;
  
    const tableBody = document.getElementById('requestsTableBody');
    tableBody.innerHTML = '';
    requests.forEach(request => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${request.employeeName}</td>
        <td>${request.employeeID}</td>
        <td>${request.assetType}</td>
        <td>${request.requestDate}</td>
        <td class="status-${request.status.toLowerCase()}">${request.status}</td>
        <td>
          ${request.status === 'Pending' ? `
            <button class="action-btn approve-btn" onclick="updateStatus(${request.id}, 'Approved')">Approve</button>
            <button class="action-btn reject-btn" onclick="updateStatus(${request.id}, 'Rejected')">Reject</button>` : ''}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  function updateStatus(requestId, status) {
    let requests = JSON.parse(localStorage.getItem('assetRequests')) || [];
    const index = requests.findIndex(req => req.id === requestId);
    if (index !== -1) {
      requests[index].status = status;
      localStorage.setItem('assetRequests', JSON.stringify(requests));
      updateDashboard();
    }
  }
  updateDashboard();
  setInterval(updateDashboard, 5000);
  