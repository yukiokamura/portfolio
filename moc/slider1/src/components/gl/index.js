import * as THREE from "three";
import gsap from "gsap";
import Camera from "./camera";
import Renderer from "./renderer";
import Plane from "./plane/";

import { PLANESIZE, R, paths } from "./config";

const NUM = paths.length;

const loader = new THREE.TextureLoader();

const imgLoad = path => {
  return new Promise(resolve => {
    loader.load(path, texture => {
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearFilter;
      resolve(texture);
    });
  });
};

import Raycaster from "./raycaster";

export default class GLController {
  constructor(canvas) {
    this.canvas = canvas;
    this.planes = [];
    this.val = 0;
    this.target = 0;
    this.active = 0;

    this.init = 0.5;

    this.setup();
  }

  async setup() {
    this.frame = this.init;
    this.mouse = new THREE.Vector2(0, 0);
    this.mouseActive = false;
    this.activePlane = null;
    const size = {
      w: this.canvas.clientWidth,
      h: this.canvas.clientHeight
    };

    this.renderer = new Renderer(size, this.canvas);
    this.camera = new Camera(size);

    this.scene = new THREE.Scene();

    this.wrap = new THREE.Group();
    this.wrap.position.y =
      -R + window.innerHeight * 0.5 - PLANESIZE.h * 0.5 - 50;
    // this.wrap.rotation.y = Math.PI * 0.5;
    this.scene.add(this.wrap);

    await this.setupPlane();

    this.raycaster = new Raycaster();

    this.render();
  }

  async setupPlane() {
    const theta = this.frame * Math.PI;
    const _textures = paths.map(path => imgLoad(path));

    const textures = await Promise.all(_textures);

    textures.forEach((texture, i) => {
      const position = new THREE.Vector3(
        Math.cos((Math.PI / NUM) * 2 * i + theta) * R + Math.PI * 0.5,
        Math.sin((Math.PI / NUM) * 2 * i + theta) * R + Math.PI * 0.5,
        0
      );

      const plane = new Plane(
        PLANESIZE,
        position,
        (Math.PI / NUM) * 2 * i + Math.PI * 0.5 + theta,
        i,
        texture
      );
      this.planes.push(plane);
      this.wrap.add(plane.obj);
    });
  }

  render() {
    this.frame = this.target + this.init;
    const theta = (this.frame * Math.PI) % (Math.PI * 2);

    this.planes.forEach((plane, i) => {
      const position = new THREE.Vector3(
        Math.cos((Math.PI / NUM) * 2 * i + theta) * R + Math.PI * 0.5,
        Math.sin((Math.PI / NUM) * 2 * i + theta) * R + Math.PI * 0.5,
        0
      );
      plane.move(position, (Math.PI / NUM) * 2 * i + theta + Math.PI * 0.5);
      plane.tick();
    });

    if (this.raycaster && this.mouseActive) {
      const intersects = this.raycaster.intersects(
        this.camera.camera,
        this.mouse,
        this.wrap.children
      );
      if (intersects.length) {
        this.onHover(intersects[0]);
        const index = intersects[0].object.name;
        this.activePlane = this.planes[index];
      } else {
        this.onHoverOut();
        this.activePlane = null;
      }
    }

    this.renderer.draw(this.scene, this.camera.camera);
  }

  onResize() {
    const size = {
      w: this.canvas.clientWidth,
      h: this.canvas.clientHeight
    };

    console.log(size);
    this.camera.onResize(size);

    this.renderer.onResize(size);
  }

  onMove(isPrev) {
    this.active = isPrev ? this.active - 1 : this.active + 1;

    const r = (1 / NUM) * 2 * this.active;

    gsap.to(this, 1, {
      target: r,
      ease: "expo.out"
    });
  }

  onHover(obj) {
    const index = obj.object.name;
    this.planes[index].hover();
  }

  onHoverOut() {
    this.planes.forEach(plane => plane.hoverOut());
  }

  onMouseMove(x, y) {
    this.mouseActive = true;
    this.mouse.x = x;
    this.mouse.y = y;
  }

  onClick() {
    if (this.activePlane) {
      const inView = this.planes
        .filter(plane => {
          if (
            plane.position.x < window.innerWidth * 0.5 + PLANESIZE.w * 5 &&
            plane.position.x > -window.innerWidth * 0.5 - PLANESIZE.w * 5
          ) {
            if (plane.position.y > 0) return true;
          }
        })
        .sort((plane1, plane2) => plane1.position.x - plane2.position.x);

      inView.forEach((plane, i) => {
        plane.close(i);
      });
    }
  }
}
