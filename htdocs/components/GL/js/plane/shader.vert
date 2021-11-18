precision highp float;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec3 offsetPos;
attribute vec3 offsetPos2;
attribute vec3 offsetPos3;
attribute vec3 offsetPos4;
attribute vec2 uv;
attribute float id;
uniform float uTime;
uniform float size;
uniform float margin;
uniform float pattern;

// varying vec2 vUv;
varying vec3 color;
highp mat2 rotate(float rad){
    return mat2(cos(rad),sin(rad),-sin(rad),cos(rad));
}


void main() {

  // vUv =  uv;

  vec3 pos = position;
  float u = clamp(uTime - id * .001,0.0,1.0);

  float _pattern = clamp(pattern - 1.0,0.0,1.0);
  
  vec3 changePos = mix(offsetPos,mix(offsetPos3,offsetPos4,_pattern),clamp(pattern,0.0,1.0));
  changePos *=  (size + margin);
  vec3 pos2 = mix(pos,changePos,u);
  pos += pos2;
  float param = max(0.0,sin(-uTime * 2.0 + length(offsetPos) * .1));
  float param2 = mix(length(changePos),length(offsetPos),(sin(uTime) + 1.0) * .5) + cos(uTime * 0.01);
  
  float s = pattern < 1.0 ? mix(param,param2,pattern) : mix(param2,param,_pattern);
  pos.xz *= rotate(s * 2. + s * pattern);
  pos.xy *= rotate(s * 1. + s *  pattern);
  pos.yz *= rotate(s * 5. + s * pattern);
  color = vec3(clamp((s * .5 + .5),0.0,1.0));
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projected;

  

  
}
