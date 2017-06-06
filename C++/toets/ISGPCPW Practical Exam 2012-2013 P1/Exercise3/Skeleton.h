#ifndef Skeleton_H
#define Skeleton_H

#include "Win.h"

class CSkeleton : public CWin
{
public:
	CSkeleton();
	~CSkeleton();

	LRESULT MsgProc(HWND, UINT, WPARAM, LPARAM);
};

#endif
