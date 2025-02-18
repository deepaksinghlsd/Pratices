#include<iostream>
#include<math.h>
using namespace std;
int SquareRoot(int n){
    int s =0;
    int e= n;
    int mid = s+(s-e)/2;
    int ans=-1;
    int square;
    while(s<=e){
         square = mid*mid;
         if(square==n){
            return mid;
         }
         else if (square< n)
         {
            ans = mid;
            s= mid+1;
         }
         else{
            e= mid-1;
         }
         mid=s+(e-s)/2;
    }
    return ans;

}
int main(){
    int n;
    cout<<"Enter the intiger number=";
    cin>>n;
    // cin>>n;
    cout<<"The square of the number="<<SquareRoot(n);
}