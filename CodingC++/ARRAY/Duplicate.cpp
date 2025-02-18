#include<iostream>
using namespace std;

int Duplicate(int arr[], int size ){
    int ans =1;
    for (int  i = 0; i < size; i++)
    {
        ans= ans^arr[i];
    }
    return ans;
}

int main(){

   int Arr[10]={1,2,3,4,5,6,7,8,9,7}; 
   cout<<"Duplicate element are:="<<Duplicate(Arr,10);
   return 0;
}