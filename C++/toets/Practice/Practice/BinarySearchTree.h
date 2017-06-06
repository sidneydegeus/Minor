#ifndef BST_HEADER
#define BST_HEADER

template<typename T>
struct Node {
	T info;
	Node* leftNode;
	Node* rightNode;
};

template<typename T>
class BST {
private:
	Node<T>* root;

public:
	BST();
	~BST();
	void insert(T x);
	Node<T>* createLeaf(T x);
	void createTree(T x, Node<T>* node);
	Node<T>* removePieceOfTree(T x, Node<T>* node);
	void traverse();
	void remove(T x);
	void inOrderTraverse(Node<T>* node);
	void preOrderTraverse(Node<T>* node);
	void postOrderTraverse(Node<T>* node);
};

#endif