from playwright.sync_api import Playwright, sync_playwright


def run(playwright: Playwright) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()

    # Open new page
    page = context.new_page()

    # Go to https://www.baidu.com/
    page.goto("https://www.baidu.com/")

    # Click input[name="wd"]
    page.click("input[name=\"wd\"]")

    # Fill input[name="wd"]
    page.fill("input[name=\"wd\"]", "ces1")

    # Double click input[name="wd"]
    page.dblclick("input[name=\"wd\"]")

    # Fill input[name="wd"]
    page.fill("input[name=\"wd\"]", "测试")

    # Click text=百度一下
    # with page.expect_navigation(url="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%B5%8B%E8%AF%95&fenlei=256&rsv_pq=e17bb7ad0004e604&rsv_t=908esEY0kH4X3dkvLjMNEKTyMiToYi4n6lQ2yn%2BQD5ISV2zO%2BzwvVw8n1%2BE&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=11&rsv_sug1=16&rsv_sug7=100&rsv_btype=i&inputT=6878&rsv_sug4=7865&rsv_jmp=fail"):
    with page.expect_navigation():
        page.click("text=百度一下")
    # assert page.url == "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%B5%8B%E8%AF%95&fenlei=256&rsv_pq=e17bb7ad0004e604&rsv_t=908esEY0kH4X3dkvLjMNEKTyMiToYi4n6lQ2yn%2BQD5ISV2zO%2BzwvVw8n1%2BE&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_sug3=11&rsv_sug1=16&rsv_sug7=100&rsv_btype=i&inputT=6878&rsv_sug4=7865"

    # Close page
    page.close()

    # ---------------------
    context.close()
    browser.close()


with sync_playwright() as playwright:
    run(playwright)
