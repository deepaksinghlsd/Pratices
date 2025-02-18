import java.util.Scanner;
import java.util.*;

public class comparenum {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number");
        int a = sc.nextInt();
        int b = sc.nextInt();
        if (a == b){
             System.out.println("equal");
        } else if (a>b){
            System.out.println("a is greater");
        }
        else{
            System.out.println("b is greater");
        }
    
}
