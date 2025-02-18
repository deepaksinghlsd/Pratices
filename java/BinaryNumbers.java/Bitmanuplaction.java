// package BinaryNumbers.java;
import java.util.*;

public class Bitmanuplaction {
    public static void main(String args[]) {
        //Get bit(AND)-------------- 
        // int num = 5;//0101
        // int pos = 3;
        // int bitMask = 1<<pos;

        // if((bitMask & num)==0 ){
        //     System.out.println("bit are zero");
        // }
        // else{
        //     System.out.println("Bit are one");
        // }


        //SET BIT (or):------
        //   int n =5;
        //   int pos = 1;
        //   int bitMask = 1 << pos;
        //   int NewNumber = bitMask | n;
        //   System.out.println(NewNumber);


        //clear Bit(AND WITH NOT):-----------
        //  int n = 5;
        //  int pos =2;
        //  int bitMask = 1<<pos;
        //  int notBitMask =~(bitMask);

        //  int newNumber = notBitMask & n;

        //  System.out.println(newNumber);


        // UPDATE BIT:-----------------------
        Scanner sc = new Scanner(System.in);
        int oper = sc.nextInt();
        int n = 5;//0101
        int pos = 1;
         int bitMask = 1<<pos;
        //update bit to 1 else update bit to 0;

        if(oper == 1){
            //set
            int newNumber = bitMask | n;
            System.out.println(newNumber);

        }
        else{
            // clear
            int notBitMask = ~(bitMask);
            int newNumber = notBitMask & n;
            System.out.println(newNumber);


        }

    }
}
