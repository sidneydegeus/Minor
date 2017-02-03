package maze;

import javafx.application.Application;

import javafx.fxml.FXMLLoader;
import javafx.scene.Group;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.paint.Color;
import javafx.scene.shape.ArcType;
import javafx.stage.Stage;

/**
 * Created by Sidney on 2/2/2017.
 */
public class Main extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {

        Stage window = primaryStage;
        Parent root = FXMLLoader.load(getClass().getClassLoader().getResource("view.fxml"));
        window.setTitle("Maze");
        Scene scene = new Scene(root);
        //scene.getStylesheets().add(getClass().getResource("style/style.css").toExternalForm());
        window.setScene(scene);
        window.centerOnScreen();
        window.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
