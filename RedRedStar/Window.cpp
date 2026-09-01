#include "Env.h"
#include <dwmapi.h>
#include "Window.h"
#include "Page.h"

std::unordered_map<HWND, std::unique_ptr<Window>> windows;
Window::Window()
{
}

Window::~Window()
{
}
Window* Window::create()
{
    auto win = std::make_unique<Window>();
    win->createWin();
    auto result = win.get();
    windows.insert({ win->hwnd ,std::move(win) });
    return result;
}
LRESULT Window::winMsg(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    auto self = reinterpret_cast<Window*>(GetWindowLongPtr(hwnd, GWLP_USERDATA));
    if (!self) return DefWindowProc(hwnd, msg, wParam, lParam);
    if (msg == WM_SIZE) {
        self->onSize(wParam, lParam);
    }
    else if (msg == WM_DESTROY) {
        self->onDestroy();
    }
    else if (msg == WM_GETMINMAXINFO) {
        self->onGetMinMaxInfo((PMINMAXINFO)lParam);
    }
    return DefWindowProc(hwnd, msg, wParam, lParam);
}

void Window::createWin()
{
    WNDCLASSEXW wcex;
    wcex.cbSize = sizeof(WNDCLASSEX);
    wcex.style = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc = &Window::winMsg;
    wcex.cbClsExtra = 0;
    wcex.cbWndExtra = 0;
    wcex.hInstance = GetModuleHandle(nullptr);
    wcex.hIcon = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_WINLOGO);
    wcex.hIconSm = LoadIcon(wcex.hInstance, (LPCTSTR)IDI_WINLOGO);
    wcex.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wcex.hbrBackground = (HBRUSH)COLOR_WINDOW;
    wcex.lpszMenuName = nullptr;
    wcex.lpszClassName = L"Sample";
    RegisterClassEx(&wcex);
    hwnd = CreateWindowEx(WS_EX_APPWINDOW, wcex.lpszClassName, wcex.lpszClassName, WS_POPUP,
        200, 300, 1000, 800, nullptr, nullptr, wcex.hInstance, nullptr);
    SetWindowLongPtr(hwnd, GWLP_USERDATA, reinterpret_cast<LONG_PTR>(this));
    MARGINS margins = { 1, 1, 1, 1 };
    DwmExtendFrameIntoClientArea(hwnd, &margins);
    int value = 2;
    DwmSetWindowAttribute(hwnd, DWMWA_NCRENDERING_POLICY, &value, sizeof(value));
    DwmSetWindowAttribute(hwnd, DWMWA_ALLOW_NCPAINT, &value, sizeof(value));

    auto wvEnv = Env::getWebViewEnv();
    auto ctrlReadyCB = Callback<ICoreWebView2CreateCoreWebView2ControllerCompletedHandler>(this, &Window::onCtrlReady);
    wvEnv->CreateCoreWebView2Controller(hwnd, ctrlReadyCB.Get());
}

void Window::show(const JsonObject& params, JsonObject& result)
{
    ShowWindow(hwnd, SW_SHOW);
    ctrl->put_IsVisible(TRUE);
}

void Window::hittest(const JsonObject& params, JsonObject& result)
{
    ReleaseCapture();
    auto val = (int)params.GetNamedObject(L"args").GetNamedNumber(L"val");
    PostMessage(hwnd, WM_NCLBUTTONDOWN, val, 0);
}
void Window::minimize(const JsonObject& params, JsonObject& result)
{
    ctrl->NotifyParentWindowPositionChanged();
    HWND hwndWebView = FindWindowEx(hwnd, nullptr, L"Chrome_WidgetWin_0", nullptr);
    PostMessage(hwndWebView, WM_MOUSELEAVE, 0, 0);
    HWND hwndInner = FindWindowEx(hwndWebView, nullptr, NULL, nullptr);
    PostMessage(hwndInner, WM_MOUSELEAVE, 0, 0);
    ShowWindow(hwnd, SW_MINIMIZE);
}
void Window::maximize(const JsonObject& params, JsonObject& result)
{
    ShowWindow(hwnd, SW_MAXIMIZE);
}
void Window::restore(const JsonObject& params, JsonObject& result)
{
    ShowWindow(hwnd, SW_RESTORE);
}

HRESULT Window::onCtrlReady(HRESULT result, ICoreWebView2Controller* ctrl)
{
    this->ctrl = ctrl;
    ComPtr<ICoreWebView2> webview;
    ctrl->get_CoreWebView2(&webview);
    RECT bounds;
    GetClientRect(hwnd, &bounds);
    ctrl->put_Bounds(bounds);
    page = std::make_unique<Page>(this, webview);
    return S_OK;
}
void Window::onSize(WPARAM wParam, LPARAM lParam)
{
    if (!ctrl.Get()) return;
    if (wParam == SIZE_MAXIMIZED) {
        JsonObject jsonObj;
        jsonObj.SetNamedValue(L"eventName", JsonValue::CreateStringValue(L"maximize"));
        page->emit(jsonObj);
    }
    else if (wParam == SIZE_RESTORED) {
        JsonObject jsonObj;
        jsonObj.SetNamedValue(L"eventName", JsonValue::CreateStringValue(L"restore"));
        page->emit(jsonObj);
    }
    RECT bounds = { 0, 0, LOWORD(lParam), HIWORD(lParam) };
    ctrl->put_Bounds(bounds);
}
void Window::onDestroy()
{
    windows.erase(hwnd);
    if (windows.empty()) {
        PostQuitMessage(0);
    }
}

void Window::onGetMinMaxInfo(MINMAXINFO* mmi)
{
    RECT workAreaRect;
    BOOL getWorkAreaSuccess = SystemParametersInfo(SPI_GETWORKAREA, 0, &workAreaRect, 0);
    mmi->ptMaxPosition.x = workAreaRect.left;
    mmi->ptMaxPosition.y = workAreaRect.top;
    mmi->ptMaxSize.x = workAreaRect.right - workAreaRect.left;
    mmi->ptMaxSize.y = workAreaRect.bottom - workAreaRect.top;
    mmi->ptMinTrackSize.x = 500;
    mmi->ptMinTrackSize.y = 388;
}

