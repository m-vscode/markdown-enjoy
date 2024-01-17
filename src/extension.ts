import { ExtensionContext, workspace, commands, window } from 'vscode';
import path from 'path';
import { EditorToolbar } from './commands';

export function activate(context: ExtensionContext) {
  const { subscriptions } = context;
	console.log('Congratulations, your extension "markdown-enjoy" is now active!');

	let disposable = commands.registerCommand('markdownEnjoy.example', () => {
    // 打开example
    workspace.openTextDocument(path.join(__dirname, '../example.md')).then(doc => {
      window.showTextDocument(doc);
    });
	});
	subscriptions.push(disposable);

  // 注册编辑区菜单展示
  EditorToolbar.registerCommands(subscriptions);
}

// This method is called when your extension is deactivated
export function deactivate() {}
