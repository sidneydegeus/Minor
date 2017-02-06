#include <iostream>
#include <string>
#include <math.h>
using namespace std;

int sum(int input1, int input2);
string evenOrOdd(int input);
int exponentFunc(int base, int exponent);
string isPrimeNumber(int input);
int arrayIndexValue(int input);
void bubbleSort(int numbers[], int size);
void greatestCommonDivisor(int input1, int input2);

int main() {
	// 1
	cout << "Task 1:" << endl;
	cout << "Sum of 3 and 5 is: " << sum(3, 5) << endl;
	cout << endl;

	// 2
	cout << "Task 2:" << endl;
	cout << "Number 5 is an " << evenOrOdd(5) << endl;
	cout << "Number 4 is an " << evenOrOdd(4) << endl;
	cout << endl;

	// 3
	cout << "Task 3:" << endl;
	cout << "exponent of 5^4 is " << exponentFunc(5, 4) << endl;
	cout << endl;

	// 4
	cout << "Task 4:" << endl;
	cout << "6 is " << isPrimeNumber(6) << endl;
	cout << "7 is " << isPrimeNumber(7) << endl;
	cout << endl;

	// 5
	cout << "Task 5:" << endl;
	cout << "input is 7: " << arrayIndexValue(7) << endl;
	cout << "input is 9: " << arrayIndexValue(9) << endl;
	cout << "input is 10, and should be out of bounds, thus return -1.... result: " << arrayIndexValue(10) << endl;
	cout << "input is 15, and should be out of bounds, thus return -1.... result: " << arrayIndexValue(15) << endl;
	cout << endl;

	// 6
	cout << "Task 6:" << endl;
	int numbers[] = { 5, 3, 6, 9, 1 };
	bubbleSort(numbers, 5);
	cout << endl;

	return 0;
}

// 1
int sum(int input1, int input2) {
	return input1 + input2;
}

// 2
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

// 3
// bad way of doing it compared to the other one
int exponentFunc(int base, int exponent) {
	if (exponent >= 1) {
		return base * (exponentFunc(base, exponent-1));
	}
	else {
		return 1;
	}
}

// 3
// more optimized version of exponent (about 8 times faster, see lectures 1.1 teacher realisation solutions1.cpp for explanation)
int exponentFunc_Optimized(int base, int exponent) {
	int result = 1;
	if (exponent == 0)
		return 1;
	if (exponent == 1)
		return base;
	result = exponentFunc_Optimized(base, exponent / 2);
	result *= result;
	if (exponent % 2 == 1)
		result *= base;
	return result;
}

// 4
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

// 5
int arrayIndexValue(int input) {
	int sampleArray[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
	int size = (sizeof(sampleArray) / sizeof(*sampleArray));
	if (input > size - 1) {
		return -1;
	}
	return  sampleArray[input];
}

//6
void bubbleSort(int numbers[], int size) {
	int temp;
	for (int i = 0; i < size; i++) {
		for (int j = 0; j < size; j++) {
			if (numbers[i] < numbers[j]) {
				temp = numbers[j];
				numbers[j] = numbers[i];
				numbers[i] = temp;
			}
		}
	}

	for (int i = 0; i < size; i++) {
		cout << numbers[i] << " ";
	}
}

// 7
void greatestCommonDivisor(int input1, int input2) {

}


