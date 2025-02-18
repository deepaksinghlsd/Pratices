#include<iostream>
using namespace std;
bool checkNum(int a){
    if (a%2==0){
       return 1;
    }
    else{
       return 0;
    }
} 
    
    int main () { 
        int num;
        cout<<"Enter the nuber what do you want to check:";
        cin>>num;
        if (checkNum(num)){
            cout<<"Nuber is even:";
             }
        else{
            cout<<"number is odd:";
        return 0;
        }     


    }



