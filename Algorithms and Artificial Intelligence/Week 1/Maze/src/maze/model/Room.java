package maze.model;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Sidney on 2/2/2017.
 */
public class Room {
    Wall north, east, south, west;
    int row, column;
    List<Room> roomList;
    int roomName;
    Room previousRoom;

    public Room(int row, int column) {
        this.row = row;
        this.column = column;
        roomList = new LinkedList<Room>();
        previousRoom = null;
        roomName = 0;
    }
}
