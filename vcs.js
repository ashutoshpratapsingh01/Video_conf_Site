const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let localStream;
let peerConnection;

startButton.addEventListener('click', startCall);
stopButton.addEventListener('click', stopCall);

async function startCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // Create a peer connection
        peerConnection = new RTCPeerConnection();

        // Add the local stream to the peer connection
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        // Set up the remote video
        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };

        // Your signaling code here to establish a connection with the other participant

    } catch (error) {
        console.error('Error starting the call:', error);
    }
}

function stopCall() {
    // Close the peer connection and release the local stream
    if (peerConnection) {
        peerConnection.close();
    }
    localStream.getTracks().forEach(track => track.stop());

    // Remove video sources
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
}
