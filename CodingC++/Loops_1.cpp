# include<iostream>
using namespace std;

int main(){
    // Check the LATTER is UPPER case or Lower case:
    char ch;
    // cout<<"Enter the chracter value: \n";
    // cin>>ch;
    // if(ch>=65 && ch<=90){
    //     cout<<"The latter is upper case:\n";
    // }
    // else if(ch>=97 && ch<=122){
    //     cout<<"The letter is lower case: \n";
    // }
    // else{
    //     cout<<"the letter is number: \n";
    // }


    // Sum of N natural number whis is given bybthe user:
    // int n;
    // cout<<"Enter the nuber:=";
    // cin>>n;
    // int sum =0;
    // int i=1;
    // while (i<=n){
    //     sum = sum+i;
    //     i++; 
    // }
    // cout<<"The of n naturare number is:= "<<sum<<endl;
    

    // CHEAK THE GIVEN NUBER IDS PRIME OR NOTE:
    int n ;
    cout<<"Enetr the nuber you want to chek:= ";
    cin>>n;
    int i=2;
    while (i<n)
    {
        if(n%i==0){
            cout<<"nuber is not prime ";
        }
        else{
            cout<<"Number is prime:";
        }
        i++;
    }
    
}
