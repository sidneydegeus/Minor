package maze.controller;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import maze.model.Maze;

import java.net.URL;
import java.util.ResourceBundle;

/**
 * Created by Sidney on 2/3/2017.
 */
public class MazeController implements Initializable {

    @FXML
    Canvas canvas;

    Maze maze;
    GraphicsContext gc ;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        gc = canvas.getGraphicsContext2D();
    }

    @FXML
    protected void generateMazeButton(ActionEvent event) {
        int numRows = 32;
        int numColumns = 32;

        gc.clearRect(0, 0, 800, 800);
        maze = new Maze(gc, numRows, numColumns);

    }

    @FXML
    protected void solveMazeButton(ActionEvent event) {

    }
}
