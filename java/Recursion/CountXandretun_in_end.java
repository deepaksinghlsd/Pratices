package Recursion;

public class CountXandretun_in_end {
    public static void moveAllx(String str, int idx, int count, String newString){
        if(idx== str.length()){
            for(int i =0; i<count;i++){
                newString+='x';
            }
            System.out.println(newString);
            return;
        }
        char currChar = str.charAt(idx);
        if(currChar=='x'){
            count++;
            moveAllx(str, idx+1, count, newString);
        }else{
            newString+=currChar;//newString = newString + currChar;
            moveAllx(str, idx+1, count, newString);
        }
    }
    public static void main(String args[]) {
        String str = "axbcxxdx";
        moveAllx(str, 0,0, "");
    }
}
