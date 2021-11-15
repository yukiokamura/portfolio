import Camera from "./camera";
import Renderer from "./renderer";
import Plane from "./plane";
import { Scene } from "three";
export default class Controller {
  constructor(dom) {
    this.dom = dom;
    this.canvas = dom.querySelector("canvas");

    this.frame;
    this.t = 0;
    this.setup();
    this.setEvents();
  }

  setup() {
    this.renderer = new Renderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    this.camera = new Camera();

    this.scene = new Scene();

    this.plane = new Plane(this.scene);

    this.scene.add(this.plane);
    this.onResize();
    this.update();
  }

  setEvents() {
    this.resizeHandler = this.onResize.bind(this);
    window.addEventListener("resize", this.resizeHandler);
  }

  onResize() {
    this.size = {
      w: this.dom.clientWidth,
      h: this.dom.clientHeight,
    };

    this.renderer.onResize(this.size.w, this.size.h);
    this.camera.onResize(this.size.w, this.size.h);
  }

  removeEvents() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  update() {
    ++this.t;
    this.plane.update(this.t);
    this.renderer.render(this.scene, this.camera);
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  destroy() {
    this.removeEvents();
    window.cancelAnimationFrame(this.frame);
    this.renderer.dispose();
    this.plane.destroy();
  }

  changePage(key) {
    this.plane.changePage(key);
  }
}
