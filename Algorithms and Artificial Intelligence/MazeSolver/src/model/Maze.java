package model;

import java.util.ArrayList;
import java.util.Random;

import javafx.scene.canvas.GraphicsContext;
import javafx.scene.shape.Line;

/**
 * Created by jorda on 1-2-2017.
 */
public class Maze {

    private Room[][] rooms;
    private ArrayList<Wall> walls;
    private Random rand;
    private int height;
    private int width;
    private int num;
    private DisjointSet ds;

    //Painten
    private int x_cord;
    private int y_cord;
    private int roomSize;
    private int randomWall;
    private GraphicsContext gc;

    public Maze(GraphicsContext gc, int height, int width){
        this.gc = gc;
        this.height = height;
        this.width = width;
        rooms = new Room[height][width];
        walls = new ArrayList<Wall>((height - 1) * (width - 1));
        generateRandomMaze();
    }

    public void generateRandomMaze(){
        generateInitialRooms();

        ds = new DisjointSet(width * height);
        rand = new Random(); //random room generator
        num = width * height;

        while(num > 1){
            //when we pick a random wall we want to avoid the borders getting eliminated
            randomWall = rand.nextInt(walls.size());
            Wall temp = walls.get(randomWall);

            //2 rooms randomly
            int roomA = temp.currentRoom.y + temp.currentRoom.x * width;
            int roomB = temp.nextRoom.y + temp.nextRoom.x * width;

            // check roomA and roomB to see if they are already members (Using DisjointSet)
            if(ds.find(roomA) != ds.find(roomB)){
                walls.remove(randomWall);
                ds.union(ds.find(roomA), ds.find(roomB));
                temp.isGone = true;
                temp.currentRoom.adj.add(temp.nextRoom);
                temp.nextRoom.adj.add(temp.currentRoom);
                num--;
            }
        }
        drawMaze();
    }

    private int roomNumber = 10;

    public void generateInitialRooms(){
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                // create north walls
                rooms[i][j] = new Room(i, j);
                if (i == 0) {
                    rooms[i][j].north = new Wall(rooms[i][j]);
                } else {
                    rooms[i][j].north = new Wall(rooms[i - 1][j], rooms[i][j]);
                    walls.add(rooms[i][j].north);
                }
                if (i == height - 1) {
                    rooms[i][j].south = new Wall(rooms[i][j]);
                }
                if (j == 0) {
                    rooms[i][j].west = new Wall(rooms[i][j]);
                } else {
                    rooms[i][j].west = new Wall(rooms[i][j - 1], rooms[i][j]);
                    walls.add(rooms[i][j].west);
                }
                if (j == width - 1) {
                    rooms[i][j].east = new Wall(rooms[i][j]);
                }
                rooms[i][j].roomName = roomNumber++;// we will name the rooms
            }
        }
        // initalize entrance and exit
        rooms[0][0].west.isGone = true;// you can replace .west.isGone with .north.isGone
        // this is just saying the roomName for top left is 0
        rooms[0][0].roomName = 0;
        // we will remove the south wall of the last room
        rooms[height - 1][width - 1].south.isGone = true;
        // this is just saying the roomName for bottom right is the last element in the mxn room matrix
        rooms[height - 1][width - 1].roomName = (height * width);
    }

    public void drawMaze(){
        x_cord = 400;
        y_cord = 400;

        roomSize = (width - x_cord) / width + 7;

        int x = x_cord;
        int y = y_cord;

        for (int i = 0; i <= height - 1; i++){
            for (int j = 0; j <= width - 1; j++){
                if(!(rooms[i][j].north.isGone)){
                    gc.strokeLine(x, y, x + roomSize, y);
                }

                if (rooms[i][j].west.isGone == false) {
                    gc.strokeLine(x, y, x, y + roomSize);
                }

                if ((i == height - 1) && rooms[i][j].south.isGone == false) {
                    gc.strokeLine(x, y + roomSize, x + roomSize, y + roomSize);
                }
                if ((j == width - 1) && rooms[i][j].east.isGone == false) {
                    gc.strokeLine(x + roomSize, y, x + roomSize, y + roomSize);
                }
                x += roomSize;
            }
            x = x_cord;
            y += roomSize;
            }
        }
}
