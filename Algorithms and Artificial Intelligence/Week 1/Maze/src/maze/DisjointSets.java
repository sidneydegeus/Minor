package maze;

/**
 * Created by Sidney on 2/2/2017.
 */
public class DisjointSets {

    protected int[] setArray;

    public DisjointSets(int numberOfElements) {
        setArray = new int[numberOfElements];
        for (int i = 0; i < numberOfElements; i++) {
            setArray[i] = i;
        }
    }

    public void union(int element1, int element2) {
        assertIsRoot(element1);
        assertIsRoot(element2);
        if (element1 == element2)
            throw new IllegalArgumentException();

        if (setArray[element2] < setArray[element1]) {
            setArray[element1] = element2;
        } else {
            if ()
        }

    }


    public int find(int element) {
         return setArray[element];
    }

    private void assertIsRoot(int root) {
        assertIsItem(root);
        if (setArray[root] >= 0)
            throw new IllegalArgumentException();
    }

    private void assertIsItem(int x) {
        if (x < 0 || x >= setArray.length)
            throw new IllegalArgumentException();

    }

    @Override
    public String toString() {

        return "ok";
    }
}
