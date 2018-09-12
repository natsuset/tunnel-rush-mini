var cubeRotation = 0.0;
var obstaRotation = 0.0;
var fanRotation = 0.0;
var count = 0;
var tunnels = [];
// var obsta = [];
var far_change = 0.1;
var shift_track = 0;
var camera_rotation = -90;
var speed_vari = 0;
var key_input = [];
var end_game = 0;
var cam_yspeed = 0;var cam_dec = 0.03;
var camera = {
  x:0,
  y:-0.8,
  z:-0,
};
var jump_flag = 0;
var camera_up = {
  x:0,
  y:0,
  z:0,
}
last_track = 0;
main();

function main() {
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    // const vsSource = `
    //     attribute vec4 aVertexPosition;
    //     attribute vec4 aVertexColor;
    //
    //     uniform mat4 uModelViewMatrix;
    //     uniform mat4 uProjectionMatrix;
    //
    //     varying lowp vec4 vColor;
    //
    //     void main(void) {
    //       gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    //       vColor = aVertexColor;
    //     }
    // `;

  //   const vsSource = `
  //   attribute vec4 aVertexPosition;
  //   attribute vec2 aTextureCoord;
  //
  //   uniform mat4 uModelViewMatrix;
  //   uniform mat4 uProjectionMatrix;
  //
  //   varying highp vec2 vTextureCoord;
  //
  //   void main(void) {
  //     gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  //     vTextureCoord = aTextureCoord;
  //   }
  // `;

  const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec3 aVertexNormal;
      attribute vec2 aTextureCoord;

      uniform mat4 uNormalMatrix;
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;

      varying highp vec2 vTextureCoord;
      varying highp vec3 vLighting;

      void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;

        // Apply lighting effect

        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
      }
    `;

    const fsSource = `
       varying highp vec2 vTextureCoord;
       varying highp vec3 vLighting;

       uniform sampler2D uSampler;

       void main(void) {
         highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

         gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
       }
     `;

  // const fsSource = `
  //    varying highp vec2 vTextureCoord;
  //
  //    uniform sampler2D uSampler;
  //
  //    void main(void) {
  //      gl_FragColor = texture2D(uSampler, vTextureCoord);
  //    }
  //  `;
    // const fsSource = `
    //     varying lowp vec4 vColor;
    //
    //     void main(void) {
    //       gl_FragColor = vColor;
    //     }
    // `;

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
    textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
    uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
  },
};

    // const programInfo = {
    //     program: shaderProgram,
    //     attribLocations: {
    //         vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    //         textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    //     },
    //     uniformLocations: {
    //         projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    //         modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    //         uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    //
    //     },
    // };


  //   const programInfo = {
  //   program: shaderProgram,
  //   attribLocations: {
  //     vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
  //     textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
  //   },
  //   uniformLocations: {
  //     projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
  //     modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  //     uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
  //   },
  // };




    var shift = 0;
    rotationangle = 22.5;
    for(var i=0;i<1000;i++){
      tunnels.push(new Tunnel(gl, 0 , 0 + shift, -1-i,rotationangle,shift));
      //console.log(shift);
      rotationangle += 45;
      shift += 0.005;
      last_track = -1-i;
    }
    shift_track = shift;
  var obsta = new Obstacle(gl,0,tunnels[10].y,tunnels[10].z ,0.0,tunnels[10].shift);
  var obsta1 = new Obstacle(gl,0,tunnels[20].y,tunnels[20].z ,0.0,tunnels[20].shift);
  var obsta2 = new Obstacle(gl,0,tunnels[30].y,tunnels[30].z ,0.0,tunnels[30].shift);
  var obsta3 = new Obstacle(gl,0,tunnels[600].y,tunnels[600].z ,0.0,tunnels[600].shift);
  var obsta4 = new Obstacle(gl,0,tunnels[200].y,tunnels[200].z ,0.0,tunnels[200].shift);


  var fan  = new Fan(gl,0,tunnels[100].y,tunnels[100].z ,0.0,tunnels[100].shift);
  var fan1 = new Fan(gl,0,tunnels[120].y,tunnels[120].z ,0.0,tunnels[120].shift);
  var fan2 = new Fan(gl,0,tunnels[130].y,tunnels[130].z ,0.0,tunnels[130].shift);
  var fan3 = new Fan(gl,0,tunnels[180].y,tunnels[180].z ,0.0,tunnels[180].shift);
  var fan4 = new Fan(gl,0,tunnels[200].y,tunnels[200].z ,0.0,tunnels[200].shift);
  // console.log(tunnels[10].x);
  // console.log(tunnels[10].y);
  // console.log(obsta.y);
  // console.log(tunnels[10].z);
  var currentlyPressedKeys = {};

  function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;

    // // if (String.fromCharCode(event.keyCode) == "UP") {
    // if (currentlyPressedKeys[39] && end_game == 0) {
    // //  console.log('KAKBSDJKBV') ;
    //   // far_change -=0.01;
    //   //camera.z -= 0.5;
    //   var radius = Math.sin(22.5 * Math.PI/180);
    //   for(var i = 0;i<1000;i++){
    //     tunnels[i].rotation -= 2;
    //
    //   }
    //   obsta.rotation -= 0.2;
    //   obsta1.rotation -= 0.2;
    //   obsta2.rotation -= 0.2;
    //   obsta3.rotation -= 0.2;
    //   obsta4.rotation -= 0.2;
    //   // camera_rotation += 3;
    //   // camera.x =  0.8*Math.cos(camera_rotation * Math.PI /180);
    //   // camera.y =  0.8*Math.sin(camera_rotation * Math.PI /180);
    // }
    // if(currentlyPressedKeys[32] && end_game == 0){
    //   console.log('KSDJBSKBV');
    // }
    // if (currentlyPressedKeys[37] && end_game == 0) {
    //
    //   var radius = Math.sin(22.5 * Math.PI/180);
    //   for(var i = 0;i<1000;i++){
    //     tunnels[i].rotation += 2;
    //   }
    //   obsta.rotation += 0.2;
    //   obsta1.rotation += 0.2;
    //   obsta2.rotation += 0.2;
    //   obsta3.rotation += 0.2;
    //   obsta4.rotation += 0.2;
    //   // camera_rotation -= 3;
    //   // camera.x =  0.8*Math.cos(camera_rotation * Math.PI /180);
    //   // camera.y =  0.8*Math.sin(camera_rotation * Math.PI /180);
    // }
  }
function func(){
  // if (String.fromCharCode(event.keyCode) == "UP") {
  if (currentlyPressedKeys[39] && end_game == 0) {
  //  console.log('KAKBSDJKBV') ;
    // far_change -=0.01;
    //camera.z -= 0.5;
    var radius = Math.sin(22.5 * Math.PI/180);
    for(var i = 0;i<1000;i++){
      tunnels[i].rotation -= 2;

    }
    obsta.rotation -= 0.2;
    obsta1.rotation -= 0.2;
    obsta2.rotation -= 0.2;
    obsta3.rotation -= 0.2;
    obsta4.rotation -= 0.2;
    fan.rotation -= 0.2;
    fan1.rotation -= 0.2;
    fan2.rotation -= 0.2;
    fan3.rotation -= 0.2;
    fan4.rotation -= 0.2;
    // camera_rotation += 3;
    // camera.x =  0.8*Math.cos(camera_rotation * Math.PI /180);
    // camera.y =  0.8*Math.sin(camera_rotation * Math.PI /180);
  }
  if(currentlyPressedKeys[32] && end_game == 0 && jump_flag == 0 && camera.y == -0.8){
    console.log('KSDJBSKBV');
    jump_flag =1;
    cam_yspeed = 1.0;
    //camera.y += cam_yspeed;
  }
  if(currentlyPressedKeys[32] == false){
    jump_flag = 0;
  }

  if (currentlyPressedKeys[37] && end_game == 0) {

    var radius = Math.sin(22.5 * Math.PI/180);
    for(var i = 0;i<1000;i++){
      tunnels[i].rotation += 2;
    }
    console.log('SJKDVB');
    obsta.rotation += 0.2;
    obsta1.rotation += 0.2;
    obsta2.rotation += 0.2;
    obsta3.rotation += 0.2;
    obsta4.rotation += 0.2;
    fan.rotation += 0.2;
    fan1.rotation += 0.2;
    fan2.rotation += 0.2;
    fan3.rotation += 0.2;
    fan4.rotation += 0.2;
    // camera_rotation -= 3;
    // camera.x =  0.8*Math.cos(camera_rotation * Math.PI /180);
    // camera.y =  0.8*Math.sin(camera_rotation * Math.PI /180);
  }
}
  function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
  }

    function check_collision_fan(cam,fa){
      var theta = fanRotation * Math.PI/180;
      // theta = 0;
      // console.log('atleast here?');

      // console.log(fa.z);
      // if(fa.z - 0.5 <= cam.z <= fa.z + 0.5){
          // console.log('HERE');
        if((theta <= Math.PI/2 && theta >= 0) || (3 * Math.PI/2 <= theta && theta <= 2 * Math.PI)){
          // console.log('HERE1');
        //  console.log(cam.x);
          if((-0.2 * Math.cos(theta) + Math.sin(theta) <= cam.x) && (cam.x <= 0.2 * Math.cos(theta) + Math.sin(theta))){
          //  console.log('Collided');
          end_game = 1;
            return 1;
          }
          return 0;
        }
        else
        {
          if((0.2 * Math.cos(theta) + Math.sin(theta) <= cam.x) && (cam.x <= -0.2 * Math.cos(theta) + Math.sin(theta))) {
            //console.log('Collided');
            end_game = 1;
            return 1;
          }
          return 0;
        }

        // return 0;
      // }
      // else{
        //console.log('HERE');
        // return 0;
      // }
      // console.log('akvbjkdv');
    }

    function check_collision_obstacle(cam,obs){
      if(cam.z < obs.z + 0.25 && cam.z > obs.z-0.25){
        if((obs.rotation * 10 >= -22.5 && obs.rotation * 10 <= 22.5) || (obs.rotation *10 >= 180-22.5 && obs.rotation * 10 <= 180 + 22.5)
                          || (obs.rotation *10 >= -180-22.5 && obs.rotation * 10 <= -180 + 22.5)){
          // console.log('NOT COLLIDED');
          // console.log(obs.rotation * 10);
          return false;
        }
        else{
          // console.log('COLLIDED');
          // console.log(obs.rotation * 10);
          end_game = 1;
          return true;
        }
      }
      // console.log('ASDASD');
    }




    const texture = loadTexture(gl, 'images.jpeg');

    var then = 0;
    function render(now) {
        now *= 0.001;
        const deltaTime = now - then;
        then = now;
        speed_vari = deltaTime;

        if(end_game == 0){
        camera.z -= 0.1;
        if(camera.z < -100){
          camera.z -= 0.1;
          //console.log('AKHBSFK');
        }
      }
        if(cam_yspeed != 0){
          // camera.y += cam_yspeed*0.1;
          cam_yspeed -= cam_dec;
        }
        camera.y += cam_yspeed*0.1;

        func();
        // if(end_game == 1){
        //   camera.z = 0;
        // }
        // intializing values
        // console.log(tunnels[20].x);
        // console.log(tunnels[20].y);
        // console.log(tunnels[20].z);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        const fieldOfView = 25 * Math.PI / 180;
        const aspect = (gl.canvas.clientWidth / gl.canvas.clientHeight) ;
        const zNear = 0.1;
        //console.log(zNear);
        const zFar = 1000.0;
        const projectionMatrix = mat4.create();

        // console.log(tunnels[0].z);
        //tunnels[0].z = -100;
        //console.log(tunnels[0].z);
        if(camera.z <= tunnels[500].z){
          // console.log('HJasvbkhadbkv');
          count += 1;
          var rotationangle = 0;
          for(var i =0;i< 500;i++){
          //  console.log(last_track);
            tunnels.shift();
            tunnels.push(new Tunnel(gl, 0 , 0 + shift_track , last_track -1, tunnels[10].rotation + rotationangle,shift_track));
            //tunnels[i].z = last_track - 1;
            last_track -= 1;
            shift_track += 0.005;
            rotationangle += 45;
          }
          camera.z -= 0.1 * count;
        }

        document.onkeydown = handleKeyDown;
        document.onkeyup = handleKeyUp;
        // document.onkeydown = function(e){key_input[e.keyCode] = true};
        // document.onkeyup =  function(e){key_input[e.keyCode] = false};
        camera_up.x = camera.x
        //console.log()
        for(var i = 0; i < tunnels.length; i++) {
            tunnels[i].draw(gl,tunnels[i].buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera,texture);
        }
        obsta.draw(gl,obsta.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        obsta1.draw(gl,obsta1.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        obsta2.draw(gl,obsta2.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        obsta3.draw(gl,obsta3.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        obsta4.draw(gl,obsta4.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);



        fan.draw(gl,fan.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        fan1.draw(gl,fan1.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        fan2.draw(gl,fan2.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        fan3.draw(gl,fan3.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);
        fan4.draw(gl,fan4.buffers, fieldOfView, aspect,zNear, zFar, programInfo, projectionMatrix,  deltaTime,camera);


        fan.rotation = 1;
        fan1.rotation = 1;
        fan2.rotation = 1;
        fan3.rotation = 1;
        fan4.rotation = 1;
        // obsta.rotation = -22.5;
        // obsta1.rotation = -22.5;
        // obsta2.rotation = -22.5;
        // obsta3.rotation = -22.5;


        if(camera.z <= -100){
          obsta.rotation += 0.1;
          obsta1.rotation += 0.1;
          obsta2.rotation += 0.1;
          obsta3.rotation += 0.1;
          obsta4.rotation += 0.1;
        }
        if(camera.z <= obsta.z -1){
          obsta.z = obsta.z - 50;
        }
        if(camera.z <= obsta1.z -1){
          obsta.z = obsta1.z - 50;
        }
        if(camera.z <= obsta2.z -1){
          obsta.z = obsta2.z - 50;
        }
        if(camera.z <= obsta3.z -1){
          obsta.z = obsta3.z - 50;
        }
        if(camera.z <= obsta4.z -1){
          obsta.z = obsta4.z - 50;
        }
        if(camera.z <= fan.z -1){
          obsta.z = fan.z - 50;
        }
        if(camera.z <= fan1.z -1){
          obsta.z = fan1.z - 50;
        }
        if(camera.z <= fan2.z -1){
          obsta.z = fan2.z - 50;
        }
        if(camera.z <= fan3.z -1){
          obsta.z = fan3.z - 50;
        }
        if(camera.z <= fan4.z -1){
          obsta.z = fan4.z - 50;
        }
        if(camera.z <= obsta.z + 0.25  && camera.z >= obsta.z - 0.25)
          var check = check_collision_obstacle(camera,obsta);
        if(camera.z <= obsta1.z + 0.25  && camera.z >= obsta1.z - 0.25)
          var check1 = check_collision_obstacle(camera,obsta1);
        if(camera.z <= obsta2.z + 0.25  && camera.z >= obsta2.z - 0.25)
          var check2 = check_collision_obstacle(camera,obsta2);
        if(camera.z <= obsta3.z + 0.25  && camera.z >= obsta3.z - 0.25)
          var check3 = check_collision_obstacle(camera,obsta3);
        if(camera.z <= obsta4.z + 0.25  && camera.z >= obsta4.z - 0.25)
          var check4 = check_collision_obstacle(camera,obsta4);

        if(camera.z <= fan.z + 0.25  && camera.z >= fan.z - 0.25)
          var check5 = check_collision_fan(camera,fan);
        if(camera.z <= fan1.z + 0.25  && camera.z >= fan1.z - 0.25)
          var check6 = check_collision_fan(camera,fan1);
        if(camera.z <= fan2.z + 0.25  && camera.z >= fan2.z - 0.25)
          var check7 = check_collision_fan(camera,fan2);
        if(camera.z <= fan3.z + 0.25  && camera.z >= fan3.z - 0.25)
          var check8 = check_collision_fan(camera,fan3);
        if(camera.z <= fan4.z + 0.25  && camera.z >= fan4.z - 0.25)
          var check9 = check_collision_fan(camera,fan4);

        // var asdx = 90;
        // if(camera.z < -40.0 && camera.z > -60){
        //   asdx = 120;
        //   console.log('helpppp!!!!!');
        // }
        // // console.log(camera.z);
        //
        // if(asdx == 120){
        //   console.log('asdasdasdasd');
        //   asdx = 110;
        // }
        // console.log(tunnels[0].x);
        // console.log(tunnels[0].y);
        // console.log(tunnels[0].z);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                width, height, border, srcFormat, srcType,
                pixel);

  const image = new Image();
  image.onload = function() {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
       // Yes, it's a power of 2. Generate mips.
       gl.generateMipmap(gl.TEXTURE_2D);
    } else {
       // No, it's not a power of 2. Turn of mips and set
       // wrapping to clamp to edge
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
