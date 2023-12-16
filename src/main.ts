const lightTopLeftElement = document.getElementById("licht_oben_links")
const lightTopRightElement = document.getElementById("licht_oben_rechts")
const lightMiddleElement = document.getElementById("licht_mitte")
const lightBottomLeftElement = document.getElementById("licht_unten_links")
const lightBottomRightElement = document.getElementById("licht_unten_rechts")
const lightBarTopElement = document.getElementById("lichtbalken_oben")
const lightBarBottomElement = document.getElementById("lichtbalken_unten")

class Cycle {
  constructor(element, color) {
    this.cycleState = 1
    this.element = element
    this.color = color
  }

  cycle() {
    console.log(this.cycleState)

    if (this.cycleState == 0) {
      this.element.style.fill = "#3f3f3f"
      this.cycleState = 1
    } else {
      this.element.style.fill = this.color
      this.cycleState = 0
    }
  }

  get state() {
    return this.cycleState
  }
}

class CycleBlink extends Cycle {
  // only "yellow" and "green" are valid
  constructor(element, color) {
    super(element, color)
  }

  cycle() {
    console.log(this.cycleState)

    if (this.cycleState == 0) {
      this.element.classList.remove(this.color + "-blink")
      this.element.style.fill = "#3f3f3f"
      this.cycleState = 1
    } else if (this.cycleState == 1) {
      this.element.style.fill = this.color
      this.cycleState = 2
    } else {
      this.element.style.fill = "#3f3f3f"
      this.element.classList.add(this.color + "-blink")
      this.cycleState = 0
    }
  }
}

const lightTopLeft = new CycleBlink(lightTopLeftElement, "yellow")
lightTopLeftElement.addEventListener("click", function () { lightTopLeft.cycle() })

const lightTopRight = new CycleBlink(lightTopRightElement, "green")
lightTopRightElement.addEventListener("click", function () { lightTopRight.cycle() })

const lightMiddle = new Cycle(lightMiddleElement, "red")
lightMiddleElement.addEventListener("click", function () { lightMiddle.cycle() })

const lightBottomLeft = new Cycle(lightBottomLeftElement, "yellow")
lightBottomLeftElement.addEventListener("click", function () { lightBottomLeft.cycle() })

const lightBottomRight = new Cycle(lightBottomRightElement, "red")
lightBottomRightElement.addEventListener("click", function () { lightBottomRight.cycle() })

const lightBarTop = new Cycle(lightBarTopElement, "yellow")
lightBarTopElement.addEventListener("click", function () { lightBarTop.cycle() })

const lightBarBottom = new Cycle(lightBarBottomElement, "green")
lightBarBottomElement.addEventListener("click", function () { lightBarBottom.cycle() })
