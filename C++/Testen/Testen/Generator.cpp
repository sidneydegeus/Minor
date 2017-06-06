#include <iostream>
#include <cstdlib>
#include <time.h>
#include "Generator.h"

using namespace std;

Generator::Generator() {
	
}

Generator& Generator::GetInstance() {
	static Generator instance;
	return instance;
}

int Generator::Generate(char* pointer) {
	
	//Random number
	int number = rand();

	//Set seed
	srand(number);

	//Use scaling (1 to 10)
	const int numberInArray = rand() % 10 + 1;

	////Create char array

	//char myArray[numberInArray];
	arr = new char[numberInArray]();
	*pointer = *arr;
	//*arr = myArray;

	for (int i = 0; i < numberInArray; i++) {
		arr[i] = 'a';
	}



	//pointer

	////Fill char array with U, R, D, L

	////Use scaling (1 to 4)
	//int numberInArray_2 = rand() % 4 + 1;

	//for (int i = 0; i < numberInArray; i++) {
	//	if (numberInArray_2 == 1)
	//		arr[i] = 'U';
	//	if (numberInArray_2 == 2)
	//		arr[i] = 'R';
	//	if (numberInArray_2 == 3)
	//		arr[i] = 'D';
	//	if (numberInArray_2 == 4)
	//		arr[i] = 'L';
	//}

	//int sizeOfArray = sizeof(arr) / sizeof(*arr);

	return numberInArray;

}