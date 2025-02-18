#include<iostream>
#include<math.h>
using namespace std;
// the solution are not correct.
int main(){
    int m ,n;
    m = n;
    cout<<"Enter the nuber you want to complement then covert in num:";
    cin>>n;
    int mask =0;
    while ( n!=0)
    {
        mask = (mask<<1) | 1;
        m = m >>1;
    }
    int ans = (~n)&mask;
    cout<< ans;
    
}