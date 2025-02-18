#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the number n:";
    cin>>n;
    int i=1;
    while (i<=n)
    {
        int space=n-i+1;
        while (space)
        {
           cout<<"*";
           space--;
        }
        int j=1;
        
        while (j<=(i-1))
        {
           cout<<" ";
           j++;
        }
        
        cout<<endl;
        i++; 
    }
    
}