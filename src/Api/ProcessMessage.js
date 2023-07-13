export default ProcessMessage 

function ProcessMessage(message) {
    var splitMessage = message.split(',');
    if (splitMessage.length != 2) {
        console.error('Invalid data update: ', message);

        return {
            speed: null,
            altitude: null
        };
    }
    
    return { 
            speed: splitMessage[0],
            altitude: splitMessage[1] 
        };
}