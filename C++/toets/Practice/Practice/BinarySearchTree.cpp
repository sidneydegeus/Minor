#include <iostream>
#include "BinarySearchTree.h"

using namespace std;

template class BST<char>;
template class BST<double>;

template<typename T>
BST<T>::BST() {
	root = NULL;
}

template<typename T>
BST<T>::~BST() {

}

template<typename T>
void BST<T>::insert(T x) {
	if (root == NULL) 
		root = createLeaf(x);
	else
		createTree(x, root);	
}

template<typename T>
Node<T>* BST<T>::createLeaf(T x) {
	Node<T>* newNode = new Node<T>;
	newNode->info = x;
	newNode->leftNode = NULL;
	newNode->rightNode = NULL;
	return newNode;
}

template<typename T>
void BST<T>::createTree(T x, Node<T>* node) {
	//Left node lager?
	if (x < node->info) {
		if (node->leftNode == NULL)
			node->leftNode = createLeaf(x);
		else
			createTree(x, node->leftNode);
	}

	//Left node hoger
	if (x > node->info) {
		if (node->rightNode == NULL)
			node->rightNode = createLeaf(x);
		else
			createTree(x, node->rightNode);
	}
}

template<typename T>
void BST<T>::traverse() {
	inOrderTraverse(root);
//preOrderTraverse(root);
//	postOrderTraverse(root);
}

template<typename T>
void BST<T>::inOrderTraverse(Node<T>* node) {
	//L Node R
	if (node != NULL) {
		inOrderTraverse(node->leftNode);
		cout << node->info << endl;
		inOrderTraverse(node->rightNode);
	}
}

template<typename T>
void BST<T>::preOrderTraverse(Node<T>* node) {
 //Node L R
	if (node != NULL) {
		cout << node->info << endl;
		inOrderTraverse(node->leftNode);
		inOrderTraverse(node->rightNode);
	}
}

template<typename T>
void BST<T>::postOrderTraverse(Node<T>* node) {
 //L R Node
	if (node != NULL) {
		inOrderTraverse(node->leftNode);
		inOrderTraverse(node->rightNode);
		cout << node->info << endl;
	}
}

template<typename T>
void BST<T>::remove(T x) {
	root = removePieceOfTree(x, root);
}

template<typename T>
Node<T>* BST<T>::removePieceOfTree(T x, Node<T>* node) {
	Node<T>* tempNode;

	if (node == NULL) {
		return NULL;
	}

	if (x < node->info) {
		node->leftNode = removePieceOfTree(x, node->leftNode);
		return node;
	}

	if (x > node->info) {
		node->rightNode = removePieceOfTree(x, node->rightNode);
		return node;
	}

	//Leaf node
	if (node->leftNode == NULL && node->rightNode == NULL) {
		delete node;
		return NULL;
	}

	//1 leaf node
	if (node->leftNode == NULL || node->rightNode == NULL) {
		if (node->leftNode == NULL)
			tempNode = node->rightNode;
		else
			tempNode = node->leftNode;
		delete node;
		return tempNode;
	}

	//2 leaf nodes
	tempNode = node->rightNode;
	while (tempNode->leftNode != NULL)
		tempNode = tempNode->leftNode;

	node->info = tempNode->info;
	tempNode->info = x;
	node->rightNode = removePieceOfTree(x, node->rightNode);
	return node;
}
