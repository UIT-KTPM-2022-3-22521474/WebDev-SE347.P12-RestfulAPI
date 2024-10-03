document.addEventListener('DOMContentLoaded', () => {
    const addDeviceForm = document.getElementById('add-device-form');
    addDeviceForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const deviceDataInput = document.getElementById('device-data').value.trim();

        if (!deviceDataInput) {
            alert('Please fill in the device data.');
            return;
        }

        let deviceData;
        try {
            deviceData = JSON.parse(deviceDataInput);
        } catch (error) {
            alert('Invalid JSON format. Please check your input.');
            return;
        }

        const newDevice = {
            name: deviceData.name,
            data: deviceData.data
        };

        fetch('https://api.restful-api.dev/objects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newDevice)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(device => {
            if (device.id && device.name && device.data && device.createdAt) {
                const deviceInfo = `
                    Device added successfully:
                    ID: ${device.id}
                    Name: ${device.name}
                    Year: ${device.data.year}
                    Price: ${device.data.price}
                    CPU Model: ${device.data["CPU model"]}
                    Hard Disk Size: ${device.data["Hard disk size"]}
                    Created At: ${device.createdAt}
                `;
                alert(deviceInfo);
                window.location.href = 'index.html';
            } else {
                throw new Error('Invalid response format');
            }
        })
        .catch(error => {
            console.error('Error adding new device:', error);
            alert('There was an error adding the device. Please try again.');
        });
    });
});