package model;

/**
 * Created by jorda on 1-2-2017.
 */
public class Wall{

    public Room currentRoom, nextRoom;// room in now, next room
    public boolean isGone = false;// is the wall there

    // Two constructors will be created
    // which will account for walls with or
    // without neighbors

    // with a neighbor
    public Wall(Room a, Room b){
        currentRoom = a;
        nextRoom = b;
    }

    // without a neighbor
    public Wall(Room r){
        currentRoom = r;
        nextRoom = null;
    }
}// end of Wall class