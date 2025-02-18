package Recursion;

public class removeduplicate_String {
    public static boolean[] map = new boolean[26];

    public static void remoneDuplicate( String str, int idx, String newString ){
        if(idx==str.length()){
            System.out.println(newString);
            return;
        }
        char currChar = str.charAt(idx);
        if(map[currChar-'a']== true){
            remoneDuplicate(str, idx+1, newString);
        }else{
            newString+=currChar;
            map[currChar-'a']=true;
            remoneDuplicate(str, idx+1, newString);
        }
    }
    public static void main(String args[]) {
        String str = "deepak";
        remoneDuplicate(str, 0, "");
    }
}
