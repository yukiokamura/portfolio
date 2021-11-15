import {
  Mesh,
  BoxGeometry,
  DoubleSide,
  RawShaderMaterial,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
} from "three";
import gsap from "gsap";
import vs from "./shader.vert";
import fs from "./shader.frag";
const lerp = (a, b, t) => a + (b - a) * t;
const size = 10;
const u = 15;
const margin = 2;
// const num = u * u * u;

export default class Plane extends Mesh {
  constructor(_num) {
    const num = _num * _num * _num;
    const originBox = new BoxGeometry(size, size, size);
    const g = new InstancedBufferGeometry();
    g.index = originBox.index;
    g.attributes = originBox.attributes;

    const offsetPos = new InstancedBufferAttribute(
      new Float32Array(num * 3),
      3
    );
    const offsetPos2 = new InstancedBufferAttribute(
      new Float32Array(num * 3),
      3
    );

    const offsetPos3 = new InstancedBufferAttribute(
      new Float32Array(num * 3),
      3
    );
    const offsetPos4 = new InstancedBufferAttribute(
      new Float32Array(num * 3),
      3
    );

    const id = new InstancedBufferAttribute(new Float32Array(num * 1), 1);
    const ids = [];
    //3 x 3 x 3
    [...Array(num)].forEach((_, i) => {
      const z = Math.floor(i / (u * u)) - Math.floor(u * 0.5);
      const y = (Math.floor(i / u) % u) - Math.floor(u * 0.5);
      const x = i - Math.floor(i / u) * u - Math.floor(u * 0.5);
      const x2 = (i / num) * 2 - 1;

      offsetPos.setXYZ(i, x, y, z);
      offsetPos2.setXYZ(i, 0, 0, 0);
      offsetPos3.setXYZ(i, x2, 0, 0);
      offsetPos4.setXYZ(
        i,
        Math.sin((i / num) * Math.PI * 2),
        Math.cos((i / num) * Math.PI * 2),
        Math.sin((i / num) * Math.PI * 2)
      );
      ids.push(i);
      // id.setX(i, i);
    });

    ids.sort(() => Math.random() - 0.5).forEach((u, i) => id.setX(i, u));

    g.setAttribute("offsetPos", offsetPos);
    g.setAttribute("offsetPos2", offsetPos2);
    g.setAttribute("offsetPos3", offsetPos3);
    g.setAttribute("offsetPos4", offsetPos4);
    g.setAttribute("id", id);

    const m = new RawShaderMaterial({
      fragmentShader: fs,
      vertexShader: vs,
      uniforms: {
        uTime: {
          value: 0,
        },
        size: {
          value: size,
        },
        margin: {
          value: margin,
        },
        pattern: {
          value: 0.0,
        },
      },
      side: DoubleSide,
    });
    super(g, m);

    this.frustumCulled = true;
    this.speed = {
      x: 0.01,
      y: 0.01,
      z: 0.01,
    };
    this.m = 0;
    this.num = num;
    this.rotationAni();
  }

  update(t) {
    const pattern = this.material.uniforms.pattern.value;
    if (pattern == 0.0) {
      this.rotation.y = t * this.speed.y;
      this.rotation.x = t * this.speed.x;
      this.rotation.z = t * this.speed.z;
      this.m = lerp(this.m, (Math.sin(t * 0.01) + 1) * 0.5 * 90 + 10, 0.01);
      this.material.uniforms.margin.value = this.m;
    } else if (pattern > 0.0 && pattern <= 1) {
      this.m = lerp(
        this.m,
        (Math.sin(t * 0.01) + 1) * 0.5 * window.innerWidth * 0.5 * pattern,
        0.01
      );
      this.material.uniforms.margin.value = this.m;
    } else if (pattern > 1) {
      this.m = lerp(
        this.m,
        (Math.sin(t * 0.01) + 1) *
          0.5 *
          window.innerWidth *
          0.2 *
          (pattern - 1),
        0.01
      );
      this.material.uniforms.margin.value = this.m;
    }

    this.material.uniforms.uTime.value = (t * 0.01) % this.num;
  }

  rotationAni() {
    this.tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 3,
    });
    this.tl
      .to(this.speed, 1, {
        z: 0.0101,
        y: 0.0101,
        ease: "expo.out",
      })
      .to(this.speed, 3, {
        z: 0.01,
        y: 0.01,
        ease: "power2.in",
      });
  }

  destroy() {
    this.tl.kill();
  }

  changePage(key) {
    const nums = {
      top: 0,
      works: 1,
      contact: 2,
    };
    const num = nums[key];
    gsap.to(this.material.uniforms.pattern, 1, {
      value: num,
      ease: "expo.out",
    });
  }
}
