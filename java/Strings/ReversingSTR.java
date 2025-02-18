package Strings;
import java.util.*;
public class ReversingSTR {
    public static void main(String args[]) {
        StringBuilder name = new StringBuilder("Deepak");
   
        for(int i = name.length(); i>0; i--){
            System.out.print(name.charAt(i-1)+" ");
        }
    }
    
}
