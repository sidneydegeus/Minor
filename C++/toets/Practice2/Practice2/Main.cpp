
#include <iostream>
#include <string>
#include <fstream>
#include <sstream>

using namespace std;

void makeTxtFile(char[]);
void printElements(char[]);
void writeFile(char[]);

int main(){
	char fileName[] = "txtBestand.txt";
//	makeTxtFile(fileName);
	writeFile(fileName);
	printElements(fileName);
}

void makeTxtFile(char fileName[]) {
	ofstream file;
	file.open(fileName);
}

void printElements(char fileName[]) {
	ifstream file;
	file.open(fileName);

	string line;

	if (file.is_open()) {
		while (getline(file, line))
			cout << line << endl;		
	}
	file.close();
}

void writeFile(char fileName[]) {
	char theArray[] = "S45443554idney1234567890HoudtVanPiemels123496396";
	int length = strlen(theArray);

	ofstream file;
	file.open(fileName);
	for (int i = 0; i < length; i++) {
		if (theArray[i] != '0' && theArray[i] != '1' && theArray[i] != '2' && theArray[i] != '3' && theArray[i] != '4' && theArray[i] != '5' && theArray[i] != '6' && theArray[i] != '7' && theArray[i] != '8' && theArray[i] != '9') {
			file << theArray[i];
		}
	}
	file.close();
}