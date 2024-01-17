"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorToolbar = void 0;
// 编辑区顶部工具栏
const vscode_1 = require("vscode");
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
var MarkupType;
(function (MarkupType) {
    MarkupType[MarkupType["heading"] = 1] = "heading";
    MarkupType[MarkupType["bold"] = 2] = "bold";
    MarkupType[MarkupType["italic"] = 3] = "italic";
    MarkupType[MarkupType["img"] = 4] = "img";
    MarkupType[MarkupType["strikethrough"] = 5] = "strikethrough";
    MarkupType[MarkupType["code"] = 6] = "code";
    MarkupType[MarkupType["codeblock"] = 7] = "codeblock";
    MarkupType[MarkupType["orderedList"] = 8] = "orderedList";
    MarkupType[MarkupType["unorderedList"] = 9] = "unorderedList";
    MarkupType[MarkupType["blockquote"] = 10] = "blockquote";
    MarkupType[MarkupType["taskList"] = 11] = "taskList";
    MarkupType[MarkupType["hyperlink"] = 12] = "hyperlink";
})(MarkupType || (MarkupType = {}));
class EditorToolbar {
    static async registerCommands(subscriptions) {
        // 扩展-开关是否可用
        await vscode_1.commands.executeCommand('setContext', 'markdownEnjoy:markdown:editorToolbar', true);
        // link
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.hyperlink, () => this.addMarkup(MarkupType.hyperlink)));
        // 图片
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.img, () => this.addMarkup(MarkupType.img)));
        // code
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.code, () => this.addMarkup(MarkupType.code)));
        // codeblock
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.codeblock, () => this.addMarkup(MarkupType.codeblock)));
        // orderedlist
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.orderedlist, () => this.addMarkup(MarkupType.orderedList)));
        // unorderedlist
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.unorderedlist, () => this.addMarkup(MarkupType.unorderedList)));
        // blockquote
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.blockquote, () => this.addMarkup(MarkupType.blockquote)));
        // taskList
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.taskList, () => this.addMarkup(MarkupType.blockquote)));
        // # 标题
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.heading, () => this.addMarkup(MarkupType.heading)));
        // ** 粗体
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.bold, () => this.addMarkup(MarkupType.bold)));
        // * 斜体
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.italic, () => this.addMarkup(MarkupType.italic)));
        // 删除线
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.strikethrough, () => this.addMarkup(MarkupType.strikethrough)));
        // Options
        subscriptions.push(vscode_1.commands.registerCommand(constants_1.COMMAND_NAME.options, async () => {
            const qpItems = [
                {
                    label: `$(case-sensitive) 标题`,
                    detail: '# 标题',
                    alwaysShow: true
                },
                {
                    label: `$(list-unordered) 无序列表`,
                    detail: '- 列表',
                    alwaysShow: true
                },
                {
                    label: `$(list-ordered) 有序列表`,
                    detail: '1. 列表',
                    alwaysShow: true
                },
                {
                    label: `$(tasklist) 任务列表`,
                    detail: '-[x] 任务项',
                    alwaysShow: true
                },
                {
                    label: `$(remove) Strikethrough(删除线)`,
                    detail: '~~删除~~',
                    alwaysShow: true
                },
                {
                    label: `$(bold) bold(加粗)`,
                    detail: '**加粗**',
                    alwaysShow: true
                },
                {
                    label: `$(italic) Italic(斜体)`,
                    detail: '*斜体*',
                    alwaysShow: true
                },
                {
                    label: `$(more) 查看更多`,
                    detail: '更多demo',
                    alwaysShow: true
                }
            ];
            const option = await vscode_1.window.showQuickPick([...qpItems], {
                title: '提示',
                placeHolder: '输入关键词',
                canPickMany: false,
                ignoreFocusOut: true
            });
            if (option) {
                if (option.label === qpItems[0].label) {
                    await this.addMarkup(MarkupType.heading);
                }
                else if (option.label === qpItems[1].label) {
                    await this.addMarkup(MarkupType.unorderedList);
                }
                else if (option.label === qpItems[2].label) {
                    await this.addMarkup(MarkupType.orderedList);
                }
                else if (option.label === qpItems[3].label) {
                    await this.addMarkup(MarkupType.taskList);
                }
                else if (option.label === qpItems[4].label) {
                    await this.addMarkup(MarkupType.strikethrough);
                }
                else if (option.label === qpItems[5].label) {
                    await this.addMarkup(MarkupType.bold);
                }
                else if (option.label === qpItems[6].label) {
                    await this.addMarkup(MarkupType.italic);
                }
                else if (option.label === qpItems[7].label) {
                    // 打开新tab
                    vscode_1.workspace.openTextDocument(path_1.default.join(__dirname, '../../example.md')).then(doc => {
                        vscode_1.window.showTextDocument(doc);
                    });
                }
            }
        }));
    }
    // 为标签菜单定义回调
    static async addMarkup(type) {
        const editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        // 获取光标选中处
        const selection = editor.selection;
        // 类型为链接
        if (type === MarkupType.hyperlink || type === MarkupType.img) {
            return this.addLink(editor, selection, type);
        }
        // 获取标签对应markdown符号
        const markers = this.getMarkers(type);
        if (!markers) {
            return;
        }
        // 是否有文本被选中
        const hasTextSelection = !selection.isEmpty;
        // 当前激活的位置
        const curtSelection = selection.active;
        if (hasTextSelection) {
            const selectionText = editor.document.getText(selection);
            const txt = await this.insertText(markers, type, selectionText);
            editor.edit((builder) => {
                builder.replace(selection, txt);
            });
        }
        else {
            const txt = await this.insertText(markers, type);
            // Insert the markers where cursor is located.
            const markerLength = this.isMarkupWrapping(type) ? txt.length + 1 : markers.length;
            let newPosition = curtSelection.with(curtSelection.line, curtSelection.character + markerLength);
            await editor.edit((builder) => {
                builder.insert(newPosition, txt);
            });
            if (type === MarkupType.codeblock) {
                newPosition = curtSelection.with(curtSelection.line + 1, 0);
            }
            editor.selection = new vscode_1.Selection(newPosition, newPosition);
        }
    }
    // 生成链接回调
    static async addLink(editor, selection, type) {
        const hasTextSelection = !selection.isEmpty;
        // 获取链接内容
        const linkText = hasTextSelection ? editor.document.getText(selection) : '';
        const link = await vscode_1.window.showInputBox({
            title: '输入URL',
            placeHolder: '请输入URL',
            prompt: 'e: https://www.xx.com',
            value: linkText,
            ignoreFocusOut: true
        });
        const text = await vscode_1.window.showInputBox({
            title: '输入内容',
            placeHolder: '请输入内容',
            prompt: 'e: 内容',
            value: linkText,
            ignoreFocusOut: true
        });
        if (link) {
            let txt = `[${text || link}](${link})`;
            if (type === MarkupType.img) {
                txt = `![${text || link}](${link})`;
            }
            if (hasTextSelection) {
                editor.edit((builder) => {
                    builder.replace(selection, txt);
                });
            }
            else {
                const curtSelection = selection.active;
                const markerLength = txt.length;
                const newPosition = curtSelection.with(curtSelection.line, curtSelection.character + markerLength);
                await editor.edit((builder) => {
                    builder.insert(newPosition, txt);
                });
                editor.selection = new vscode_1.Selection(newPosition, newPosition);
            }
        }
    }
    // 是否需要折行
    static lineBreak(text, type) {
        const newText = text ? text : '';
        if (type === MarkupType.codeblock) {
            return `\n${newText}\n`;
        }
        return newText;
    }
    // 是否为半包裹(前缀)语法， e: ## 1: true, **22**: false
    static isMarkupWrapping(type) {
        return (type === MarkupType.blockquote ||
            type === MarkupType.heading ||
            type === MarkupType.unorderedList ||
            type === MarkupType.orderedList ||
            type === MarkupType.taskList);
    }
    static async insertText(marker, type, text = null) {
        // 获取文本内容
        const curtText = this.lineBreak(text, type);
        // 是否为半包裹语法
        if (this.isMarkupWrapping(type)) {
            if (type === MarkupType.heading) {
                // 列表及筛选项提示
                const headingLvl = await vscode_1.window.showQuickPick(['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6'], {
                    title: '选项',
                    placeHolder: '请输入关键词',
                    canPickMany: false,
                    ignoreFocusOut: true
                });
                if (headingLvl) {
                    const headingNr = parseInt(headingLvl.replace('Heading ', ''));
                    return `${Array(headingNr + 1).join(marker)} ${curtText}`;
                }
            }
            if (type === MarkupType.unorderedList || type === MarkupType.taskList) {
                const lines = curtText.split('\n').map((line) => `${marker} ${line}`);
                return lines.join('\n');
            }
            if (type === MarkupType.orderedList) {
                const lines = curtText.split('\n').map((line, idx) => `${idx + 1}. ${line}`);
                return lines.join('\n');
            }
            return `${marker} ${curtText}`;
        }
        else {
            // bold、italic、strikethrough、code、codeblock
            return `${marker}${curtText}${marker}`;
        }
    }
    // 获取markdown代码块语法
    static getMarkers(type) {
        switch (type) {
            case MarkupType.bold:
                return `**`;
            case MarkupType.italic:
                return `*`;
            case MarkupType.strikethrough:
                return `~~`;
            case MarkupType.code:
                return '`';
            case MarkupType.codeblock:
                return '```';
            case MarkupType.blockquote:
                return '>';
            case MarkupType.heading:
                return '#';
            case MarkupType.unorderedList:
                return '-';
            case MarkupType.orderedList:
                return '1.';
            case MarkupType.taskList:
                return '- [ ]';
            default:
                return;
        }
    }
}
exports.EditorToolbar = EditorToolbar;
//# sourceMappingURL=EditorToolbar.js.map