import turtle

wn = turtle.Screen()
wn.title('Pong')
wn.bgcolor('black')
wn.setup(width=800, height=600)
wn.tracer(0) # Speeds up games

# Main Game Loop
while True:
    wn.update()
