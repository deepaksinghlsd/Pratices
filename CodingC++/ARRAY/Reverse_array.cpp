#include<iostream>
using namespace std;

void ReverseArr(int arr[], int size){
    
    for ( int i =(size-1) ;  i>=0; i--)
    {  
        cout<< arr[i]<<" ";
    }
   
}

int main(){
    int size;
    cout<<"Enter the size of the arry=";
    cin>>size;
    cout<<"Enter the arry element: ";
    int arr[size];
    for (int i = 0; i < size; i++)
    {
       cin>>arr[i];
    }
    cout<<"Reverse string:"<<endl;
    ReverseArr(arr,size);
    return 0;

}