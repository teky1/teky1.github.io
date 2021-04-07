const colors_input = document.getElementById("colors_input");
const type_input = document.getElementById("type_input");
const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");


colors_input.addEventListener("input", render);
type_input.addEventListener("input", render);


function render(){
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  color_layer = document.getElementById(colors_input.value);
  ctx.drawImage(color_layer, 0, 0, canvas.width, canvas.height);
  type_layer = document.getElementById(type_input.value);
  ctx.drawImage(type_layer, 0, 0, canvas.width, canvas.height);
}

render();
