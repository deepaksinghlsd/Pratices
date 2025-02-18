#include<iostream>
using namespace std;
int factorial(int n){
    int fact =1;
    for(int i =1; i<=n;i++) {
        fact = fact*i;
    }
    return fact;
}
int ncr(int n , int r){
    int num = factorial(n);
    int denom = factorial(r)*factorial(n-r);
    int ans = num/denom;
    return ans;
}

int main(){
    int n,r;
    cout<<"Enter the nuber n ans r:";
    cin>> n >> r;
    cout<<"The ncr is :"<<ncr(n,r);
    return 0;
}