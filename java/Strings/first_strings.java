package Strings;
import java.util.*;

public class first_strings {
    public static void main(String args[]) {
    //    Scanner sc = new Scanner(System.in);
    //    String name = sc.nextLine();
    //    System.out.println("Your name is :"+ name);
    //    System.out.println(name.length());

    //CONCATINATION----------------------
    String firstname = "tony";
    String lastname = "Singh";
    String fullName = firstname + lastname;
     System.out.println(fullName);

    //charAr------- for split the string
    for(int i =0; i<fullName.length(); i++){
        System.out.println(fullName.charAt(i));
    }
    //compareTO  ---- use to campare two strings---
    //1 s1 > s2 : +ve value
    //2 s1==s2  : 0
    //3 s1 > s2 : -ve value
    if(firstname.compareTo(lastname)== 0){
        System.out.println("String are equal");
    }
     else {
            System.out.println("String are not equal");
        }

// Substring----------   it is used to contain the part of string
        String middle = fullName.substring(5,fullName.length());
        System.out.println(middle);
    }
    
}
