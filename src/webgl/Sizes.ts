import Experience from "./Experience.ts";

export default class Sizes {
  experience: Experience;
  width: number;
  height: number;
  pixelRatio: number;
  interfaceContainer: any;
  interfaceContainerWidth = 0;
  interfaceContainerHeightMobile = 0;

  constructor() {
    this.experience = new Experience();

    // Sizes of the webGL
    this.width = this.experience.webGLContainer.clientWidth;
    this.height = this.experience.webGLContainer.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Sizes of the interface
    this.interfaceContainer = document.querySelector(".interfacecontainer");
    if (this.interfaceContainer) {
      this.interfaceContainerWidth = this.interfaceContainer.clientWidth;
      this.interfaceContainerHeightMobile = this.interfaceContainerWidth + 200;
    }

    this.sizesUpdate();
  }

  sizesUpdate = () => {
    this.width = this.experience.webGLContainer.clientWidth;
    this.height = this.experience.webGLContainer.clientHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Update webGL sizes with interface
    if (this.interfaceContainer) {
      // Horizontal viewport
      if (this.width > this.height) {
        this.width =
          this.experience.webGLContainer.clientWidth -
          this.interfaceContainerWidth;
        this.height = this.experience.webGLContainer.clientHeight;

        this.interfaceContainer.style.top = "0px";
        this.interfaceContainer.style.height = `${this.experience.webGLContainer.clientHeight}px`;
        this.interfaceContainer.style.width = `${this.interfaceContainerWidth}px`;
      }
      // Vertical viewport
      else {
        this.width = this.experience.webGLContainer.clientWidth;
        this.height = this.experience.webGLContainer.clientWidth;

        this.interfaceContainer.style.top = `${this.height}px`;
        this.interfaceContainer.style.height = `${this.interfaceContainerHeightMobile}px`;
        this.interfaceContainer.style.width = `${this.experience.webGLContainer.clientWidth}px`;
      }
    }
  };
}
