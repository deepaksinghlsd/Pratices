package Recursion;

public class towerofHanoi {
    public static void TowerOfhanoi(int n, String src, String helper, String dest){
        //timecomplexcity of tower of hanoye id 0(2^n)
        if(n==1){
            System.out.println("Transpher disk "+ n  + "from "+src+" to "+dest);
            return;
        }
        TowerOfhanoi(n-1, src, dest, helper);
        System.out.println("Transpher disk"+ n  + "from "+src+" to "+dest);
        TowerOfhanoi(n-1, helper, src, dest);
    }
    public static void main(String[] args) {
        int n=3;
        TowerOfhanoi(n, "S","H","D");
        
    }
    
}
