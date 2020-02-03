import { decorate, observable } from "mobx";

class ModalStore {
  title = "Code";
  display = false;

  toggleDisplay = () => {
    this.display = !this.display;
  };
}

decorate(ModalStore, {
  title: observable,
  display: observable
});

export default new ModalStore();
