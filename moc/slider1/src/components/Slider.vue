<template>
  <div class="canvas" ref="canvas" v-on:click="gl.onClick()">
    <div class="btns">
      <div class="btn prev" v-on:click="onClick(true)">prev</div>
      <div class="btn next" v-on:click="onClick(false)">next</div>
    </div>
  </div>
</template>

<script>
import GL from "./gl/";
// import VirtualScroll from "virtual-scroll";

export default {
  name: "Slider",
  beforeCreate() {},
  mounted() {
    this.gl = new GL(this.$refs.canvas);
    this.frame = window.requestAnimationFrame(this.tick.bind(this));
    this.$refs.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    this.$refs.canvas.addEventListener("resize", this.resize.bind(this));
  },
  beforeUnmount() {
    this.$refs.canvas.removeEventListener("resize", this.resize.bind(this));
    this.$refs.canvas.removeEventListener(
      "mousemove",
      this.mouseMove.bind(this)
    );
    if (this.frame) cancelAnimationFrame(this.frame);
    console.clear();
  },
  methods: {
    tick() {
      this.gl.render();
      this.frame = window.requestAnimationFrame(this.tick.bind(this));
    },
    resize() {
      this.gl.onResize();
    },
    onClick(isPrev) {
      this.gl.onMove(isPrev);
    },
    mouseMove({ clientX, clientY, currentTarget }) {
      const element = currentTarget;
      const x = clientX - element.offsetLeft;
      const y = clientY - element.offsetTop;
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      this.gl.onMouseMove((x / w) * 2 - 1, -(y / h) * 2 + 1);
    }
  }
};
</script>

<style lang="scss">
.canvas {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.btns {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: center;
  .btn + .btn {
    margin-left: 100px;
  }
  .btn {
    cursor: pointer;
    padding: 10px;
    user-select: none;
  }
}
</style>
