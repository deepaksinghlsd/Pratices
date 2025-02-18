#include<iostream>
using namespace std;

bool isPrime(int n){
    for(int i =2; i<n;i++){
        if( n%i==0){
            return 1;
        }
        else{
            return 0;
        }
    }
}

int main(){
    int n;
    cout<<"Enter the nuber you want to check =";
    cin>>n;
    if (isPrime(n)){
        cout<<"Number not prime:"<<endl;
    }
    else{
        cout<<"Nuber is prime"<<endl;
        return 0;
    }
}