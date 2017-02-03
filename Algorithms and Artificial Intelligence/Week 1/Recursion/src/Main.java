import javafx.application.Application;
import javafx.stage.Stage;

import java.applet.Applet;

/**
 * Created by Sidney on 2/3/2017.
 */
public class Main extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception{
        printNrs();
    }


    public static void main(String[] args) {
        launch(args);
    }

    private void printNrs() {
        recursivePrint(1);
    }

    private void recursivePrint(int number) {
        if (number <= 100) {
            System.out.println(number);
            recursivePrint(number + 1);
        }
    }

}
