package array;

import java.util.Scanner;

public class get_num_inarray {
    public static void main(String args[]) {
        Scanner Sc = new Scanner(System.in);
        int size = Sc.nextInt();
        int numbers[] = new int[size];

        //input
        for(int i=0; i<size; i++){
            numbers[i] = Sc.nextInt();
        }

        //output
        for(int i=0; i<size;i++){
            System.out.print(numbers[i]);
        }

    }
}
