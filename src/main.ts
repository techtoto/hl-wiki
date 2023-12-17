enum State {
  Off,
  On,
  Blinking
}

const output: HTMLElement = document.getElementById("output")!

class Cycle {
  state: State
  element: HTMLElement
  color: string

  constructor(element: HTMLElement, color: string) {
    this.state = State.Off
    this.element = element
    this.color = color

    this.element.addEventListener("click", () => {
      this.cycle()
      decodeSignal()
    })
  }

  cycle() {
    if (this.state == State.Off) {
      this.element.style.fill = this.color
      this.state = State.On
    } else {
      this.element.style.fill = "#3f3f3f"
      this.state = State.Off
    }
  }
}

class CycleBlink extends Cycle {
  // only "yellow" and "green" are valid
  constructor(element, color) {
    super(element, color)
  }

  cycle() {
    if (this.state == State.Blinking) {
      this.element.classList.remove(this.color + "-blink")
      this.element.style.fill = "#3f3f3f"
      this.state = State.Off
    } else if (this.state == State.Off) {
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

const signalStates = new Map<string, State[]>([
  // Hp 0 - Halt.
  ["hp01", [State.Off, State.Off, State.On, State.Off, State.Off, State.Off, State.Off]],

  // Hp 0 - Halt. (Ersatzrot)
  ["hp02", [State.Off, State.Off, State.Off, State.Off, State.On, State.Off, State.Off]],

  // Hl 1 - Fahrt mit Höchstgeschwindigkeit.
  ["hl1", [State.Off, State.On, State.Off, State.Off, State.Off, State.Off, State.Off]],

  // Hl 2 - Fahrt mit 100 km/h, dann mit Höchstgeschwindigkeit.
  ["hl2", [State.Off, State.On, State.Off, State.On, State.Off, State.Off, State.On]],

  // Hl 3a - Fahrt mit 40 km/h, dann mit Höchstgeschwindigkeit.
  ["hl3a", [State.Off, State.On, State.Off, State.On, State.Off, State.Off, State.Off]],

  // Hl 3b - Fahrt mit 60 km/h, dann mit Höchstgeschwindigkeit.
  ["hl3b", [State.Off, State.On, State.Off, State.On, State.Off, State.On, State.Off]],

  // Hl 4 - Höchstgeschwindigkeit auf 100 km/h ermäßigen.
  ["hl4", [State.Off, State.Blinking, State.Off, State.Off, State.Off, State.Off, State.Off]],

  // Hl 5 - Fahrt mit 100 km/h.
  ["hl5", [State.Off, State.Blinking, State.Off, State.On, State.Off, State.Off, State.On]],

  // Hl 6a - Fahrt mit 40 km/h, dann mit 100 km/h.
  ["hl6a", [State.Off, State.Blinking, State.Off, State.On, State.Off, State.Off, State.Off]],

  // Hl 6b - Fahrt mit 60 km/h, dann mit 100 km/h.
  ["hl6b", [State.Off, State.Blinking, State.Off, State.On, State.Off, State.On, State.Off]],

  // Hl 7 - Höchstgeschwindigkeit auf 40 km/h (60 km/h) ermäßigen.
  ["hl7", [State.Blinking, State.Off, State.Off, State.Off, State.Off, State.Off, State.Off]],

  // Hl 8 - Geschwindigkeit 100 km/h auf 40 km/h (60 km/h) ermäßigen.
  ["hl8", [State.Blinking, State.Off, State.Off, State.On, State.Off, State.Off, State.On]],

  // Hl 9a - Fahrt mit 40 km/h, dann mit 40 km/h (60 km/h).
  ["hl9a", [State.Blinking, State.Off, State.Off, State.On, State.Off, State.Off, State.Off]],

  // Hl 9b - Fahrt mit 60 km/h, dann mit 40 km/h (60 km/h).
  ["hl9b", [State.Blinking, State.Off, State.Off, State.On, State.Off, State.On, State.Off]],

  // Hl 10 - „Halt“ erwarten.
  ["hl10", [State.On, State.Off, State.Off, State.Off, State.Off, State.Off, State.Off]],

  // Hl 11 - Geschwindigkeit 100 km/h ermäßigen, „Halt“ erwarten.
  ["hl11", [State.On, State.Off, State.Off, State.On, State.Off, State.Off, State.On]],

  // Hl 12a - Geschwindigkeit 40 km/h ermäßigen, „Halt“ erwarten.
  ["hl12a", [State.On, State.Off, State.Off, State.On, State.Off, State.Off, State.Off]],

  // Hl 12b - Geschwindigkeit 60 km/h ermäßigen, „Halt“ erwarten.
  ["hl12b", [State.On, State.Off, State.Off, State.On, State.Off, State.Off, State.On]]
])


function isSignalState(state: string): boolean {
  return lights.lightTopLeft.state == signalStates.get(state)![0]
    && lights.lightTopRight.state == signalStates.get(state)![1]
    && lights.lightMiddle.state == signalStates.get(state)![2]
    && lights.lightBottomLeft.state == signalStates.get(state)![3]
    && lights.lightBottomRight.state == signalStates.get(state)![4]
    && lights.lightBarTop.state == signalStates.get(state)![5]
    && lights.lightBarBottom.state == signalStates.get(state)![6]
}

function getSignalState(): string {
  let signalState: string = "none"
  signalStates.forEach((value, key) => {
    if (isSignalState(key)) signalState = key
  })
  return signalState
}

function decodeSignal() {
  let signal = getSignalState()

  console.log(signal)

  switch (signal) {
    case "hp01":
      output.innerText = "Hp 0 - Halt."
      break
    case "hp02":
      output.innerText = "Hp 0 - Halt. (Ersatzrot)"
      break
    case "hl1":
      output.innerText = "Hl 1 - Fahrt mit Höchstgeschwindigkeit."
      break
    case "hl2":
      output.innerText = "Hl 2 - Fahrt mit 100 km/h, dann mit Höchstgeschwindigkeit."
      break
    case "hl3a":
      output.innerText = "Hl 3a - Fahrt mit 40 km/h, dann mit Höchstgeschwindigkeit."
      break
    case "hl3b":
      output.innerText = "Hl 3b - Fahrt mit 60 km/h, dann mit Höchstgeschwindigkeit."
      break
    case "hl4":
      output.innerText = "Hl 4 - Höchstgeschwindigkeit auf 100 km/h ermäßigen."
      break
    case "hl5":
      output.innerText = "Hl 5 - Fahrt mit 100 km/h."
      break
    case "hl6a":
      output.innerText = "Hl 6a - Fahrt mit 40 km/h, dann mit 100 km/h."
      break
    case "hl6b":
      output.innerText = "Hl 6b - Fahrt mit 60 km/h, dann mit 100 km/h."
      break
    case "hl7":
      output.innerText = "Hl 7 - Höchstgeschwindigkeit auf 40 km/h (60 km/h) ermäßigen."
      break
    case "hl8":
      output.innerText = "Hl 8 - Geschwindigkeit 100 km/h auf 40 km/h (60 km/h) ermäßigen."
      break
    case "hl9a":
      output.innerText = "Hl 9a - Fahrt mit 40 km/h, dann mit 40 km/h (60 km/h)."
      break
    case "hl9b":
      output.innerText = "Hl 9b - Fahrt mit 60 km/h, dann mit 40 km/h (60 km/h)."
      break
    case "hl10":
      output.innerText = "Hl 10 - „Halt“ erwarten."
      break
    case "hl11":
      output.innerText = "Hl 11 - Geschwindigkeit 100 km/h ermäßigen, „Halt“ erwarten."
      break
    case "hl12a":
      output.innerText = "Hl 12a - Geschwindigkeit 40 km/h ermäßigen, „Halt“ erwarten."
      break
    case "hl12b":
      output.innerText = "Hl 12b - Geschwindigkeit 60 km/h ermäßigen, „Halt“ erwarten."
      break
    default:
      output.innerText = "Kein valides Signalbild!"
  }
}
