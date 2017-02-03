package maze.model;

import javafx.scene.canvas.GraphicsContext;

import java.util.ArrayList;

/**
 * Created by Sidney on 2/2/2017.
 */
public class Maze {

    Room[][] rooms;
    ArrayList<Wall> walls;
    int rows;
    int columns;
    GraphicsContext gc;

    public Maze(GraphicsContext gc, int rows, int columns) {
        this.gc = gc;
        this.rows = rows;
        this.columns = columns;
        this.rooms = new Room[rows][columns];
        walls = new ArrayList<Wall>((rows -1) * (columns - 1));
        //
    }


}
