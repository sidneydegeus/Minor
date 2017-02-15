#include "MyClass.h"
#include <iostream>
using namespace std;

MyClass::MyClass() {
	x = 0;
	p = new int;
	*p = 0;
}

MyClass::MyClass(int a, int b) {
	x = a;
	p = new int;
	*p = b;
}

MyClass::~MyClass() {
	delete p;
}

void MyClass::print() {
	cout << x << "---" << *p << endl;
}