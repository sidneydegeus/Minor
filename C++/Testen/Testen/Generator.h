#ifndef HEADER_GENERATOR
#define HEADER_GENERATOR

class Generator {
private:
	Generator();
	char* arr;
public:
	static Generator& GetInstance();
	int Generate(char*);
};

#endif