import Camera from "./camera";
import Renderer from "./renderer";
import Plane from "./plane";
import { Scene } from "three";
import { getGPUTier } from "detect-gpu";
export default class Controller {
  constructor(dom) {
    this.dom = dom;
    this.canvas = dom.querySelector("canvas");

    this.frame;
    this.t = 0;
    this.setup();
  }

  setup() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.camera = new Camera();

    this.scene = new Scene();
    this.plane = new Plane(15);
    this.scene.add(this.plane);
  }

  onResize(w, h) {
    this.size = {
      w: w,
      h: h,
    };

    this.renderer.onResize(this.size.w, this.size.h);
    this.camera.onResize(this.size.w, this.size.h);
  }

  update() {
    ++this.t;
    if (this.plane) this.plane.update(this.t);
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    this.renderer.dispose();
    if (this.plane) this.plane.destroy();
  }

  changePage(key) {
    console.log(key, this.plane);
    if (this.plane) this.plane.changePage(key);
  }
}
