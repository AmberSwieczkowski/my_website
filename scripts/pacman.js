const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const scoreEl = document.querySelector('#scoreElement')

canvas.width = innerWidth / 6.4
canvas.height = innerHeight - 180

class Boundary {
    static width = 40;
    static height = 40;
    constructor({ position, image }) {
        this.position = position;
        this.width = 40;
        this.height = 40;
        this.image = image
    }

    draw() {
        // c.fillStyle = 'blue'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class Pacman {
    constructor({ position, velocity }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.radians = 0.75;
        this.openRate = 0.12;
        this.rotation = 0;
    }

    draw() {
        c.save()
        c.translate(this.position.x, this.position.y) // Moves canvas from top left of screen to center of pacman to allow for rotation from center of player
        c.rotate(this.rotation)
        c.translate(-this.position.x, -this.position.y) // Moves canvas from center of pacman top to left of screen for rotation

        c.beginPath()
        c.arc(
            this.position.x,
            this.position.y,
            this.radius,
            this.radians,
            Math.PI * 2 - this.radians)
        c.lineTo(this.position.x, this.position.y)
        c.fillStyle = 'yellow'
        c.fill()
        c.closePath()
        c.restore()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.radians < 0 || this.radians > 0.75) {
            this.openRate = -this.openRate
        }

        this.radians += this.openRate
    }
}
class Ghost {
    static speed = 2
    constructor({ position, velocity, color = 'red' }) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 15;
        this.color = color
        this.prevCollisions = []
        this.speed = 2
        this.scared = false
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = this.scared ? 'blue' : this.color
        c.fill()
        c.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

class Pellet {
    constructor({ position }) {
        this.position = position;
        this.radius = 3;
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

class PowerUps {
    constructor({ position }) {
        this.position = position;
        this.radius = 8;
    }

    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = 'white'
        c.fill()
        c.closePath()
    }
}

const pellets = []
const boundaries = []
const powerUps = []
const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 3 + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }, color: 'aqua'
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 5 + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }, color: 'orange'
    }),
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height * 9 + Boundary.height / 2
        },
        velocity: {
            x: Ghost.speed,
            y: 0
        }, color: 'pink'
    }),
]
const player = new Pacman({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    }, velocity: {
        x: 0,
        y: 0
    }
})
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
}

let lastKey = ''

let score = 0

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
]

function createImage(src) {
    const image = new Image()
    image.src = src
    return image
}


map.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
        switch (symbol) {
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeHorizontal.png')
                    })
                )
                break
            case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeVertical.png')
                    })
                )
                break
            case '1':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeCorner1.png')
                    })
                )
                break
            case '2':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeCorner2.png')
                    })
                )
                break
            case '3':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeCorner3.png')
                    })
                )
                break
            case '4':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/pipeCorner4.png')
                    })
                )
                break
            case 'b':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: Boundary.height * rowIndex
                        },
                        image: createImage('../images/pacman/block.png')
                    })
                )
                break
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/capLeft.png')
                    })
                )
                break
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/capRight.png')
                    })
                )
                break
            case '_':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/capBottom.png')
                    })
                )
                break
            case '^':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/capTop.png')
                    })
                )
                break
            case '+':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/pipeCross.png')
                    })
                )
                break
            case '5':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('../images/pacman/pipeConnectorTop.png')
                    })
                )
                break
            case '6':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('../images/pacman/pipeConnectorRight.png')
                    })
                )
                break
            case '7':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        color: 'blue',
                        image: createImage('../images/pacman/pipeConnectorBottom.png')
                    })
                )
                break
            case '8':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * columnIndex,
                            y: rowIndex * Boundary.height
                        },
                        image: createImage('../images/pacman/pipeConnectorLeft.png')
                    })
                )
                break
            case '.':
                pellets.push(
                    new Pellet({
                        position: {
                            x: Boundary.width * columnIndex + Boundary.width / 2,
                            y: rowIndex * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break
            case 'p':
                powerUps.push(
                    new PowerUps({
                        position: {
                            x: Boundary.width * columnIndex + Boundary.width / 2,
                            y: rowIndex * Boundary.height + Boundary.height / 2
                        }
                    })
                )
                break
        }
    })
})

function circleCollidesWithRectangle({
    circle,
    rectangle
}) {
    const padding = Boundary.width / 2 - circle.radius - 1
    return (
        circle.position.y - circle.radius + circle.velocity.y
        <=
        rectangle.position.y + rectangle.height + padding
        &&
        circle.position.x + circle.radius + circle.velocity.x
        >=
        rectangle.position.x - padding
        &&
        circle.position.y + circle.radius + circle.velocity.y
        >=
        rectangle.position.y - padding
        &&
        circle.position.x - circle.radius + circle.velocity.x
        <=
        rectangle.position.x + rectangle.width + padding
    )
}

let animationId
function animate() {
    // Draws player with infinite loop
    animationId = requestAnimationFrame(animate)
    // Deletes previous drawings so that there is not a yellow path following pacman
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (keys.ArrowUp.pressed && lastKey === 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: -5
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = -5
            }
        }
    } else if (keys.ArrowDown.pressed && lastKey === 'ArrowDown') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 0,
                        y: 5
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.y = 0
                break
            } else {
                player.velocity.y = 5
            }
        }
    } else if (keys.ArrowLeft.pressed && lastKey === 'ArrowLeft') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: -5,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = -5
            }
        }
    } else if (keys.ArrowRight.pressed && lastKey === 'ArrowRight') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (circleCollidesWithRectangle({
                circle: {
                    ...player, velocity: {
                        x: 5,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                player.velocity.x = 0
                break
            } else {
                player.velocity.x = 5
            }
        }
    }

    // Detect Collision Between Ghosts and Player
    // for (let ghostsIndex = ghosts.length - 1; ghostsIndex >= 0; ghostsIndex--) {
    //     const ghost = ghosts[ghostsIndex]

    //     // Ghost Touches Player
    //     if (
    //         Math.hypot(
    //             ghost.position.x - player.position.x,
    //             ghost.position.y - player.position.y
    //         ) <
    //         ghost.radius + player.radius
    //     ) {

    //         if (ghost.scared) {
    //             ghosts.splice(ghostsIndex, 1)
    //         } else {
    //             cancelAnimationFrame(animationId)
    //             alert('You Lose')
    //         }
    //     }
    // }

    // Win Condition
    if (pellets.length === 0) {
        alert('You Win')
        cancelAnimationFrame(animationId)
    }

    // Draw Power Ups
    for (let powerUpsIndex = powerUps.length - 1; powerUpsIndex >= 0; powerUpsIndex--) {
        const powerUp = powerUps[powerUpsIndex]
        powerUp.draw()

        // Player Collides with PowerUp
        if (
            Math.hypot(
                powerUp.position.x - player.position.x,
                powerUp.position.y - player.position.y
            ) <
            powerUp.radius + player.radius
        ) {
            powerUps.splice(powerUpsIndex, 1)

            // Make Ghosts Scared
            ghosts.forEach(ghost => {
                ghost.scared = true

                setTimeout(() => {
                    ghost.scared = false
                }, 5000)
            })
        }
    }

    // Draw and Touch Pellets
    for (let pelletIndex = pellets.length - 1; pelletIndex >= 0; pelletIndex--) {
        const pellet = pellets[pelletIndex]
        pellet.draw()

        if (
            Math.hypot(
                pellet.position.x - player.position.x,
                pellet.position.y - player.position.y
            ) <
            pellet.radius + player.radius
        ) {
            pellets.splice(pelletIndex, 1)
            score += 10
            scoreEl.innerHTML = score
        }
    }

    boundaries.forEach(boundary => {
        boundary.draw()

        // Collision Detection
        if (
            circleCollidesWithRectangle({
                circle: player,
                rectangle: boundary
            })
        ) {
            player.velocity.x = 0
            player.velocity.y = 0
        }
    })
    player.update()

    ghosts.forEach(ghost => {
        ghost.update()

        const collisions = []
        boundaries.forEach(boundary => {
            if (!collisions.includes('right') && circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                    velocity: {
                        x: ghost.speed,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('right')
            }

            if (!collisions.includes('left') && circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                    velocity: {
                        x: -ghost.speed,
                        y: 0
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('left')
            }

            if (!collisions.includes('up') && circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 0,
                        y: -ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('up')
            }

            if (!collisions.includes('down') && circleCollidesWithRectangle({
                circle: {
                    ...ghost,
                    velocity: {
                        x: 0,
                        y: ghost.speed
                    }
                },
                rectangle: boundary
            })
            ) {
                collisions.push('down')
            }
        })
        if (collisions.length > ghost.prevCollisions.length)
            ghost.prevCollisions = collisions

        if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollisions)) {
            if (ghost.velocity.x > 0) ghost.prevCollisions.push('right')
            else if (ghost.velocity.x < 0) ghost.prevCollisions.push('left')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('up')
            else if (ghost.velocity.y > 0) ghost.prevCollisions.push('down')

            const pathways = ghost.prevCollisions.filter(collision => {
                return !collisions.includes(collision)
            })

            const direction = pathways[Math.floor(Math.random() * pathways.length)]

            switch (direction) {
                case 'down':
                    ghost.velocity.y = ghost.speed
                    ghost.velocity.x = 0
                    break;

                case 'up':
                    ghost.velocity.y = -ghost.speed
                    ghost.velocity.x = 0
                    break;

                case 'right':
                    ghost.velocity.y = 0
                    ghost.velocity.x = ghost.speed
                    break;

                case 'left':
                    ghost.velocity.y = 0
                    ghost.velocity.x = -ghost.speed
                    break;
            }

            ghost.prevCollisions = []
        }
    })

    if (player.velocity.x > 0) player.rotation = 0
    else if (player.velocity.x < 0) player.rotation = Math.PI
    else if (player.velocity.y > 0) player.rotation = Math.PI * 0.5
    else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5

}

animate()


addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            lastKey = 'ArrowUp'
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            lastKey = 'ArrowDown'
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKey = 'ArrowLeft'
            break;
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
    }
})
