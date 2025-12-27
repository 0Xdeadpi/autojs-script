// === 一键启动大牛路线模拟 + 微信小程序登录自动化（2025优化版） ===
// 特点：固定坐标为主 + 文字兜底 + 38秒延迟弹窗 + 向上滑动打开小程序
// 最后确认框：只保留“是/否”，无最小化

auto.waitFor();
toast("正在启动大牛路线模拟...");

// 1. 强制回到桌面
click(device.width / 2, device.height - 80);
sleep(2000);

// 2. 打开 Daniu大牛 App
if (text("Daniu大牛").exists() || desc("Daniu大牛").exists()) {
    var appIcon = text("Daniu大牛").findOne(5000) || desc("Daniu大牛").findOne(5000);
    if (appIcon) {
        toast("找到大牛图标，正在打开...");
        appIcon.click();
    } else {
        toast("未找到“Daniu大牛”图标，请确认在当前桌面");
        exit();
    }
} else {
    toast("未找到“Daniu大牛”图标，请确认在当前桌面");
    exit();
}
sleep(4500);

// 3. 等待主页面加载
toast("等待大牛主页面加载...");
if (!textContains("模拟").findOne(15000)) {
    toast("主页面加载超时，可能网络或版本问题");
    exit();
}
toast("主页面已加载");

// 4. 点击「路线模拟」
toast("进入路线模拟...");
click(899, 772);
sleep(1800);

// 5. 点击「开启微信权限 + 开始模拟」
toast("开启微信权限并启动模拟...");
click(974, 294);
sleep(1200);

// 6. 返回桌面
toast("模拟已启动，返回桌面...");
home();
sleep(2200);

// 7. 打开微信
toast("打开微信...");
launchApp("微信");
sleep(4500);

// 8. 自动点击「用短信验证码登录」
toast("等待登录页面...");
toast("自动寻找「用短信验证码登录」");

let loginFound = false;
for (let i = 0; i < 100; i++) {
    sleep(1000);
    if (text("用短信验证码登录").bounds(54, 814, 358, 866).exists()) {
        click((54 + 358) / 2, (814 + 866) / 2);
        toast("已点击「用短信验证码登录」");
        sleep(300);
        loginFound = true;
        break;
    } else if (text("用短信验证码登录").exists()) {
        let btn = text("用短信验证码登录").findOne(1000);
        if (btn) {
            let b = btn.bounds();
            click(b.centerX(), b.centerY());
            toast("兜底点击「用短信验证码登录」");
            sleep(300);
            loginFound = true;
            break;
        }
    }
}
if (!loginFound) {
    toast("100秒内未找到「用短信验证码登录」");
    exit();
}

// 9. 自动点击「获取验证码」
toast("等待「获取验证码」按钮...");
let codeFound = false;
for (let i = 0; i < 45; i++) {
    sleep(1000);
    if (text("获取验证码").bounds(726, 630, 1005, 716).exists()) {
        click((726 + 1005) / 2, (630 + 716) / 2);
        toast("已点击「获取验证码」");
        codeFound = true;
        break;
    } else if (text("获取验证码").exists()) {
        let btn = text("获取验证码").findOne(1000);
        if (btn && btn.enabled()) {
            let b = btn.bounds();
            click(b.centerX(), b.centerY());
            toast("兜底点击「获取验证码」");
            codeFound = true;
            break;
        }
    }
}

if (!codeFound) {
    toast("45秒内未找到「获取验证码」");
    toast("请检查网络或页面");
} else {
    // 10. 等待手动操作 + 38秒后弹出确认框（向上滑动）
    toast("验证码已发送，请手动完成：");
    toast("1. 滑动验证（如有）");
    toast("2. 输入验证码");
    toast("3. 点击登录");
    toast("→ 10秒后将弹出确认窗口");

    sleep(38000);  // 38秒手动操作时间

    // 弹出简单确认框（是/否）
    var isSuccess = dialogs.confirm(
        "是否已经成功进入微信小程序？",
        "点击【是】 → 3.5秒后自动**向上**滑动尝试打开小程序页面\n点击【否】 → 结束脚本"
    );

    if (isSuccess) {
        toast("好的！3.5秒后开始自动向上滑动...");
        sleep(3500);

        // 向上滑动：从屏幕下部 → 上部
        swipe(device.width / 2, device.height * 0.22,   // 起点：屏幕偏下
              device.width / 2, device.height * 0.78,   // 终点：屏幕偏上
              850);

        toast("已尝试向上滑动，希望成功进入小程序页面");
        sleep(1500);
        toast("脚本执行完毕，祝运动愉快！");
    } else {
        toast("脚本结束～ 请手动完成剩余操作");
    }
}