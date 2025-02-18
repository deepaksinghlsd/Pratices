import java.util.Scanner;

public class month{
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number betwen 1 to 12");
        int num = sc.nextInt();
        switch(num){
            case 1: System.out.println("january");
            break;
            case 2: System.out.println("february");
            break;
            case 3 : System.out.println("March");
            break;
            //default : System.out.println("entered number is wrong");

        }
    }
}
