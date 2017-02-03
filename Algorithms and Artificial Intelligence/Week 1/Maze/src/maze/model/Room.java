package maze.model;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Sidney on 2/3/2017.
 */
public class Room{
    // represent four walls
    private Wall north;
    private Wall east;
    private Wall south;
    private Wall west;

    private int row, column; // represent the row and column of the maze
    private List<Room> adj; // adjacency list using linked list
    private int roomName; // for this the room will be a number
    private Room prev; // last room pointer

    // now we code the constructer
    public Room(int row, int column){
        this.row = row;// row
        this.column = column;// column
        adj = new LinkedList<Room>();
        prev = null;// we have not progressed, so prev is nothing
        roomName = 0;// we will use the concept of arrays start 0
    }// end of constructor

    // we have to increment the room name so lets do it
    public Wall getNorth() {
        return north;
    }
    public void setNorth(Wall north) {
        this.north = north;
    }

    public Wall getEast() {
        return east;
    }
    public void setEast(Wall east) {
        this.east = east;
    }

    public Wall getSouth() {
        return south;
    }
    public void setSouth(Wall south) {
        this.south = south;
    }

    public Wall getWest() {
        return west;
    }
    public void setWest(Wall west) {
        this.west = west;
    }

    public int getRow() {
        return row;
    }
    public void setRow(int row) {
        this.row = row;
    }

    public int getColumn() {
        return column;
    }
    public void setColumn(int column) {
        this.column = column;
    }

    public List<Room> getAdj() {
        return adj;
    }
    public void setAdj(List<Room> adj) {
        this.adj = adj;
    }

    public int getRoomName(){
        return roomName++;
    }// end of getRoomName()
    public void setRoomName(int roomName) {
        this.roomName = roomName;
    }

    public Room getPrev() {
        return prev;
    }
    public void setPrev(Room prev) {
        this.prev = prev;
    }

}// end of
