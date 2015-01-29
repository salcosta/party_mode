var canvas = document.createElement("canvas");
canvas.style.position ="absolute";
canvas.style.top = 0;
canvas.style.left=0;
canvas.style.width="100%";
canvas.style.height="100%";
canvas.style.opacity="0.5";
document.body.appendChild(canvas);
var context = canvas.getContext("2d");
var lights = [];

var iframe = document.createElement("iframe");
iframe.src="https://www.youtube.com/embed/6Zbi0XmGtMw?rel=0&autoplay=1";
iframe.style.display = "none";
document.body.appendChild(iframe);


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();


function createLights(lights){
    while(lights.length < 8){
        lights.push({x: (Math.random() * canvas.width) , 
                     y: (Math.random() * canvas.height),
                     r: (Math.floor(Math.random() *40) + 10),
                     speed_x : (Math.floor(Math.random() *2) *2-1) * 10, 
                     speed_y : (Math.floor(Math.random() *2) *2-1) * 10,
                     speed_r : (Math.floor(Math.random() *2) *2-1),
                     c: getRandomColor()});
    }
}

function animateLights(context, canvas, lights){
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateElements(lights, canvas);
    drawElements(lights, context);
    requestAnimFrame(function() {
          animateLights(context,canvas, lights);
        });    
}


function drawCircle(x,y,r,c,ctx){
    ctx.beginPath();
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.fillStyle = c;
    ctx.fill();
}

function drawElements(lights, context){
   lights.forEach(function(light){
      drawCircle(light.x,light.y,light.r,light.c, context); 
   });
}

function updateElements(lights, canvas){
    lights.forEach(function(light){
        console.log("%s,%s", light.x,light.y);
       if(light.x < 20 || light.x > canvas.width-20) light.speed_x *= -1;
       if(light.y < 20 || light.y > canvas.height-20) light.speed_y *= -1;
       if(light.r < 11 || light.r > 50) light.speed_r *= -1;
       light.x += light.speed_x;
       light.y += light.speed_y;
        light.r += light.speed_r;
    });
}
        
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}    
createLights(lights);
requestAnimFrame(function() {
    animateLights(context,canvas, lights);
}); 

