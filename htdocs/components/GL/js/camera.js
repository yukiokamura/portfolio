import { PerspectiveCamera, Vector3 } from "three";

export default class Camera extends PerspectiveCamera {
  constructor(near = 1, far = 50000, fov = 45) {
    super(fov, 1, near, far);
  }

  onResize(w, h) {
    this.height = h;
    this.aspect = w / h;

    this.position.z = this.positionZ;

    this.lookAt(new Vector3());

    this.updateProjectionMatrix();
  }

  get positionZ() {
    const vFov = this.fov * (Math.PI / 180);
    const z = this.height / (2 * Math.tan(vFov * 0.5));
    return z;
  }

  //   onResize(w, h) {
  //     this.height = h;
  //     this.position.z = this.positionZ;
  //     this.aspect = w / h;
  //   }
}
