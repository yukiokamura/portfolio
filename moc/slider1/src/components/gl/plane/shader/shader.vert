
precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;

attribute vec2 uv;
varying vec2 vUv;
void main() {

  vUv =  uv;

  vec3 pos = position;


  vec4 projected = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projected;

  
}
