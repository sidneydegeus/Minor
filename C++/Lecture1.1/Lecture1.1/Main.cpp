#include <iostream>
using namespace std;

int sum(int input1, int input2);
string evenOrOdd(int input);

int main() {
	cout << "Sum of 3 and 5 is: " << sum(3, 5) << endl;
	return 0;
}

int sum(int input1, int input2) {
	return input1 + input2;
}

string evenOrOdd(int input) {
	string result;
	if (input % 2 == 0) {
		result = "Even number";
	} else {
		result = "Uneven number";
	}
	return result;
}




