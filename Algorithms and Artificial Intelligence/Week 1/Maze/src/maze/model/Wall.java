package maze.model;

/**
 * Created by Sidney on 2/3/2017.
 */
public class Wall{

    private Room currentRoom;
    private Room nextRoom;

    private boolean wallRemoved = false;// is the wall there

    // Two constructors will be created
    // which will account for walls with or
    // without neighbors
    // this indicates whether removing the wall leads to
    // a different room

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

    public Room getCurrentRoom() {
        return currentRoom;
    }
    public void setCurrentRoom(Room currentRoom) {
        this.currentRoom = currentRoom;
    }

    public Room getNextRoom() {
        return nextRoom;
    }
    public void setNextRoom(Room nextRoom) {
        this.nextRoom = nextRoom;
    }

    public boolean isWallRemoved() {
        return wallRemoved;
    }
    public void setWallRemoved(boolean wallRemoved) {
        this.wallRemoved = wallRemoved;
    }
}
