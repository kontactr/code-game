import { decorate, observable } from "mobx";
import AllImages from "../Images";

class CanvasStore {
  images = [];

  constructor() {
    this.loadAllImages();
  }

  loadAllImages = () => {
    let imageKeys = Object.keys(AllImages) || [];
    this.images = Promise.all(
      imageKeys.map(
        image =>
          new Promise((resolve, reject) => {
            return this.generateImageTag(AllImages[image], resolve, reject);
          })
      )
    ).then(arrayImageLoaded => {
      let newObject = {};
      (imageKeys || []).forEach((key, index) => {
        newObject[key] = arrayImageLoaded[index];
      });
      return newObject;
    });
  };

  generateImageTag = (src, successCallBack, errorCallBack) => {
    if (src) {
      let image = document.createElement("img");

      image.setAttribute("src", src);

      image.onload = () => {
        successCallBack(image);
      };
      image.onerror = errorCallBack;
      return image;
    } else {
      errorCallBack();
    }
  };
}

decorate(CanvasStore, {
  images: observable
});

export default new CanvasStore();
