package Recursion;

public class power_1 {
    public static int calculatepow(int a , int x){
        if(a == 0){
            return 0;
        }
        if(x == 0){
            return 1;
        }
        if(x%2 == 0){
            return calculatepow(a, x/2)* calculatepow(a, x/2);
        }
        else{
            return calculatepow(a, x/2) * calculatepow(a, x/2)*a;
        }
    }
    public static void main(String args[]) {
        int x = 3 ;
        int n=4;
        int ans = calculatepow(x, n);
        System.out.println(ans);


    }
    
}
