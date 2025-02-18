#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the value of n:";
    cin>>n;
    int i=1;
    while (i<=n)
    {
       int k= 1;
       while (k<=(n-i+1))
       {
        cout<<k;
        k++;
       }
       
       int j=1;
       while (j<i)
       {
        cout<<"*";
        j++;
       }
       cout<<endl;
       i++;   
    }
    
}