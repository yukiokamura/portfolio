import * as THREE from "three";

export default class Renderer {
  constructor(size, canvas) {
    this.size = size;
    this.canvas = canvas;

    this.setup();
  }

  setup() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.size.w, this.size.h);
    this.renderer.setClearColor(0x000000, 1.0);
    this.renderer.autoClear = false;

    this.canvas.appendChild(this.renderer.domElement);
  }

  onResize(size) {
    this.size = size;
    this.renderer.setSize(this.size.w, this.size.h);
  }

  draw(scene, camera) {
    this.renderer.render(scene, camera);
  }
}
