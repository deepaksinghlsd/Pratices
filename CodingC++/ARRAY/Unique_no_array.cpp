#include<iostream>
using namespace std;

int Unique(int arr[],int size){
    int ans=0;
    for (int i = 0; i < size; i++)
    {
        ans=ans^arr[i];
    }
    return ans;
    
}

int main(){
    int arr[10]={9,8,7,6,5,6,7,8,9};
    cout<<"Unique element are: "<<Unique(arr,10);
    return 0;
}