/*
e)	(10 points) Create a function “remove(…)” that lets you remove the given element from the tree. Make sure it only removes that element (and not the subtree) and 
that the tree remains correct.
*/

#include <iostream>
#include "BinarySearchTree.h"

using namespace std;

int main() {
	BST<char> tree;
	cout << "Adding..." << endl;
	tree.insert('b');
	tree.insert('a');
	tree.insert('c');
	tree.insert('d');
	tree.insert('f');
	
	cout << "Traversing..." << endl;
	tree.traverse();

	cout << "Removing b..." << endl;
	tree.remove('b');

	cout << "Traversing..." << endl;
	tree.traverse();
}