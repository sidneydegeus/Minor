#include "MyClass.h"

void main() {
	MyClass thing1;
	MyClass thing2(2, 3);
	thing1.print();
	thing2.print();
	MyClass list[3];
	int i;
	for (i = 0; i < i < 3; i++ ) {
		list[i].print();
	}
	MyClass* pointer;
	pointer = new MyClass;
	pointer->print();
	delete pointer;
	pointer = new MyClass[4];
	for (i = 0; i < 4; i++) {
		pointer[i].print();
	}
	delete[] pointer;
}