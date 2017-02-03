package model;

/**
 * Created by jorda on 1-2-2017.
 */
public class DisjointSet {

    private int[] setArray;

    public DisjointSet(int numElems){
        setArray = new int[numElems];
        for(int i =0; i < setArray.length; i++){
            setArray[i] = -1;
        }
    }

    public void union(int elem1, int elem2){
        if(setArray[elem2] < setArray[elem1]){
            setArray[elem1] = elem2;
        } else {
            if (setArray[elem1] == setArray[elem2]){
                setArray[elem1]--;
            }
            setArray[elem2] = elem1;
        }
    }

    public int find(int elem)
    {
        if(setArray[elem] < 0){
            return elem;
        } else {
            return setArray[elem] = find(setArray[elem]);
        }
    }
}
