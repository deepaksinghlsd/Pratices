package Recursion;

public class check_Array_Sorted {
    public static boolean SortingArry(int array[] , int idx){
        if(idx==array.length-1){
            return true;
        }
        if(array[idx]<array[idx+1]){
            return SortingArry(array, idx+1);
        }else{
            return false;
        }
        
    }
    public static void main(String args[]) {
        int arry[] = {1,2,3,4,5};
        System.out.println(SortingArry(arry, 0));
    }
    
}
