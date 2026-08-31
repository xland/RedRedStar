#pragma once
#include <filesystem>
#include <Windows.h>
#include <shlobj.h>
#include <shlwapi.h>
#include <WebView2.h>
#include <wrl.h>
#include <dispatcherqueue.h>
#include <winrt/Windows.Foundation.h>
#include <winrt/Windows.System.h>
#include <winrt/Windows.Data.Json.h>

using namespace Microsoft::WRL;
using namespace winrt::Windows::Data::Json;

class Window;
class Env
{
public:
	Env();
	~Env();
	static void init();
	static std::filesystem::path getDataPath();
	static ICoreWebView2Environment* getWebViewEnv();
	static winrt::Windows::System::DispatcherQueue& getDispatcherQueue();
public:
private:
	void checkRuntimeVersion();
	bool checkRegKey(const HKEY& key, const std::wstring& subKey);
	void initDataPath();
	void initWebViewEnv();
	static void initDispatcherQueueCtrl();
	HRESULT onEnvReady(HRESULT result, ICoreWebView2Environment* env);
private:
	std::filesystem::path dataPath; 
	ComPtr<ICoreWebView2Environment> webViewEnv;
	std::unique_ptr<Window> mainWindow;
	winrt::Windows::System::DispatcherQueue dq;
};

