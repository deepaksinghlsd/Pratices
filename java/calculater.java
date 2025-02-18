import java.util.Scanner;

public class calculater {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number");
        int a = sc.nextInt();
        int b = sc.nextInt();
        System.out.println("Chose the number what operation you acn perform\n 1 for +\n 2 for _\n 3 for *\n and 4 for %");
        int operation = sc.nextInt();
        switch(operation){
            case 1 : System.out.println("Addition of a+b");
            int add = a+b;
            //add =a+b;
            System.out.println(add);
            break;
            case 2 : System.out.println("Subtraction of a-b");
            int sub= a-b;
            System.out.println(sub);
            break;
            case 3 : System.out.println("multiplaction of a*b ");
            int mult= a*b;
            System.out.println(mult);
            break;
            case 4 : System.out.println("Remainde when a % b ");
            int rem = a%b;
            System.out.println(rem);
            break;
            default : System.out.println("Enput is invilid");
        }
    }
    
}
