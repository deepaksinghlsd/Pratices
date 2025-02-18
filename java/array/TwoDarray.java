package array;
import java.util.*;

public class TwoDarray {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int row = sc.nextInt();
        int cols = sc.nextInt();

        int[][] numbers = new int [row][cols];

        //input
        for (int i=0; i<row; i++){
            for(int j =0; j<cols; j++){
                numbers[i][j]= sc.nextInt();
            }
        }
        //output
        for (int i = 0; i<row; i++ ){
            for (int j = 0; j<cols; j++){
                System.out.println(numbers[i][j] +" ");
            }
            System.out.println();
        }
    }
    
}
