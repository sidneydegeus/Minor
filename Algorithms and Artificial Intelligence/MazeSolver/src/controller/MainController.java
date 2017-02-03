package controller;

/**
 * Created by jorda on 1-2-2017.
 */
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.text.Text;
import jdk.nashorn.internal.runtime.arrays.NumericElements;
import model.DisjointSet;
import model.Maze;

import java.net.URL;
import java.util.ResourceBundle;

public class MainController implements Initializable{

    @FXML private Canvas canvas ;

    private Maze maze;
    private GraphicsContext gc ;

    @FXML protected void generateMazeButton(ActionEvent event) {
        int numRows = 32;
        int numColumns = 32;

        gc.clearRect(0, 0, 800, 800);
        maze = new Maze(gc, numRows, numColumns);

    }

    @FXML protected void solveMazeButton(ActionEvent event) {

    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        gc = canvas.getGraphicsContext2D();
    }
}