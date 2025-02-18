#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"Enter the nuber you of row and coloum:=";
    cin>>n;
    // int count=0;
    // int i=1;
    // while (i<=n)
    // {
    //     int j=1;
    //     while (j<=n)
    //     {
    //         count=count+1;
    //         cout<<count<<" ";
    //         j++;
    //         // count++;
    //     }
    //     cout<<endl;
    //     i++;
    //     //1234
    //     //5678
    //     //9101112
    //     //13141516
    //     //17181920
    // }
    // int i=1;
    // while (i<=n)
    // {
    //     int j=1;
    //     while (j<=i)
    //     {
    //         cout<<"*";
    //         j++;
    //     }
    //     cout<<endl;
    //     i++;
        
    // }
    // *
    // **
    // ***OUT PUT OF THE PROGRMAN:
    //int count =1;
    // int i=1;
    // while (i<=n)
    // {
    //     int j=0;
    //     //int k=i;
    //     while (j<i)
    //     {
    //        cout<<j+i;
    //        j++;
    //     }
    //     cout<<endl;
    //     i++;
        // 1
        //23
        //345
        //4567
        
  //  }
    // int i=1;
    // while (i<=n)
    // {
    //     int j=0;
    //     while (j<i)
    //     {
    //         cout<<i-j;
    //         j++;
    //     }
    //     cout<<endl;
    //     i++;
    // }
    // 1
    // 23
    // 321
    // 4321 out put of this program:
    // int i=1;
    // while (i<=n)
    // {
    //     int j=0;
    //     while (j<n)
    //     {
    //         int k=i+j;
    //         char ch ='A'+k-1;
    //        cout<<ch<<" ";
    //        j++;
    //     }
    //     cout<<endl;
    //     i++;
    // }
    // A B C D 
    // B C D E
    // C D E F// tHIS is output of this code
    int i =1;
    while (i<=n)
    {
        int j=1;
        char ch='A'+n-i;
        while (j<=i)
        {
           cout<<ch<<" ";
           ch++;
           j++;
        } 
        cout<<endl;
        i++;
    }
    //    D
    //    C D
    //    B C 
    //    A B C D
}