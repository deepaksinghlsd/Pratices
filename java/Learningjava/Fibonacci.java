package Learningjava;

import java.util.Scanner;

class Fibonacci {
public static void main(String[] args) {
    int a= 0;
    int b =1;
    int sum =0;
    Scanner sc =new Scanner(System.in);
    System.out.print("Enter the Number:");
    int num = sc.nextInt();
    System.out.print(a +" "+ b + " ");
    for( int i=2; i<num; i++){
        sum = a+b;
        System.out.print(sum+ " ");
        a=b;
        b=sum;
    }
}
    
}