#include<iostream>
using namespace std;

bool Search(int arr[], int size, int key){
    for(int i =0; i<size; i++){
        if (arr[i]==key){
            return 1;
        }
    }
    return 0;
}

int main(){
    int arr[10]={1, 5, 7 ,8, 10,-1,23,45,22};
    cout<<"Enter the search  element: ";
    int key;
    cin>>key;
    bool found = Search(arr , 10, key);
    if(found){
        cout<<"Key are present";
    }else{
        cout<<"Key are not present ";
    }


    return 0;
}
