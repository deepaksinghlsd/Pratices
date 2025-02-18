#include<iostream>
using namespace std;
int main(){
    int n;
    cout<<"ENTER THE NUBER:=";
    cin>>n;
    // int sum =0;
    // for (int  i = 0; i < n; i++)
    // {
    //     sum=sum+i;
       
    // }
    // cout<<"The sum of n number:"<<sum;
    //sum of n natural nuber.
    //*fibonacci serise:
    int sum=0;
    int sum1=1;
    cout<<sum<<sum1;
    for(int i =1; i<=n;i++){
        int fab= sum+sum1;
        cout<<fab;
        sum=sum1;
        sum1=fab;

    }
}