#ifndef MYCLASS_HEADER
#define MYCLASS_HEADER

class MyClass {
private:
	int x;
	int* p;

public:
	MyClass();
	MyClass(int, int);
	~MyClass();

	void print();
};

#endif