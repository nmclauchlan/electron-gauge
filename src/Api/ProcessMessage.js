export default ProcessMessage 

function ProcessMessage(message) {
    var splitMessage = message.split(',');
    return { knots: splitMessage[0],
            altitude: splitMessage[1] };

}