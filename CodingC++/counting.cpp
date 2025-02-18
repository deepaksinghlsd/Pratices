#include<iostream>
using namespace std;

//Function signature;
void CounTing(int n){
    // Function body; 
    for (int i=0;i<=n;i++){
      cout<<i<<" ";
    }
    cout<<endl;
}

int main(){
    int a;
    cout<<"How many nuber are disply=";
    cin>>a;
    //function call
    CounTing(a);
    return 0;
}