import java.util.Scanner;
import java.util.*;

public class Greater_amonug_two_num {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number");
        int a = sc.nextInt();
        int b = sc.nextInt();
        if(a==b){
            System.out.println("Equal");
        }
        else if(a<b){
            System.out.println("B is greater");
        }
        else{
            System.out.println("A is greater");
        }
    }
    
}
