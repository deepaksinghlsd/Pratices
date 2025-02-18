#include <iostream>
using namespace std;
int main() {
    int n = 1389;
    int i;
    for( i = 0;i < 5;i++) {
        int num;
    switch (i) {
    
    case 0 :
        num = n/100;
        cout<<num<<" 100 rupee note"<<endl;
        n = n%100;
        break;

    case 1 : 
        num = n/50;
        cout<<num<<" 50 rupee note"<<endl;
        n = n%50;
        break;
    case 2 : 
        num = n/20;
        cout<<num<<" 20 rupee note"<<endl;
        n = n%20; 
        break;
    case 3 : 
        num = n/10;
        cout<<num<<" 10 rupee note"<<endl;
        n = n%10; 
        break;
    case 4 : 
        num = n/1;
        cout<<num<<" 1 rupee note"<<endl;
        n = n%1;          
        break;

    }
    }

    return 0; 
}