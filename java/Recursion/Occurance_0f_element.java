package Recursion;

public class Occurance_0f_element {//time complaxity is 0(n)where n is the length of the string:
    public static int first = -1;
    public static int last = -1;
    public static void FindOccerence(String str, int idx, char element){
        if(idx ==str.length()){
            System.out.println(first);
            System.out.println(last);
            return;
        }
        char currChar = str.charAt(idx);
        if(currChar==element){
            if(first==-1){
                first=idx;
            }else{
                last=idx;
            }
        }
        FindOccerence(str, idx+1, element);
    }
    public static void main(String args[]) {
        String str = "abaacdaefaah";
        FindOccerence(str, 0, 'a');
    }
    
}
