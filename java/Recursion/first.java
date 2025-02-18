package Recursion;

public class first {
    public static void printNum(int n){
        if(n == 0){
            return;  
        }
        System.out.println(n);
        printNum(n-1);
    }
    public static void main(String args[]) {
        int num =5;
        printNum(num);
    }
    
}
