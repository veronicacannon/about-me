const powerbar = {
  state: "pending",  // "charging" | "pending" | "discharging"
  chargedPercentage: 0,
  fillElem: document.querySelector("#powerbar-fill"),
}

const ball = {
  cy: 97,
  elem: document.querySelector("#ball"),
}

// when mouse is pressed, change the state
window.addEventListener('pointerdown', () => { powerbar.state = "charging" })
// increase chargedPercentage
// when mouse is released, change the state
window.addEventListener('pointerup', () => { powerbar.state = "discharging" })

function updateChargedPercentage() {
  if (powerbar.state == "pending") {
    ball.cy = 97;
    powerbar.chargedPercentage = 0;
    return }

  if (powerbar.state == "charging") {
    if (powerbar.chargedPercentage >= 97) {
      powerbar.state == "discharging"
      return
    }
    powerbar.chargedPercentage += 0.5;
  }
  else if (powerbar.state == "discharging") {
    if (powerbar.chargedPercentage <= 3) {
      powerbar.state = "pending"
      return
    }
    powerbar.chargedPercentage -= 0.5;
  }
}

function updateBallPosition() {
  if (powerbar.state == "pending") { return }
  if (powerbar.state == "discharging") {
    ball.cy += 0.5;
  }
  if (powerbar.state == "charging") {
    ball.cy -= 0.5;
  }
}

function renderBall() {
  ball.elem.style.top = `${ball.cy}%`
}

function renderPowerBar() {
  powerbar.fillElem.style.width = `${powerbar.chargedPercentage}%`
}

// this runs every 1/60th of a second
function gameloop() {
  updateChargedPercentage()
  updateBallPosition()
  renderPowerBar()
  renderBall()
  requestAnimationFrame(gameloop)
}

gameloop()