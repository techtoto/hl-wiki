import signalStates from "./signals.json" assert { type: "json" }

enum State {
  Off,
  On,
  Blinking
}

type SignalColor = "red" | "yellow" | "green"

interface Signal {
  name: string,
  lamps: number[],
  description: string
}

const output: HTMLElement = document.getElementById("output")!

class Cycle {
  state: State
  element: HTMLElement
  color: SignalColor

  constructor(element: HTMLElement, color: SignalColor) {
    this.state = State.Off
    this.element = element
    this.color = color

    this.element.addEventListener("click", () => {
      this.cycle()
      decodeSignal()
    })
  }

  cycle() {
    if (this.state === State.Off) {
      this.element.style.fill = this.color
      this.state = State.On
    } else {
      this.element.style.fill = "#3f3f3f"
      this.state = State.Off
    }
  }
}

class CycleBlink extends Cycle {
  constructor(element: HTMLElement, color: "yellow" | "green") {
    super(element, color)
  }

  cycle() {
    if (this.state === State.Blinking) {
      this.element.classList.remove(this.color + "-blink")
      this.element.style.fill = "#3f3f3f"
      this.state = State.Off
    } else if (this.state === State.Off) {
      this.element.style.fill = this.color
      this.state = State.On
    } else {
      this.element.style.fill = "#3f3f3f"
      this.element.classList.add(this.color + "-blink")
      this.state = State.Blinking
    }
  }
}

const lights = {
  lightTopLeft: new CycleBlink(document.getElementById("licht_oben_links")!, "yellow"),
  lightTopRight: new CycleBlink(document.getElementById("licht_oben_rechts")!, "green"),
  lightMiddle: new Cycle(document.getElementById("licht_mitte")!, "red"),
  lightBottomLeft: new Cycle(document.getElementById("licht_unten_links")!, "yellow"),
  lightBottomRight: new Cycle(document.getElementById("licht_unten_rechts")!, "red"),
  lightBarTop: new Cycle(document.getElementById("lichtbalken_oben")!, "yellow"),
  lightBarBottom: new Cycle(document.getElementById("lichtbalken_unten")!, "green")
}


function getSignal(): Signal | undefined {
  for (const entry of signalStates) {
    if (lights.lightTopLeft.state === entry.lamps[0]
      && lights.lightTopRight.state === entry.lamps[1]
      && lights.lightMiddle.state === entry.lamps[2]
      && lights.lightBottomLeft.state === entry.lamps[3]
      && lights.lightBottomRight.state === entry.lamps[4]
      && lights.lightBarTop.state === entry.lamps[5]
      && lights.lightBarBottom.state === entry.lamps[6]) {
        return entry
      }
  }
}

function decodeSignal() {
  const currentSignal = getSignal()

  if (currentSignal !== undefined) {
    output.textContent = currentSignal.name + " - " + currentSignal.description
  } else {
    output.textContent = "Kein valides Signalbild!"
  }
}
