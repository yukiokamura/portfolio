precision highp float;
// useful uniform
uniform float time;
uniform sampler2D uTex;
uniform vec2 resolution;
uniform vec2 imageResolution;
uniform bool isGlich;

varying vec2 vUv;


float rnd(vec2 n){
    float a = 0.129898;
    float b = 0.78233;
    float c = 437.585453;
    float dt= dot(n ,vec2(a, b));
    float sn= mod(dt, 3.14);
    return fract(sin(sn) * c);
}


vec2 glitch(float width,float height,vec2 uv){
  // float time = 1.;
  float gNoiseV = rnd(vec2(width, time*.1));
  float gNoiseH = rnd(vec2(height, time*.2));
  float threshold = .1;
  float gStepV = step(gNoiseV, threshold * 2.);
  float gStepH = step(gNoiseH, threshold);
  float gStrengthV = gNoiseV / threshold;
  float gStrengthH = gNoiseH / threshold;
  gStrengthV = gStrengthV * 2.0 - 1.0;
  gStrengthH = gStrengthH * 2.0 - 1.0;
  float V = gStepV * gStrengthV;
  float H = gStepH * gStrengthH;
  return uv.xy + vec2(V + H, 0.0);
  
}

// main
void main() {
  vec2 ratio = vec2(
      min((resolution.x / resolution.y) / (imageResolution.x / imageResolution.y), 1.0),
      min((resolution.y / resolution.x) / (imageResolution.y / imageResolution.x), 1.0)
    );
  vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );
  
  
  vec4 color;
  if(isGlich){
    color = texture2D( uTex, glitch(.1,.2,uv));
    // float g = texture2D( uTex, glitch(.2,.2,uv)).g;
    // float b = texture2D( uTex, glitch(.1,.1,uv)).b;
    // color = vec4(r,g,b,1.0);
  }else{
    color = texture2D( uTex, uv);
  }
  
    
  gl_FragColor = color;

}
