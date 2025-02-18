#include<iostream>
using namespace std;

void Printarr(int arr[],int n){
    for (int  j = 0; j < n; j++)
    {
       cout<<arr[j]<<" ";
    }cout<<endl;
    
}
void swapfn(int arr[], int size){
    for (int i = 0; i < size; i+=2)
    {
        if ((i+1)<size)
        {
           swap(arr[i],arr[i+1]);
        }
        
    }
    
}


int main(){
    int arr[10]={1,2,3,4,5,6,7,8,9,0};
    cout<<"Swap alternate nuber are= ";
   
    swapfn(arr,10);
    Printarr(arr,10);
    
    return 0;
}

