#include<iostream>
#include<math.h>
using namespace std;
int main(){
    int n ;
    cout<<"Enter the nuber you want to reiver:=";
    cin>>n;
    int ans=0;
    while(n!=0){
        int digit = n%10;
        // if ( (ans >INT_max/10)||(ans < INT_MIN/10)){
        //     return 0;
        // }
        ans=ans*10 + digit;
        n = n/10;
    }
    cout<<"reverse num ="<<ans;
}
