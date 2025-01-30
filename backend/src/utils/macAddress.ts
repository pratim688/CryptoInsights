import macaddress from 'macaddress';

/**
 * Function to get the MAC address of the device
 * @returns {Promise<string>} - A promise that resolves to the MAC address
 */
const getMacAddress = async () => {
    try {
        // Get the MAC address
        const mac = await macaddress.one();
        return mac;
    } catch (error) {
        console.error('Error retrieving MAC address:', error);
        throw new Error('Unable to retrieve MAC address');
    }
};

// Example usage
getMacAddress().then(mac => {
    // console.log('MAC Address:', mac);
}).catch(error => {
    console.error(error);
});

export default getMacAddress;