"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const path_1 = __importDefault(require("path"));
const commands_1 = require("./commands");
function activate(context) {
    const { subscriptions } = context;
    console.log('Congratulations, your extension "markdown-enjoy" is now active!');
    let disposable = vscode_1.commands.registerCommand('markdownEnjoy.example', () => {
        // 打开example
        vscode_1.workspace.openTextDocument(path_1.default.join(__dirname, '../example.md')).then(doc => {
            vscode_1.window.showTextDocument(doc);
        });
    });
    subscriptions.push(disposable);
    // 注册编辑区菜单展示
    commands_1.EditorToolbar.registerCommands(subscriptions);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map