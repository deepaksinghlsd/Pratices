#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the nuber:=";
    cin>>n; 
    int Product=1;
    int sum=0;
    int result;
    while (n>0)
    {
        int digit;
        digit=n%10;
        // Product= Product*digit;
        sum=sum+digit;
        n=n/10;
        // result=Product-sum;
        
    }
    
    cout<< sum;
}