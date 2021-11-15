precision highp float;
varying vec2 vUv;
varying vec3 color;
void main() {

    gl_FragColor = vec4(.2,color.y * .5 + .5,.5,1.0);
}