
function Tunnel(gl, x, y, z,rotangle,shift) {

	this.x   = x;
	this.y   = y;
	this.z   = z;
	this.shift = shift;
	this.rotation = rotangle;

  	const positionBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [

     1.0,0.0,0.5,
     1.0,0.0,-0.5,
     Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
     Math.sqrt(0.5),Math.sqrt(0.5),0.5,


     Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
     Math.sqrt(0.5),Math.sqrt(0.5),0.5,
     0.0,1.0,0.5,
     0.0,1.0,-0.5,

     0.0,1.0,0.5,
     0.0,1.0,-0.5,
     -Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
     -Math.sqrt(0.5),Math.sqrt(0.5),0.5,

     -Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
     -Math.sqrt(0.5),Math.sqrt(0.5),0.5,
     -1.0,0.0,0.5,
     -1.0,0.0,-0.5,

     -1.0,0.0,0.5,
     -1.0,0.0,-0.5,
     -Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
     -Math.sqrt(0.5),-Math.sqrt(0.5),0.5,

     -Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
     -Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
     0.0,-1.0,0.5,
     0.0,-1.0,-0.5,

     0.0,-1.0,0.5,
     0.0,-1.0,-0.5,
     Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
     Math.sqrt(0.5),-Math.sqrt(0.5),0.5,

     Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
     Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
     1.0,0.0,0.5,
     1.0,0.0,-0.5,
   ];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  //   const faceColors = [
  //     [1.0,  1.0,  1.0,  1.0],    // Front face: white
  //     [1.0,  0.0,  0.0,  1.0],    // Back face: red
  //     [0.0,  1.0,  0.0,  1.0],    // Top face: green
  //     [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
	//
  //     [1.0,  0.0,  0.0,  1.0],    // Right face: red
  //     [0.0,  0.0,  1.0,  1.0],    // Right face: blue
	//
  //     [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  //     [1.0,  0.0,  0.0,  1.0],    // Back face: red
  //   ];
	//
	//
 	// var colors = [];
	//
  // 	for (var j = 0; j < faceColors.length; ++j) {
  //   	const c = faceColors[j];
  //   	colors  = colors.concat(c, c, c, c);
  // 	}
	//
  // 	const colorBuffer = gl.createBuffer();
  // 	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	const normalBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	 var ra = Math.sin(22.5 * Math.PI/180);
	 var teta = 45;
   const vertexNormals = [
     // Front
		 ra * Math.cos(22.5 * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos(22.5 * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos(22.5 * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
     ra * Math.cos(22.5 * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,


     // Back
		 ra * Math.cos((22.5 + teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,

     // Top
		 ra * Math.cos((22.5 + 2*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 2*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 2*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 2*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
     // Bottom
		 ra * Math.cos((22.5 + 3*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 3*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 3*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 3*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
     // Right
		 ra * Math.cos((22.5 + 4*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 4*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 4*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 4*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
     // Left
		 ra * Math.cos((22.5 + 5*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 5*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 5*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 5*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,

		 ra * Math.cos((22.5 + 6*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 6*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 6*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 6*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,

		 ra * Math.cos((22.5 + 7*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 7*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
		 ra * Math.cos((22.5 + 7*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
	   ra * Math.cos((22.5 + 7*teta) * Math.PI/180),ra * Math.sin(22.5 * Math.PI/180),  0.0,
   ];

   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                 gl.STATIC_DRAW);

 // ...
 //
 //   return {
 //     position: positionBuffer,
 //     normal: normalBuffer,
 //     textureCoord: textureCoordBuffer,
 //     indices: indexBuffer,
 //   };


	const textureCoordBuffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

 const textureCoordinates = [
	 // Front
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Back
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Top
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Bottom
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Right
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Left
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Right
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
	 // Left
	 0.0,  0.0,
	 1.0,  0.0,
	 1.0,  1.0,
	 0.0,  1.0,
 ];

 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
							 gl.STATIC_DRAW);

// ...
//  return {
// 	 position: positionBuffer,
// 	 textureCoord: textureCoordBuffer,
// 	 indices: indexBuffer,
// };
  //	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  	const indexBuffer = gl.createBuffer();
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

       const indices = [
        0,  1,  2,      0,  2,  3,    // front
        4,  5,  6,      4,  6,  7,    // back
        8,  9,  10,     8,  10, 11,   // top
        12, 13, 14,     12, 14, 15,   // bottom
        16, 17, 18,     16, 18, 19,   // right
        20, 21, 22,     20, 22, 23,   // left
        24, 25, 26,     24, 26, 27,
        28, 29, 30,     28, 30, 31,
      ];


    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  	this.buffers = {
		position: positionBuffer,
   		normal: normalBuffer,
    	textureCoord: textureCoordBuffer,
    	indices: indexBuffer,
  	};
}



Tunnel.prototype.draw = function(gl,  buffers, fieldOfView, aspect, zNear, zFar, programInfo, projectionMatrix,deltaTime,camera,texture) {

		// Tell WebGL we want to affect texture unit 0
		gl.activeTexture(gl.TEXTURE0);

		// Bind the texture to texture unit 0
		gl.bindTexture(gl.TEXTURE_2D, texture);

		// Tell the shader we bound the texture to texture unit 0
		gl.uniform1i(programInfo.uniformLocations.uSampler, 0);
    mat4.perspective(projectionMatrix,
                     fieldOfView,
                     aspect,
                     zNear,
                     zFar);
    const modelViewMatrix = mat4.create();
		const anotherCameraMatrix = mat4.create();
		const normalMatrix = mat4.create();
		mat4.invert(normalMatrix, modelViewMatrix);
		mat4.transpose(normalMatrix, normalMatrix);



		// this.rotation = -45 + 22.5;
    mat4.translate(modelViewMatrix,     // destination matrix
                   modelViewMatrix,     // matrix to translate
                   [this.x, this.y, this.z]);  // amount to translate
    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                cubeRotation = this.rotation * 	Math.PI/180,     // amount to rotate in radians
                [0, 0, 1]);       // axis to rotate around (Z)
    mat4.rotate(modelViewMatrix,  // destination matrix
                modelViewMatrix,  // matrix to rotate
                cubeRotation * 0,// amount to rotate in radians
                [0, 1, 0]);       // axis to rotate around (X)
		//if(camera.z > 50){
			//camera.z -= 0.0001;
		//}
		if(camera.y < -0.8){
			camera.y = -0.8;
			cam_yspeed = 0;
		}
		var radius = Math.sin(22.5 * Math.PI/180);
		eye = [camera.x,camera.y+this.shift,camera.z];
		look = [camera.x,camera.y+this.shift,camera.z -1];
		//console.log(camera);
		up = [this.x,this.y,camera.z];
		mat4.lookAt(anotherCameraMatrix,eye,look,up);
		mat4.multiply(modelViewMatrix,anotherCameraMatrix,modelViewMatrix);
		{
      const numComponents = 3;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          programInfo.attribLocations.vertexPosition);
    }
    // {
    //   const numComponents = 4;
    //   const type = gl.FLOAT;
    //   const normalize = false;
    //   const stride = 0;
    //   const offset = 0;
    //   gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    //   gl.vertexAttribPointer(
    //       programInfo.attribLocations.vertexColor,
    //       numComponents,
    //       type,
    //       normalize,
    //       stride,
    //       offset);
    //   gl.enableVertexAttribArray(
    //       programInfo.attribLocations.vertexColor);
	  // }
		{
	 const numComponents = 3;
	 const type = gl.FLOAT;
	 const normalize = false;
	 const stride = 0;
	 const offset = 0;
	 gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
	 gl.vertexAttribPointer(
			 programInfo.attribLocations.vertexNormal,
			 numComponents,
			 type,
			 normalize,
			 stride,
			 offset);
	 gl.enableVertexAttribArray(
			 programInfo.attribLocations.vertexNormal);
 	 }
		{
    const num = 2; // every coordinate composed of 2 values
    const type = gl.FLOAT; // the data in the buffer is 32 bit float
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
		}

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.useProgram(programInfo.program);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix);
    gl.uniformMatrix4fv(
        programInfo.uniformLocations.modelViewMatrix,
        false,
        modelViewMatrix);

				gl.uniformMatrix4fv(
	       programInfo.uniformLocations.normalMatrix,
	       false,
	       normalMatrix);
    {
      const vertexCount = 48;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
    cubeRotation += deltaTime;

}


// function Tunnel(gl,x,y,z){
//   this.x = x;
//   this.y = y;
//   this.z = z;
//   const positionBuffer = gl.createBuffer();
//
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//
//   const positions = [
//
//   1.0,0.0,0.5,
//   1.0,0.0,-0.5,
//   Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
//   Math.sqrt(0.5),Math.sqrt(0.5),0.5,
//
//
//   Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
//   Math.sqrt(0.5),Math.sqrt(0.5),0.5,
//   0.0,1.0,0.5,
//   0.0,1.0,-0.5,
//
//   0.0,1.0,0.5,
//   0.0,1.0,-0.5,
//   -Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
//   -Math.sqrt(0.5),Math.sqrt(0.5),0.5,
//
//   -Math.sqrt(0.5),Math.sqrt(0.5),-0.5,
//   -Math.sqrt(0.5),Math.sqrt(0.5),0.5,
//   -1.0,0.0,0.5,
//   -1.0,0.0,-0.5,
//
//   -1.0,0.0,0.5,
//   -1.0,0.0,-0.5,
//   -Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
//   -Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
//
//   -Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
//   -Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
//   0.0,-1.0,0.5,
//   0.0,-1.0,-0.5,
//
//   0.0,-1.0,0.5,
//   0.0,-1.0,-0.5,
//   Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
//   Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
//
//   Math.sqrt(0.5),-Math.sqrt(0.5),-0.5,
//   Math.sqrt(0.5),-Math.sqrt(0.5),0.5,
//   1.0,0.0,0.5,
//   1.0,0.0,-0.5,
// ];
//
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//
//   const faceColors = [
//     [1.0,  1.0,  1.0,  1.0],    // Front face: white
//     [1.0,  0.0,  0.0,  1.0],    // Back face: red
//     [0.0,  1.0,  0.0,  1.0],    // Top face: green
//     [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
//
//     [1.0,  0.0,  0.0,  1.0],    // Right face: red
//     [0.0,  0.0,  1.0,  1.0],    // Right face: blue
//
//     [1.0,  0.0,  1.0,  1.0],    // Left face: purple
//     [1.0,  0.0,  0.0,  1.0],    // Back face: red
//   ];
//
//   // Convert the array of colors into a table for all the vertices.
//
//   var colors = [];
//
//   for (var j = 0; j < faceColors.length; ++j) {
//     const c = faceColors[j];
//
//     // Repeat each color four times for the four vertices of the face
//     colors = colors.concat(c, c, c, c);
//   }
//
//   const colorBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
//
//   // Build the element array buffer; this specifies the indices
//   // into the vertex arrays for each face's vertices.
//
//   const indexBuffer = gl.createBuffer();
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
//
//
//   const indices = [
//     0,  1,  2,      0,  2,  3,    // front
//     4,  5,  6,      4,  6,  7,    // back
//     8,  9,  10,     8,  10, 11,   // top
//     12, 13, 14,     12, 14, 15,   // bottom
//     16, 17, 18,     16, 18, 19,   // right
//     20, 21, 22,     20, 22, 23,   // left
//     24, 25, 26,     24, 26, 27,
//     28, 29, 30,     28, 30, 31,
//   ];
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
//   new Uint16Array(indices), gl.STATIC_DRAW);
//   return {
//     position: positionBuffer,
//     color: colorBuffer,
//     indices: indexBuffer,
//   };
// }
//
//
// Tunnel.prototype.draw = function(gl, programInfo, buffers, deltaTime,fieldOfView,aspect,zNear,zFar,projectionMatrix)
// {
//
//   mat4.perspective(projectionMatrix,
//                    fieldOfView,
//                    aspect,
//                    zNear,
//                    zFar);
//   const modelViewMatrix = mat4.create();
//   mat4.translate(modelViewMatrix,     // destination matrix
//                  modelViewMatrix,     // matrix to translate
//                  [this.x, this.y, this.z]);  // amount to translate
//   mat4.rotate(modelViewMatrix,  // destination matrix
//               modelViewMatrix,  // matrix to rotate
//               cubeRotation * 1.0,     // amount to rotate in radians
//               [0, 0, 1]);       // axis to rotate around (Z)
//   mat4.rotate(modelViewMatrix,  // destination matrix
//               modelViewMatrix,  // matrix to rotate
//               cubeRotation * 0,// amount to rotate in radians
//               [0, 1, 0]);       // axis to rotate around (X)
//   {
//     const numComponents = 3;
//     const type = gl.FLOAT;
//     const normalize = false;
//     const stride = 0;
//     const offset = 0;
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
//     gl.vertexAttribPointer(
//         programInfo.attribLocations.vertexPosition,
//         numComponents,
//         type,
//         normalize,
//         stride,
//         offset);
//     gl.enableVertexAttribArray(
//         programInfo.attribLocations.vertexPosition);
//   }
//   {
//     const numComponents = 4;
//     const type = gl.FLOAT;
//     const normalize = false;
//     const stride = 0;
//     const offset = 0;
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
//     gl.vertexAttribPointer(
//         programInfo.attribLocations.vertexColor,
//         numComponents,
//         type,
//         normalize,
//         stride,
//         offset);
//     gl.enableVertexAttribArray(
//         programInfo.attribLocations.vertexColor);
//   }
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
//   gl.useProgram(programInfo.program);
//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.projectionMatrix,
//       false,
//       projectionMatrix);
//   gl.uniformMatrix4fv(
//       programInfo.uniformLocations.modelViewMatrix,
//       false,
//       modelViewMatrix);
//   {
//     const vertexCount = 48;
//     const type = gl.UNSIGNED_SHORT;
//     const offset = 0;
//     gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
//   }
//   cubeRotation += deltaTime;
// }
