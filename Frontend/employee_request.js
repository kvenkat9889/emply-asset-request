function showError(inputElement, errorMessage) {
    const errorDiv = document.getElementById(inputElement.id + 'Error');
    errorDiv.textContent = errorMessage;
    errorDiv.style.display = 'block';
    inputElement.classList.add('error');
  }
  function hideError(inputElement) {
    const errorDiv = document.getElementById(inputElement.id + 'Error');
    errorDiv.style.display = 'none';
    inputElement.classList.remove('error');
  }
  function showNotification(message, type) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification ' + type;
    notification.style.display = 'block';
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('requestDate').min = today;
  
  document.getElementById('assetRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const employeeName = document.getElementById('employeeName');
    const employeeID = document.getElementById('employeeID');
    const assetType = document.getElementById('assetType');
    const requestDate = document.getElementById('requestDate');
  
    let isValid = true;
    [employeeName, employeeID, assetType, requestDate].forEach(hideError);
  
    if (!employeeName.value.match(/^[A-Za-z\s]{5,}$/)) {
      showError(employeeName, 'Name must be at least 5 characters long and contain only letters');
      isValid = false;
    }
    if (!employeeID.value.match(/^[A-Za-z0-9]{1,6}$/)) {
      showError(employeeID, 'ID must be alphanumeric and maximum 7 characters');
      isValid = false;
    }
    if (!assetType.value) {
      showError(assetType, 'Please select an asset type');
      isValid = false;
    }
    const selectedDate = new Date(requestDate.value);
    if (!requestDate.value || selectedDate < new Date(today)) {
      showError(requestDate, 'Please select a valid date (today or future)');
      isValid = false;
    }
  
    if (isValid) {
      const request = {
        id: Date.now(),
        employeeName: employeeName.value,
        employeeID: employeeID.value,
        assetType: assetType.value,
        requestDate: requestDate.value,
        status: 'Pending'
      };
      let requests = JSON.parse(localStorage.getItem('assetRequests')) || [];
      requests.push(request);
      localStorage.setItem('assetRequests', JSON.stringify(requests));
      showNotification('Request submitted successfully!', 'success');
    } else {
      showNotification('Please fix the errors in the form', 'error');
    }
  });
  