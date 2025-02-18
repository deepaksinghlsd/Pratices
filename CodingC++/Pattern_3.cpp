#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the matrix row number:=";
    cin>>n;
    // int i=1;
    // while (i<=n)
    // {
    //     int star =i-1;
    //     while (star)
    //     {
    //         cout<<" ";
    //         star--;
    //     }
    //     int j=1;
    //     while (j<=(n-i+1))
    //     {
    //         cout<<i;
    //         j++;
    //     }
    //     cout<<endl;
    //     i++;
   // }
   //    1
   //   12
   //  123
   // 1234
   int i=1;
   while (i<=n)
   {
      int space= n-i;
      while (space)
      {
        cout<<" ";
        space--;
      }
      int j=1;
      while (j<=i)
      {
        cout<<j;
        j++;
      }
      int start=i-1;
      while (start)
      {
        cout<<start;
        start--;
      }
      
      cout<<endl;
      i++;
      
      
   }
   
    
}