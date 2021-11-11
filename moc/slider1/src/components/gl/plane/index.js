import * as THREE from "three";

import frag from "./shader/shader.frag";
import vert from "./shader/shader.vert";
// import { R } from "../config";
import gsap from "gsap";
export default class GLController {
  constructor(size, position, rotation, id, texture) {
    this.isTick = false;
    this.opened = false;
    this.size = size;
    this.position = position;
    this.rotation = rotation;
    this.id = id;
    this.texture = texture;
    this.setup();
  }

  setup() {
    const xy1 = [-this.size.w * 0.5, -this.size.h * 0.5, 1.0];
    const xy2 = [this.size.w * 0.5, -this.size.h * 0.5, 1.0];
    const xy3 = [this.size.w * 0.5, this.size.h * 0.5, 1.0];
    const xy4 = [-this.size.w * 0.5, this.size.h * 0.5, 1.0];
    const vertices = new Float32Array([
      ...xy1,
      ...xy2,
      ...xy3,
      ...xy3,
      ...xy4,
      ...xy1
    ]);
    const xy1uv = [0, 0];
    const xy2uv = [1, 0];
    const xy3uv = [1, 1];
    const xy4uv = [0, 1];

    const uv = [...xy1uv, ...xy2uv, ...xy3uv, ...xy3uv, ...xy4uv, ...xy1uv];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    // geometry.scale(this.size.w * 0.5, this.size.h * 0.5, 1);
    geometry.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array(uv), 2)
    );
    const uniform = {
      uTex: { value: this.texture },
      resolution: { value: new THREE.Vector2(this.size.w, this.size.h) },
      imageResolution: {
        value: new THREE.Vector2(
          this.texture.image.naturalWidth,
          this.texture.image.naturalHeight
        )
      },
      isGlich: {
        value: false
      },
      time: { value: 0 }
    };

    const material = new THREE.RawShaderMaterial({
      uniforms: uniform,
      vertexShader: vert,
      fragmentShader: frag
    });

    this.obj = new THREE.Mesh(geometry, material);
    this.obj.name = this.id;

    this.obj.position.copy(this.position);
    this.obj.rotation.z = this.rotation;
    this.obj.scale.y = -1;
  }

  move(position, r) {
    this.position = position;
    this.rotation = r;
    this.obj.position.copy(this.position);
    this.obj.rotation.z = this.rotation;
  }

  hover() {
    if (this.opened) return;
    const uniform = this.obj.material.uniforms;
    uniform.isGlich.value = true;
    this.isTick = true;
    gsap.killTweensOf(this.obj.material.uniforms.time);
  }

  hoverOut() {
    const uniform = this.obj.material.uniforms;

    this.isTick = false;

    gsap.to(this.obj.material.uniforms.time, 0.5, {
      value: 0,
      ease: "expo.out",
      onComplete: () => {
        uniform.isGlich.value = false;
      }
    });
  }

  tick() {
    if (!this.isTick) return;

    this.obj.material.uniforms.time.value += 0.01;
  }

  close(delay) {
    this.hoverOut();
    this.opened = true;

    const size = {
      t: 0,
      ...this.size
    };
    gsap.to(size, 0.5, {
      t: 1,
      delay: delay * 0.05,
      ease: "expo.out",
      onUpdate: () => {
        const xy1 = [-size.w * 0.5, -size.h * 0.5, 1.0];
        const xy2 = [size.w * 0.5 - size.t * size.w, -size.h * 0.5, 1.0];
        const xy3 = [size.w * 0.5 - size.t * size.w, size.h * 0.5, 1.0];
        const xy4 = [-size.w * 0.5, size.h * 0.5, 1.0];
        const vertices = new Float32Array([
          ...xy1,
          ...xy2,
          ...xy3,
          ...xy3,
          ...xy4,
          ...xy1
        ]);

        this.obj.geometry.setAttribute(
          "position",
          new THREE.BufferAttribute(vertices, 3)
        );

        this.obj.material.uniforms.resolution.value.x =
          size.w - size.w * size.t;
        this.obj.material.uniforms.resolution.value.y = size.h;
      }
    });
  }

  open() {}
}
