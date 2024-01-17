const extensionName = 'markdownEnjoy';

export const EXTENSION_NAME = 'Markdown Enjoy';

export const getCommandName = (command: string) => {
  return `${extensionName}.${command}`;
};

export const COMMAND_NAME = {
  heading: getCommandName('editor.heading'),
  bold: getCommandName('editor.bold'),
  italic: getCommandName('editor.italic'),
  strikethrough: getCommandName('editor.strikethrough'),
  img: getCommandName('editor.img'),
  code: getCommandName('editor.code'),
  codeblock: getCommandName('editor.codeblock'),
  orderedlist: getCommandName('editor.orderedlist'),
  unorderedlist: getCommandName('editor.unorderedlist'),
  blockquote: getCommandName('editor.blockquote'),
  taskList: getCommandName('editor.tasklist'),
  hyperlink: getCommandName('editor.hyperlink'),
  options: getCommandName('editor.options'),
};