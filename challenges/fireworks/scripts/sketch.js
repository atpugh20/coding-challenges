const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function setup() {}

function render() {}

function update(currentTime) {
    // Update Logic
    console.log(currentTime);

    // Draw
    render();

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
