from django.shortcuts import render
from django.http import HttpResponse
import random, sys

# Create your views here.
def index(request):
	return maze(request)

def maze(request, width=12, height=12, seed = None):
	seed, maze = generate_maze(width, height, seed=seed)
	return render(request, 'labyapp/index.html', context={
		'labyrint': maze,
		'seed': seed,
		})

def generate_maze(width, height, seed=None):
	if not seed:
		seed = random.randrange(sys.maxsize)
	random.seed(seed)
	RIGHT, LEFT, TOP, BOTTOM = 2,3,5,7
	maze = [[210 for x in range(width)] for y in range(height)]
	visited = set()
	x,y = 0,0
	visited.add((x,y))
	inmaze = lambda x,y: -1<x<width and -1<y<height
	fkey = lambda x,y: inmaze(x,y) and (x,y) not in visited

	def remove_wall(x,y,dx,dy):
		if (dx,dy) == (1,0):
			maze[y][x]//=RIGHT
			maze[y+dy][x+dx]//=LEFT
		elif (dx,dy) == (-1,0):
			maze[y][x]//=LEFT
			maze[y+dy][x+dx]//=RIGHT
		elif (dx,dy) == (0,1):
			maze[y][x]//= BOTTOM
			maze[y+dy][x+dx]//=TOP
		else:
			maze[y][x]//=TOP
			maze[y+dy][x+dx]//=BOTTOM

	def process_cell(x,y):
		visited.add((x,y))
		for (dx,dy) in random.sample(((1,0),(-1,0),(0,1),(0,-1)), 4):
			if fkey(x+dx, y+dy):
				remove_wall(x,y,dx,dy)
				process_cell(x+dx,y+dy)

	process_cell(0,0)
	
	return seed, [['r'*(e%RIGHT==0) + 'l'*(e%LEFT==0) + 't'*(e%TOP==0) + 'b'*(e%BOTTOM==0) 
		for e in row] for row in maze]
