import {
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  DoubleSide,
  BufferAttribute,
  RawShaderMaterial,
  InstancedBufferGeometry,
  InstancedBufferAttribute,
} from "three";
import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
import vs from "./shader.vert";
import fs from "./shader.frag";
const size = 10;
const u = 13;
const margin = 10;
const num = u * u * u;

export default class Plane extends Mesh {
  constructor() {
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
    const id = new InstancedBufferAttribute(new Float32Array(num * 1), 1);
    const ids = [];
    //3 x 3 x 3
    [...Array(num)].forEach((_, i) => {
      const z = Math.floor(i / (u * u)) - Math.floor(u * 0.5);
      const y = (Math.floor(i / u) % u) - Math.floor(u * 0.5);
      const x = i - Math.floor(i / u) * u - Math.floor(u * 0.5);

      offsetPos.setXYZ(
        i,
        x * (size + margin),
        y * (size + margin),
        z * (size + margin)
      );
      offsetPos2.setXYZ(i, 0, 0, 0);
      ids.push(i);
      // id.setX(i, i);
    });

    ids.sort(() => Math.random() - 0.5).forEach((u, i) => id.setX(i, u));

    g.setAttribute("offsetPos", offsetPos);
    g.setAttribute("offsetPos2", offsetPos2);
    g.setAttribute("id", id);

    console.log(g);
    const m = new RawShaderMaterial({
      fragmentShader: fs,
      vertexShader: vs,
      uniforms: {
        uTime: {
          value: 0,
        },
      },
      side: DoubleSide,
    });
    super(g, m);

    this.frustumCulled = true;
  }

  update(t) {
    this.rotation.y = t * 0.01;
    // this.material.uniforms.uTime.value = (t * 0.05) % num;
  }
}
