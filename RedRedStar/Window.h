#pragma once
#include "Env.h"

class Page;
class Window
{
public:
	Window(const std::wstring& url);
	~Window();
	static Window* create(const std::wstring& url);
	void show(const JsonObject& params, JsonObject& result);
	void hittest(const JsonObject& params, JsonObject& result);
	void minimize(const JsonObject& params, JsonObject& result);
	void maximize(const JsonObject& params, JsonObject& result);
	void restore(const JsonObject& params, JsonObject& result);
public:
	HWND hwnd;
private:
	static LRESULT CALLBACK winMsg(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam);
	void createWin();
	HRESULT onCtrlReady(HRESULT result, ICoreWebView2Controller* ctrl);
	void onSize(WPARAM wParam, LPARAM lParam);
	void onDestroy();
	void onGetMinMaxInfo(MINMAXINFO* mmi);
private:
	std::unique_ptr<Page> page;
	ComPtr<ICoreWebView2Controller> ctrl;
	std::wstring url;
};

