#include<iostream>
using namespace std;
int GetPivot(int arr[], int n){
    int s= 0;
    int e = n-1;
    int mid = s+(e-s)/2;
    while (s<e)
    {
        if (arr[mid]>=arr[0]){
            s = mid+1;
        }
        else{
            e=mid;
        }
        mid = s+(e-s)/2;
    }
    return s;
    
}

int main(){
    int arr[5]={3, 8,1,2,3};
    cout<<"The pivot element are "<<GetPivot(arr, 5);

}
