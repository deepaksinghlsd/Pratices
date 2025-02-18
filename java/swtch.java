import java.util.Scanner;

public class swtch {
    public static void main(String args[]){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the button number");
        int button = sc.nextInt();

    switch(button){
        case 1 : System.out.println("Deepak");
        break;
        case 2 : System.out.println("prajwal");
        break;
        case 3 : System.out.println("Abhinav");
        break;
        default : System.out.println("Envilid button");
    }

    }
    
    
    
}
