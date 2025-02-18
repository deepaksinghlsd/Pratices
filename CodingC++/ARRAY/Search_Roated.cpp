#include<iostream>
usingnamespace std;
int getPivot(int arr[],int n){
    int s=0;
    int e = n-1;
 
    while (s<e)
    {
        if(arr[mid]>=arr[0]){
            s=mid+1;
        }
        else{
            e=mid;
        }
        mid = s +(e-s)/2;
    }
    return s;
}

int Binary(int arr[],int n ,int key){
    int s =0;
    int e =n-1;
    int mid = s+(e-s)/2;
    while (s<e)
    {
      if(arr[mid]==key){
        return mid;
      }

      if(arr[mid]<key){
        s= mid+1;
      }
      else if(arr[mid]>key){
        e=mid-1;
      }
      else{
        e=mid-1;
      }
      return -1;
    }
}


    int findPosition(int arr[], int n, int key) {
        int pivot = getPivot(arr,n);
        if (key >= arr[pivot]&&k<=arr[n-1]){
            return Binary(arr,pivot,n-1,key);
        }
        else{
            return Binary(arr,0,pivot-1, key );
        }

    }

  int main() {
        int arr=[4,5,6,1,2,3,4];
        int key =2;
        cout << "The position of key are"findPostion(arr,7,2);
    }