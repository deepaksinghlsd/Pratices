package Strings;
import java.util.*;

import javax.sound.sampled.SourceDataLine;
public class Stringbuilder {
 public static void main(String args[]) {
       StringBuilder sb = new StringBuilder("Deepak");
         System.out.println(sb);

    //charAt 
    
    System.out.println(sb.charAt(0));


    //Set char at index 0
    sb.setCharAt(0, 'p');
    System.out.println(sb);

    //Inserting the String at index;
    sb.insert(0, 'S');
    System.out.println(sb);

    //Deleting the index
    sb.delete(0, 3);
    System.out.println(sb);

    //Adding the character the end of the string is:------
    sb.append("Singh");
    System.out.println(sb);
 }
}
