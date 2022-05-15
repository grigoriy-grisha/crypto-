export default class GridStepGenerator {
  constructor(length, stepPercent = 0.1) {
    this.stepInPercent = 100 * stepPercent;
    this.length = length;
    this.countOfStepElements = length * stepPercent;
    this.stepArr = [0];
    this.stepMap = this.generateStepsMap();

    this.tempalteArray = new Array(length)
      .fill(null)
      .map((_, index) => ({ index, filled: false }));

    this.generateSteps();
  }

  generateSteps() {
    Object.keys(this.stepMap).forEach((key) => {
      this.stepMap[key] = this.generateStep(this.getNotFilledIndexes());
    });
  }

  getNotFilledIndexes() {
    return this.tempalteArray.filter(this.isFilled);
  }

  generateStep(notFilledIndexes) {
    return new Array(this.countOfStepElements).fill(null).map(() => {
      const randomElement = getRandomArrayElement(notFilledIndexes);
      randomElement.filled = true;
      return randomElement;
    });
  }

  isFilled(element) {
    return !element.filled;
  }

  generateStepsMap() {
    const stepMap = { 0: [] };
    let currentStep = this.stepInPercent;

    while (currentStep < 100) {
      stepMap[currentStep] = [];
      this.stepArr.push(currentStep);
      currentStep += this.stepInPercent;
    }

    return stepMap;
  }

  getNearestStep(percent) {
    return findNearestElement(this.stepArr, percent);
  }
}

function getRandomArrayElement(arr) {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

function findNearestElement(arr, goal) {
  return arr.reduce((prev, curr) => {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  });
}
