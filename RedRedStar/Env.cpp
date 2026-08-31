#include <WebView2EnvironmentOptions.h>

#include "Env.h"
#include "Window.h"
std::unique_ptr<Env> env;
Env::Env() :dq{ winrt::Windows::System::DispatcherQueue::GetForCurrentThread() }
{}
Env::~Env(){}
void Env::init()
{
    Env::initDispatcherQueueCtrl();
	env = std::make_unique<Env>();
	env->checkRuntimeVersion();
    env->initDataPath();
    env->initWebViewEnv();
}

void Env::initDispatcherQueueCtrl()
{
    DispatcherQueueOptions options{
        sizeof(DispatcherQueueOptions),
        DQTYPE_THREAD_CURRENT,
        DQTAT_COM_NONE
    };
    static winrt::Windows::System::DispatcherQueueController controller{ nullptr };
    auto hr = CreateDispatcherQueueController(options,
        reinterpret_cast<ABI::Windows::System::IDispatcherQueueController**>(winrt::put_abi(controller)));
    if (FAILED(hr))
    {
        MessageBox(NULL, L"无法创建DispatcherQueueController", L"系统提示", MB_OK);
        ExitProcess(-1);
    }
}

void Env::checkRuntimeVersion()
{
    std::wstring regSubKey = L"\\Microsoft\\EdgeUpdate\\Clients\\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}";
    bool hasRuntime = checkRegKey(HKEY_LOCAL_MACHINE, L"SOFTWARE\\WOW6432Node" + regSubKey);
    if (hasRuntime) return;
    hasRuntime = checkRegKey(HKEY_CURRENT_USER, L"Software" + regSubKey);
    if (!hasRuntime) {
        auto hr = MessageBox(nullptr, L"需要安装 WebView2 运行时才能继续使用。\n\n是否立即跳转到下载页面？", L"系统提示", MB_YESNO | MB_ICONQUESTION);
        if (hr == IDYES) {
            std::wstring downloadUrl{ L"https://go.microsoft.com/fwlink/p/?LinkId=2124703" };
            ShellExecute(nullptr, L"open", downloadUrl.data(), nullptr, nullptr, SW_SHOWNORMAL);
        }
        ExitProcess(-1);
    }
}
bool Env::checkRegKey(const HKEY& key, const std::wstring& subKey) {

    DWORD valueSize = 0;
    auto rc = RegGetValue(key, subKey.c_str(), L"pv", RRF_RT_REG_SZ, nullptr, nullptr, &valueSize);
    if (rc != ERROR_SUCCESS && rc != ERROR_MORE_DATA) return false;
    if (valueSize <= sizeof(wchar_t)) return false;
    std::wstring valueBuf;
    valueBuf.resize(valueSize / sizeof(wchar_t));
    rc = RegGetValueW(key, subKey.c_str(), L"pv", RRF_RT_REG_SZ, nullptr, valueBuf.data(), &valueSize);
    if (rc != ERROR_SUCCESS) return false;
    valueSize /= sizeof(wchar_t);
    if (valueSize > 0) valueBuf.resize(valueSize - 1); //去掉终止符
    if (valueBuf.empty()) return false;
    std::wstringstream ss(valueBuf.data());
    std::vector<int> versions;
    std::wstring segment;
    while (std::getline(ss, segment, L'.'))
    {
        if (!segment.empty())
        {
            versions.push_back(std::stoi(segment)); // 宽字符转整数，结尾处有非数字字符也没有问题
        }
    }
    std::vector<int> minVersion = { 115, 0, 1901, 177 };
    if (versions < minVersion) return false;
    return true;
}

std::filesystem::path Env::getDataPath()
{
    return env->dataPath;
}
ICoreWebView2Environment* Env::getWebViewEnv()
{
    return env->webViewEnv.Get();
}

winrt::Windows::System::DispatcherQueue& Env::getDispatcherQueue()
{
    return env->dq;
}

void Env::initDataPath()
{
    PWSTR pathTmp;
    auto hr = SHGetKnownFolderPath(FOLDERID_RoamingAppData, 0, nullptr, &pathTmp);
    dataPath.assign(pathTmp);
    CoTaskMemFree(pathTmp);
    dataPath.append("Sample");
}

void Env::initWebViewEnv()
{
    auto options = Microsoft::WRL::Make<CoreWebView2EnvironmentOptions>();
    auto envReadyCB = Callback<ICoreWebView2CreateCoreWebView2EnvironmentCompletedHandler>(this, &Env::onEnvReady);
    CreateCoreWebView2EnvironmentWithOptions(nullptr, dataPath.c_str(), options.Get(), envReadyCB.Get());
}

HRESULT Env::onEnvReady(HRESULT result, ICoreWebView2Environment* env)
{
    if (FAILED(result)) {
        MessageBox(nullptr, L"WebView2环境初始化失败", L"系统提示", MB_OK);
        ExitProcess(-1);
    }
    webViewEnv = env;
    Window::create(L"https://app.localhost/index.html");
    return S_OK;
}
