package Learningjava;

import java.util.Scanner;

public class PrimeNumber {
    //cheick the given number is prime aur not;
    public static void main(String[] args) {
        System.out.print("Enter the number: ");
        Scanner sc = new Scanner(System.in);
        int num = sc.nextInt();
        int m = num/2;
        if(num==0||num==1){
            System.out.println("Not a prime number");
        }else{
            for(int i=2; i<=m; i++ ){
                if(num%i==0){
                    System.out.println(num + "Number is not prime number");
            }else{
                System.out.println(num + " is a prime number");
                break;
            }
            }
        }
    }
}
