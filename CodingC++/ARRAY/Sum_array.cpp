#include<iostream>
using namespace std;

int Sumarray(int arr[], int size){
    int sum =0;
    for (int i =0; i<size; i++){
        sum = sum +arr[i];
    }
    return sum;
}

int main(){
    cout<<"Enter the size of array=";
    int size;
    cin>>size;
    cout<<"Enter the array element:=";
    int arr[100];
    for (int i = 0; i < size; i++)
    {
        cin>>arr[i];
    }
    cout<<"sum of array="<<Sumarray(arr,size)<<endl;
     return 0;
}