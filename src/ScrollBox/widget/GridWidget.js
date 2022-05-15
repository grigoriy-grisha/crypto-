import GridStepGenerator from  './GridStepGenerator'

export default class GridWidget {
  constructor(gridItems) {
    this.gridStepGenerator = new GridStepGenerator(gridItems.length);
    this.gridItems = gridItems;
    this.gridItems.forEach((element) => {
      element.style.opacity = 0;
    })
  }

  onProgress = (progress, direction) => {
    const step = this.gridStepGenerator.getNearestStep(progress);

    if (step === 0) {
      this.gridItems.forEach((element) => {
        element.style.opacity = 0;
      })
    }
    this.gridStepGenerator.stepMap[step].forEach(({ index }) => {
      if (direction === "DOWN") {
        this.gridItems[index].style.opacity = 1;
      } else {
        this.gridItems[index].style.opacity = 0;
      }
    });
  }
}
