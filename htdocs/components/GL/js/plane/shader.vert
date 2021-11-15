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
  
  // vec3 changePos = pattern == 0.0 ? offsetPos : offsetPos3;
  
  vec3 changePos = pattern > 1.0 ? mix(offsetPos,offsetPos4,pattern - 1.0) : mix(offsetPos,offsetPos3,pattern);
  changePos *=  (size + margin);
  vec3 pos2 = mix(pos,changePos,u);
  pos += pos2;
  if(pattern == 0.0){
    float s = max(0.0,sin(-uTime * 2.0 + length(offsetPos) * .1));
    pos.xz *= rotate(s * 2.);
    pos.xy *= rotate(s * 1.);
    float _m = margin / 100.0;
    color = vec3(clamp((s * .5 + .5) * _m,0.0,1.0));
  }
  if(pattern > 0.0 && pattern <= 1.0){
    float s = sin(uTime * 0.4 + length(offsetPos3) * .5 + (id + 10.) / (3. * 3. * 3. * 10. ) * .1) * 2.0 - 1.0;
    pos.xy *= rotate(s * 3.);
    pos.yz *= rotate(s * 5.);
    pos.xz *= rotate(s * 4.);
    color = vec3(clamp((s * .5 + .5),0.0,1.0));
  }
   if(pattern > 1.0){
    float s = sin(uTime * .5 );
    pos.xy *= rotate(s * 1.);
    pos.xz *= rotate(s * 3.);
    pos.yz *= rotate(s * 5.);
    pos.xyz *= sin(uTime * .05 - length(vec2(margin * 0.01,id)) * .5) * 10.;
    // pos.xz *= rotate(s * 5.);
    color = vec3(clamp(length(pos) * 1.0,0.0,1.0));
  }
  vec4 projected = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projected;

  

  
}
