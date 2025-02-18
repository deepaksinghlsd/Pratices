package Recursion;

public class power {
    public static int PrintSquare(int num , int x){
        if(num == 0){
            return 1;
        }
        if( x ==0){
            return 1;
        }
        int numPOwe1=PrintSquare(num, x-1);
        int numpowe =num*numPOwe1;
        return numpowe;
    }
    public static void main(String args[]) {
        int num=5;
        int x=3;
        int ans = PrintSquare(num, x);
        System.out.println(ans);

    }
    
}
