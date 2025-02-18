#include<iostream>
using namespace std;

int Binarysearch(int arr[],int size, int key){
    int start = 0;
    int end = size-1;
    int mid = (start+end)/2;
    while (start<=mid)
    {
        if(arr[mid]==key){
            return mid;
        }
        if(key>arr[mid]){
            start=mid+1;
        }
        else //key<arr[mid]
        {
            end=mid-1;
        }
        mid=(start+end)/2;
         
    }
    return -1;
    
}
int main(){
    int arr [10]={1,3,5,6,9,10,21,34,21,34};
    cout<<"The index of 10 is "<<Binarysearch(arr,10,10);
    return 0;
}