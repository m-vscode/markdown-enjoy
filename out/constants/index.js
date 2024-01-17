"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMAND_NAME = exports.getCommandName = exports.EXTENSION_NAME = void 0;
const extensionName = 'markdownEnjoy';
exports.EXTENSION_NAME = 'Markdown Enjoy';
const getCommandName = (command) => {
    return `${extensionName}.${command}`;
};
exports.getCommandName = getCommandName;
exports.COMMAND_NAME = {
    heading: (0, exports.getCommandName)('editor.heading'),
    bold: (0, exports.getCommandName)('editor.bold'),
    italic: (0, exports.getCommandName)('editor.italic'),
    strikethrough: (0, exports.getCommandName)('editor.strikethrough'),
    img: (0, exports.getCommandName)('editor.img'),
    code: (0, exports.getCommandName)('editor.code'),
    codeblock: (0, exports.getCommandName)('editor.codeblock'),
    orderedlist: (0, exports.getCommandName)('editor.orderedlist'),
    unorderedlist: (0, exports.getCommandName)('editor.unorderedlist'),
    blockquote: (0, exports.getCommandName)('editor.blockquote'),
    taskList: (0, exports.getCommandName)('editor.tasklist'),
    hyperlink: (0, exports.getCommandName)('editor.hyperlink'),
    options: (0, exports.getCommandName)('editor.options'),
};
//# sourceMappingURL=index.js.map