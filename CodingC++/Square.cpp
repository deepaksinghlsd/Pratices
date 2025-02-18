#include<iostream>
#include<math.h>
using namespace std;
    int power(int a,int b){   
    int ans=1;
    for(int i=1;i<=b;i++){
        ans=ans*a;
     }
    return ans;
    }

   int main(){
    int a,b;
    cout<< "Enter the nuber as you like a^b like this :";    
    cin>>a>>b;
    
    cout<<"anser is "<<power (a , b);
    return 0;

   } 