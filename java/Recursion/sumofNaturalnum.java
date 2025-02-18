package Recursion;

import java.util.Scanner;

public class sumofNaturalnum {

    public static void SumNum(int i,int n,int sum){
       if(i == n){
        sum+=i;
        System.out.println(sum);
        return;
       }
       sum+=i;
       SumNum(i+1, n, sum);
    }
    public static void main(String args[]) {
      SumNum(1, 05, 00);
    }
    
}
