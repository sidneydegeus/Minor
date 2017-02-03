package maze.model;

/**
 * Created by Sidney on 2/3/2017.
 */
public class DisjointSet {

    private int[] setArray;

    public DisjointSet(int numberOfElements){
        setArray = new int[numberOfElements];
        for(int i =0; i < setArray.length; i++){
            setArray[i] = -1;
        }
    }

    public void union(int element1, int element2){
        if(setArray[element2] < setArray[element1]){
            setArray[element1] = element2;
        } else {
            if (setArray[element1] == setArray[element2]){
                setArray[element1]--;
            }
            setArray[element2] = element1;
        }
    }

    public int find(int element)
    {
        if(setArray[element] < 0){
            return element;
        } else {
            return setArray[element] = find(setArray[element]);
        }
    }
}
