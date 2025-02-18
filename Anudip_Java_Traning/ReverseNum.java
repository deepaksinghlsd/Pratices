public class ReverseNum {
    public static void main(String[] args) {
        int num;
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a number: ");
        num = scanner.nextInt();
        if(num<0){
            num=-num;
        }
    }
}
