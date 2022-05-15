export default class ScrollableBox {
  constructor(section, fixedContent, cubes, height) {
    this.scrollPosition = 0;
    this.section = section;
    this.fixedContent = fixedContent;
    this.cubes = cubes
    this.height = height;
    this.contentIsInteresting = false;



  }

  run() {


    document.addEventListener("scroll", () => {
      this.section.style.minHeight = `${ this.height }px`;
      const progress = this.invertSign(this.computeProgress());

      if (!this.isInteresting(progress)) {
        if (!this.contentIsInteresting) return;
        this.contentIsInteresting = false;
        this.fixedContent.style.position = "static";
        this.section.style.visibility = "visible";
        return;
      }

      this.progressListener &&
      this.progressListener(progress, this.getScrollDirection());

      if (this.contentIsInteresting) return;
      this.contentIsInteresting = true;
      this.fixedContent.style.position = "fixed";
      this.fixedContent.style.top = "0px";
    });
  }

  onProgress(progressListener) {
    this.progressListener = progressListener;
  }

  computeProgress() {
    return (this.section.getBoundingClientRect().y / this.height) * 100;
  }

  invertSign(number) {
    return -1 * number;
  }

  isInteresting(progress) {
    return progress >= 0 && progress < 100;
  }

  getScrollDirection() {
    const scrollTop = this.getSageScrollTop();
    if (scrollTop > this.scrollPosition) {
      this.scrollPosition = scrollTop;
      return "DOWN";
    }

    this.scrollPosition = scrollTop;
    return "TOP";
  }

  getSageScrollTop() {
    return (
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
}
