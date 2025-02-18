#include <iostream>

using namespace std;

int fabonaci(int n) {
    
        int sum = 1;
        int a = 0;
        int b = 0;
    for( int i=0 ; i<=n ; i++){
        if ((i == 0) ||(i == 1)) {
            cout <<i <<" , ";
        }
        else {
        b = sum;
        sum = sum + a;
        a = b;
        cout<<sum <<" , ";
        }
    }
    return 0;
  
}


int main(){
    int num;
    cout<<"Enter the num:"<<endl;
    cin>>num;
    fabonaci(num);

    return 0;
}