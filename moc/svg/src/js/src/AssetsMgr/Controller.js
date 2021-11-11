//--------------------------------------------------
//
//  LoadMgr
//
//--------------------------------------------------

import THREELoader from "./WebGL/THREELoader";

export default class LoadMgr {
  constructor() {
    this.isFirst = true;

    this.setup();
  }

  setup() {}

  async load() {
    const data = await THREELoader.loadSVG("./assets/resource/svg/ykokmr.svg");
    return data;
  }

  setupLoad() {}
}
