#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the nuber you want to chek num is prime are not:";
    cin>>n;
    bool Isprime=1;
    for ( int i = 2; i < n; i++)
    {
       if(n%i==0){
        Isprime =0;
        break;
       }
     }
     if(Isprime=0){
        cout<<"Nuber is not prime:";
     }
     else{
        cout<<"Nuber is prime";
     }
    
}