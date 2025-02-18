#include<iostream>
using namespace std;

int Ap(int n){
    int APnum =(3*n+7);
    return APnum;
}
int main(){
    int number;
    cout<<"Enter the number"<<endl;
    cin>>number;
    cout<<"Ap no is ="<<Ap(number);
    return 0;

}