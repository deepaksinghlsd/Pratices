#include<iostream>
using namespace std;
int Firstoccurance(int arr[],int n, int key){
    int s=0, e= n-1;
    int mid = s+(e-s)/2;
    int ans =-1;
    while(s<=e){
        if(arr[mid]==key){
            ans=mid;
            e = mid-1;
        }
        else if (key > arr[mid])
        {
            s=mid+1;
        }
        else if (key < arr[mid]){
            e=mid-1;
        }
        mid = s+(e-s)/2;
        
    }
    return ans;
}


int Lastoccurance(int arr[],int n, int key){
    int s=0, e= n-1;
    int mid = s+(e-s)/2;
    int ans =-1;
    while(s<=e){
        if(arr[mid]==key){
            ans=mid;
            s = mid+1;
        }
        else if (key > arr[mid])
        {
            s=mid+1;
        }
        else if (key < arr[mid]){
            e=mid-1;
        }
        mid = s + (e-s)/2;
        
    }
    return ans;
}

int main(){
    int arr[9]={1,2,3,3,3,3,5,6,7};
    cout<<"First occerance of key are in index = "<<Firstoccurance(arr,9,3)<<endl;
    cout<<"Last occerance of key are in index = "<<Lastoccurance(arr,9,3)<<endl;
    cout<<"Total no of key are "<<(Lastoccurance(arr,9,3)-Firstoccurance(arr,9,3))+1;

    return 0;

}

