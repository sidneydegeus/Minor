#include <iostream>
#include <string>
#include <math.h>
using namespace std;

int sum(int input1, int input2);
string evenOrOdd(int input);
int exponentFunc(int base, int exponent);
string isPrimeNumber(int input);

int main() {
	cout << "Sum of 3 and 5 is: " << sum(3, 5) << endl;
	cout << "Number 5 is an " << evenOrOdd(5) << endl;
	cout << "Number 4 is an " << evenOrOdd(4) << endl;
	cout << "exponent of 5^4 is " << exponentFunc(5, 4) << endl;
	cout << "6 is " << isPrimeNumber(6) << endl;
	cout << "7 is " << isPrimeNumber(7) << endl;
	return 0;
}

int sum(int input1, int input2) {
	return input1 + input2;
}

string evenOrOdd(int input) {
	string result;
	if (input % 2 == 0) {
		result = "Even number";
	} 
	else {
		result = "Uneven number";
	}
	return result;
}

int exponentFunc(int base, int exponent) {
	cout << exponent << endl;
	if (exponent >= 1) {
		return base * (exponentFunc(base, exponent-1));
	}
	else {
		return 1;
	}
}

string isPrimeNumber(int input) {
	if (input < 2) {
		return "Not a prime number";
	}
	for (int i = 2; i < sqrt(input); i++) {
		if ((input % i) == 0) {
			return "Not a prime number";
		}
	}
	return "a Prime number";
}


