package maze.model;

import javafx.scene.canvas.GraphicsContext;

import java.util.ArrayList;
import java.util.Random;

/**
 * Created by Sidney on 2/3/2017.
 */
public class Maze {

    private Room[][] rooms;
    private ArrayList<Wall> walls;
    private int rows;
    private int columns;

    private GraphicsContext gc;

    public Maze(GraphicsContext gc, int rows, int columns){
        this.gc = gc;
        this.rows = rows;
        this.columns = columns;
        rooms = new Room[rows][columns];
        walls = new ArrayList<Wall>((rows - 1) * (columns - 1));
        generateRandomMaze();
    }

    public void generateRandomMaze(){
        generateInitialRooms();
        int numberOfRooms = rows * columns;
        DisjointSet disjointSet = new DisjointSet(numberOfRooms);
        Random random = new Random();
        int numberOfRoomsLeftToGenerate = numberOfRooms;
        while(numberOfRoomsLeftToGenerate > 1){
            //when we pick a random wall we want to avoid the borders getting eliminated
            int randomWall = random.nextInt(walls.size());
            Wall temp = walls.get(randomWall);

            //2 rooms randomly
            int roomA = temp.getCurrentRoom().getColumn() + temp.getCurrentRoom().getRow() * columns;
            int roomB = temp.getNextRoom().getColumn() + temp.getNextRoom().getRow() * columns;

            // check roomA and roomB to see if they are already members (Using DisjointSet)
            if(disjointSet.find(roomA) != disjointSet.find(roomB)){
                walls.remove(randomWall);
                disjointSet.union(disjointSet.find(roomA), disjointSet.find(roomB));
                temp.setWallRemoved(true);
                temp.getCurrentRoom().getAdj().add(temp.getNextRoom());
                temp.getNextRoom().getAdj().add(temp.getCurrentRoom());
                numberOfRoomsLeftToGenerate--;
            }
        }
        drawMaze();
    }

    private int roomNumber = 10;

    public void generateInitialRooms(){
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                // create north walls
                rooms[i][j] = new Room(i, j);
                if (i == 0) {
                    rooms[i][j].setNorth(new Wall(rooms[i][j]));
                } else {
                    rooms[i][j].setNorth(new Wall(rooms[i - 1][j], rooms[i][j]));
                    walls.add(rooms[i][j].getNorth());
                }
                if (i == rows - 1) {
                    rooms[i][j].setSouth(new Wall(rooms[i][j]));
                }
                if (j == 0) {
                    rooms[i][j].setWest(new Wall(rooms[i][j]));
                } else {
                    rooms[i][j].setWest(new Wall(rooms[i][j - 1], rooms[i][j]));
                    walls.add(rooms[i][j].getWest());
                }
                if (j == columns - 1) {
                    rooms[i][j].setEast(new Wall(rooms[i][j]));
                }
                rooms[i][j].setRoomName(roomNumber++);// we will name the rooms
            }
        }
        // initalize entrance and exit
        rooms[0][0].getWest().setWallRemoved(true);// you can replace .west.wallRemoved with .north.wallRemoved
        // this is just saying the roomName for top left is 0
        rooms[0][0].setRoomName(0);
        // we will remove the south wall of the last room
        rooms[rows - 1][columns - 1].getSouth().setWallRemoved(true);
        // this is just saying the roomName for bottom right is the last element in the mxn room matrix
        rooms[rows - 1][columns - 1].setRoomName(rows * columns);
    }

    public void drawMaze(){
        int x_cord = 400;
        int y_cord = 400;

        int roomSize = (columns - x_cord) / columns + 7;

        int x = x_cord;
        int y = y_cord;

        for (int i = 0; i <= rows - 1; i++){
            for (int j = 0; j <= columns - 1; j++){
                if(!(rooms[i][j].getNorth().isWallRemoved())){
                    gc.strokeLine(x, y, x + roomSize, y);
                }

                if (!rooms[i][j].getWest().isWallRemoved()) {
                    gc.strokeLine(x, y, x, y + roomSize);
                }

                if ((i == rows - 1) && !rooms[i][j].getSouth().isWallRemoved()) {
                    gc.strokeLine(x, y + roomSize, x + roomSize, y + roomSize);
                }
                if ((j == columns - 1) && !rooms[i][j].getEast().isWallRemoved()) {
                    gc.strokeLine(x + roomSize, y, x + roomSize, y + roomSize);
                }
                x += roomSize;
            }
            x = x_cord;
            y += roomSize;
        }
    }
}
