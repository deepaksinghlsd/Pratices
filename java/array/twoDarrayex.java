package array;
import java.util.*;

public class twoDarrayex {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int row = sc.nextInt();
        int coms = sc.nextInt();
        int[][] matrix = new int [row] [coms];
        //input
        for(int i =0; i<row; i++){
            for(int j = 0; j<coms; j++){
                 matrix[i] [j] = sc.nextInt();
            }
        }

        int key = sc.nextInt();
         for(int i=0; i<row; i++){
            for(int j=0; j<coms; j++){
                if(matrix[i][j]==key){
                    System.out.println("key is found at intex(" +i +","+ j+ ")");
                }
            }
         }
    }
}
