#include<iostream>
using namespace std;
int getMax(int num[], int n){
    int max =INT_MIN;
    for (int i = 0; i < n; i++)
    {
       if(num[i] > max){
        max=num[i];
       }
    }
    return max; 
}

int main(){
   int size ;
   cout<<"Enter the size of array=";
   cin>>size;
   cout<<"Enter the element=";
   int num[100];
   for (int i = 0; i <size ; i++)
   {
     cin>>num[i];
   }
   cout<<"The max value is ="<<getMax(num,size)<<endl;
   //cout<<"The Minmum value is ="<<getMin(num,size)<<endl;
   return 0;

}