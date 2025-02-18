 #include<iostream>
 
 using namespace std;
 int main(){
    int a, b;
    cout<<"Enter the first nuber:=";

    cin>>a;
    cout<<"Enter the second number:"<<endl;
    cin>>b;
    char op;

    cout<<"Enter the expression what do you want to perform:";
    cin>>op;

//     int sum, sub,mul,div;
//     sum = a+b;
//     sub=a-b;
//     mul=a*b;
//     div=a/b;
    switch(op){
        case '+': cout<<"Sum of two nuber is ="<<(a+b)<<endl;
                break;
        case '-': cout<<" Subtraction of a and b is ="<<(a-b)<<endl;
                break;
        case '*': cout<<" multiplication of a and b is ="<<(a*b)<<endl;
                break;
        case '/': cout<<" division of a ns d b is ="<<(a/b)<<endl;
                break;

        default: cout<<"please enter the valid operation";
    }


 }