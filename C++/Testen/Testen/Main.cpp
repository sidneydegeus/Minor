#include <iostream>
#include "Generator.h"

using namespace std;

int main()
{
	Generator generator = Generator::GetInstance();
	char* arr = new char;
	int lengthOfArray = generator.Generate(arr);
	cout << lengthOfArray << endl << endl;

	for (int i = 0; i < lengthOfArray; i++) {
		cout << arr[i] << " ";
	}

	cout << endl;


	lengthOfArray = generator.Generate(arr);
	cout << lengthOfArray << endl << endl;

	for (int i = 0; i < lengthOfArray; i++) {
		cout << arr[i] << " ";
	}

	cout << endl;
	//int sizeOfArray = sizeof(arr) / sizeof(*arr);
	//cout << sizeOfArray << endl;
}