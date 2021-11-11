import * as THREE from "three";

export default class Raycaster {
  constructor() {
    this.setup();
  }

  setup() {
    this.raycaster = new THREE.Raycaster();
  }

  intersects(camera, mouse, objs) {
    this.raycaster.setFromCamera(mouse, camera);
    const intersects = this.raycaster.intersectObjects(objs);
    return intersects;
  }
}
