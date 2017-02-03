package model;

/**
 * Created by jorda on 1-2-2017.
 */
import java.util.*;
public class Room{
    // represent four walls
    public Wall north, east, south, west; // the wall class will be created next
    public int x, y; // represent the row and column of the maze
    public List<Room> adj; // adjacency list using linked list
    public int roomName; // for this the room will be a number
    public Room prev; // last room pointer

    // now we code the constructer
    public Room(int x, int y){
        this.x = x;// row
        this.y = y;// column
        adj = new LinkedList<Room>();
        prev = null;// we have not progressed, so prev is nothing
        roomName = 0;// we will use the concept of arrays start 0
    }// end of constructor

    // we have to increment the room name so lets do it
    public int getRoomName(){
        return roomName++;
    }// end of getRoomName()

}// end of