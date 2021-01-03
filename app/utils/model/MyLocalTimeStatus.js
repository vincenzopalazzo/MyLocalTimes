'use strict';

//TODO to implement the panel setting you need to develop this class
//this class should be access in all point of the app
//Why don't use an DI framework? exist with JS?
class MyLocalTimeStatus {
  constructor(config) {
    this.config = config;
  }

  setConfig(config) {
    //merge two object
    this.config = Object.assign({}, this.config, config);
  }

  getConfig() {
    return this.config;
  }
}

export default MyLocalTimeStatus;
