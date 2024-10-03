document.addEventListener('DOMContentLoaded', () => {
    const deviceList = document.getElementById('device-list');

    fetch('https://api.restful-api.dev/objects')
        .then(response => response.json())
        .then(data => {
            let devicesHTML = '';
            data.forEach(device => {
                devicesHTML += `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${device.name}</h5>
                                <button class="btn btn-primary view-details-btn" data-id="${device.id}" data-bs-toggle="modal" data-bs-target="#deviceModal">View Details</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            deviceList.innerHTML = devicesHTML;

            document.querySelectorAll('.view-details-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const deviceId = event.target.getAttribute('data-id');
                    fetch(`https://api.restful-api.dev/objects/${deviceId}`)
                        .then(response => response.json())
                        .then(device => {
                            const deviceName = document.getElementById('modal-device-name');
                            const deviceDetails = document.getElementById('modal-device-details');

                            deviceName.textContent = device.name;
                            let deviceDataHTML = '';
                            if (device.data) {
                                for (const [key, value] of Object.entries(device.data)) {
                                    deviceDataHTML += `<p><strong>${key}:</strong> ${value}</p>`;
                                }
                            } else {
                                deviceDataHTML = '<p>No data available</p>';
                            }
                            deviceDetails.innerHTML = deviceDataHTML;
                        })
                        .catch(error => console.error('Error fetching device details:', error));
                });
            });
        })
        .catch(error => console.error('Error fetching devices:', error));
});