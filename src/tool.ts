import * as vscode from 'vscode'
import { window, env } from 'vscode'
export const openHomePage = (context: vscode.ExtensionContext) => {
  const panel = vscode.window.createWebviewPanel('示例', '示例', vscode.ViewColumn.One, {})

  // 加载插件目录里的图片
  const onDiskPath = vscode.Uri.joinPath(context.extensionUri, 'assets', 'logo.jpg')

  // 转换路径
  const imgSrc = panel.webview.asWebviewUri(onDiskPath)
  console.log(imgSrc)
  panel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cat Coding</title>
      </head>
      <body>
        <img src="${imgSrc}" width="200" />
      </body>
    </html>
  `
}

// 假设这是你的命令触发函数
export async function openBrowserOrOtherAction() {
    // 定义消息、按钮及点击按钮后的回调
    const choice = await window.showInformationMessage(
        '是否打开百度？',
        { modal: false },
        { title: '确认', isCloseAffordance: true }, // 确认按钮
        { title: '取消' }                          // 取消按钮
    );

    if (choice && choice.title === '确认') {
        // 用户点击了确认按钮，打开浏览器访问百度
        env.openExternal(vscode.Uri.parse('https://www.baidu.com'));
    } else {
      // 用户点击了取消或关闭了消息框，执行其他命令或操作
      vscode.window.showInformationMessage('未选择打开浏览器，执行其他操作...')
      // 执行 zcc.helloWorld
      vscode.commands.executeCommand('zcc.helloWorld');
      // 这里可以调用其他函数或执行你需要的命令
    }
}