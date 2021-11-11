precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 offsetPos;
attribute vec3 offsetPos2;
attribute vec2 uv;
attribute float id;
uniform float uTime;

varying vec2 vUv;
void main() {

  vUv =  uv;

  vec3 pos = position;
  float u = clamp(uTime - id * .001,0.0,1.0);
  vec3 pos2 = mix(offsetPos2,offsetPos,u);
  pos += pos2;
  
//   if(id == 1.0)pos.x += 1000.0;
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projected;

  

  
}
