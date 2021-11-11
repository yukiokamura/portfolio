import * as THREE from "three";

export default class Camera {
  constructor(size) {
    this.fov = 45;
    this.near = 1;
    this.far = 50000;

    this.setup(size);
  }

  setup(size) {
    this.aspect = size.w / size.h;

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.aspect,
      this.near,
      this.far
    );

    this.onResize(size);
  }

  setCameraByPixel() {
    const fov = this.fov;
    const vFOV = fov * (Math.PI / 180); // convert to radians
    const vpHeight = this.size.h; // viewport height;
    const z = vpHeight / (2 * Math.tan(vFOV / 2));
    this.z = z;
    this.camera.position.set(0, 0, z);
    this.camera.lookAt(new THREE.Vector3());
  }

  onResize(size) {
    this.aspect = size.w / size.h;
    this.size = size;
    this.setCameraByPixel();

    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }
}
