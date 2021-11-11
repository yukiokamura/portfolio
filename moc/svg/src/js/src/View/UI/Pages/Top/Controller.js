//--------------------------------------------------
//
//  Controller
//
//--------------------------------------------------

import Base from "@BALANCeLibs/Base.js";
import * as m from "@BALANCeLibs/Util/Math.js";

import { Conf } from "@/Conf";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export default class Controller extends Base {
  constructor() {
    super();

    this.isUEv = true;
    this.setup();
    this.setEvents();

    // this.timeline();
  }

  async setup() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: document.querySelector("canvas"),
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    this.camera.position.z = 100;

    const data = await gb.assetsMgr.load();
    const group = new THREE.Group();
    group.position.z = -500;
    data.paths.forEach((path) => {
      const shapes = SVGLoader.createShapes(path);
      shapes.forEach((shape) => {
        const geometry = new THREE.ShapeGeometry(shape);
        const m = new THREE.MeshBasicMaterial({
          color: 0x000000,
        });

        const mesh = new THREE.Mesh(geometry, m);
        mesh.scale.y = -1;
        group.add(mesh);
      });
    });

    // this.mesh = new THREE.Mesh(g, m);
    this.scene.add(group);
  }

  timeline() {
    Conf.isFirst = false;
  }

  update() {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }

  onResize() {}

  setEvents() {
    super.setEvents();
  }
}
