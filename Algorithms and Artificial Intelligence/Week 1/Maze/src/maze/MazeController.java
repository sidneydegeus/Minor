package maze;

import com.sun.javafx.geom.BaseBounds;
import com.sun.javafx.geom.transform.BaseTransform;
import com.sun.javafx.jmx.MXNodeAlgorithm;
import com.sun.javafx.jmx.MXNodeAlgorithmContext;
import com.sun.javafx.sg.prism.NGNode;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Group;
import javafx.scene.Node;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.Pane;

import javafx.scene.layout.RowConstraints;
import javafx.scene.paint.Color;
import javafx.scene.paint.CycleMethod;
import javafx.scene.paint.RadialGradient;
import javafx.scene.paint.Stop;
import javafx.scene.shape.*;
import javafx.scene.shape.Rectangle;
import maze.model.Maze;

import java.net.URL;
import java.util.Random;
import java.util.ResourceBundle;

/**
 * Created by Sidney on 2/2/2017.
 */
public class MazeController implements Initializable {

    DisjointSets disjointSets;
    GraphicsContext gc;
    Canvas canvas;

    @FXML
    public Pane pane;

    public void solveMaze() {

    }

    public void generateMaze() {
        int numberOfElements = 36;

        Maze maze = new Maze();
        disjointSets = new DisjointSets(numberOfElements);
        drawMaze(gc, (int) Math.sqrt(numberOfElements));
    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {

        canvas = new Canvas(300, 250);
        gc = canvas.getGraphicsContext2D();
        Group root = new Group();
        root.getChildren().add(canvas);
        pane.getChildren().add(root);
       /* Random rand = new Random();
        int rowNumber = 3;
        int columnNumber = 3;


        for (int row = 0; row < rowNumber; row++) {
            for (int col = 0; col < columnNumber; col++) {
                Rectangle rec = new Rectangle();
                rec.setWidth(45);
                rec.setHeight(45);
                rec.setStroke(Color.BLACK);
                gridPaneMaze.setRowIndex(rec, row);
                gridPaneMaze.setColumnIndex(rec, col);
                gridPaneMaze.getChildren().addAll(rec);
            }
        }

        Rectangle rectangle = (Rectangle) gridPaneMaze.getChildren().get(0);
        rectangle.setL*/
    }

    private void drawMaze(GraphicsContext gc, int squareRootOfElements) {
        Random random = new Random();
        int randomElement = random.nextInt(squareRootOfElements * squareRootOfElements);
        // check if it's linked to a root first, else make it root

        gc.clearRect(0, 0, canvas.getWidth(), canvas.getHeight());
        gc.setLineWidth(1);
        int strokeSize = 40;

        for (int row = 0; row < squareRootOfElements; row++) {
            for (int column = 0; column < squareRootOfElements; column++) {
                drawLines(row, column, strokeSize);
            }
        }
    }

    private void drawLines(int row, int column, int strokeSize) {
        // right stroke
        gc.strokeLine(strokeSize*(row+1), strokeSize*column, strokeSize*(row+1), strokeSize*(column+1));

        // left stroke
        gc.strokeLine(strokeSize*row, strokeSize*column, strokeSize*row, strokeSize*(column+1));

        // bottom stroke
        gc.strokeLine(strokeSize*row, strokeSize*column,  strokeSize*(row+1), strokeSize*column);

        // top stoke
        gc.strokeLine(strokeSize*row, strokeSize*(column+1),  strokeSize*(row+1), strokeSize*(column+1));
    }
}
