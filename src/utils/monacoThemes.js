// Custom Monaco theme definitions.
// 'vs' and 'vs-dark' are built into Monaco already, so they don't need registration.

export function registerMonacoThemes(monaco) {
  // --- Dark Themes ---
  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'type', foreground: '8be9fd' },
      { token: 'function', foreground: '50fa7b' },
      { token: 'variable', foreground: 'f8f8f2' },
    ],
    colors: {
      'editor.background': '#282a36',
      'editor.foreground': '#f8f8f2',
      'editor.lineHighlightBackground': '#44475a55',
      'editorLineNumber.foreground': '#6272a4',
      'editorCursor.foreground': '#f8f8f2',
      'editor.selectionBackground': '#44475a',
    },
  })

  monaco.editor.defineTheme('github-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '8b949e' },
      { token: 'string', foreground: 'a5d6ff' },
      { token: 'keyword', foreground: 'ff7b72' },
      { token: 'number', foreground: '79c0ff' },
      { token: 'type', foreground: 'ffa657' },
      { token: 'function', foreground: 'd2a8ff' },
      { token: 'variable', foreground: 'c9d1d9' },
    ],
    colors: {
      'editor.background': '#0d1117',
      'editor.foreground': '#c9d1d9',
      'editor.lineHighlightBackground': '#161b22',
      'editorLineNumber.foreground': '#484f58',
      'editorCursor.foreground': '#c9d1d9',
      'editor.selectionBackground': '#3392FF44',
    },
  })

  monaco.editor.defineTheme('one-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5c6370' },
      { token: 'string', foreground: '98c379' },
      { token: 'keyword', foreground: 'c678dd' },
      { token: 'number', foreground: 'd19a66' },
      { token: 'type', foreground: 'e5c07b' },
      { token: 'function', foreground: '61afef' },
      { token: 'variable', foreground: 'abb2bf' },
    ],
    colors: {
      'editor.background': '#282c34',
      'editor.foreground': '#abb2bf',
      'editor.lineHighlightBackground': '#2c313c',
      'editorLineNumber.foreground': '#495162',
      'editorCursor.foreground': '#528bff',
      'editor.selectionBackground': '#3e4451',
    },
  })

  monaco.editor.defineTheme('nord', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '616e88' },
      { token: 'string', foreground: 'a3be8c' },
      { token: 'keyword', foreground: '81a1c1' },
      { token: 'number', foreground: 'b48ead' },
      { token: 'type', foreground: '8fbcbb' },
      { token: 'function', foreground: '88c0d0' },
      { token: 'variable', foreground: 'd8dee9' },
    ],
    colors: {
      'editor.background': '#2e3440',
      'editor.foreground': '#d8dee9',
      'editor.lineHighlightBackground': '#3b4252',
      'editorLineNumber.foreground': '#4c566a',
      'editorCursor.foreground': '#d8dee9',
      'editor.selectionBackground': '#434c5e',
    },
  })

  // --- Light Themes ---
  monaco.editor.defineTheme('github-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6a737d' },
      { token: 'string', foreground: '032f62' },
      { token: 'keyword', foreground: 'd73a49' },
      { token: 'number', foreground: '005cc5' },
      { token: 'type', foreground: 'e36209' },
      { token: 'function', foreground: '6f42c1' },
      { token: 'variable', foreground: '24292e' },
    ],
    colors: {
      'editor.background': '#ffffff',
      'editor.foreground': '#24292e',
      'editor.lineHighlightBackground': '#f6f8fa',
      'editorLineNumber.foreground': '#959da5',
      'editorCursor.foreground': '#24292e',
      'editor.selectionBackground': '#0366d625',
    },
  })

  monaco.editor.defineTheme('one-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'a0a1a7' },
      { token: 'string', foreground: '50a14f' },
      { token: 'keyword', foreground: 'a626a4' },
      { token: 'number', foreground: '986801' },
      { token: 'type', foreground: 'c18401' },
      { token: 'function', foreground: '4078f2' },
      { token: 'variable', foreground: '383a42' },
    ],
    colors: {
      'editor.background': '#fafafa',
      'editor.foreground': '#383a42',
      'editor.lineHighlightBackground': '#f2f2f2',
      'editorLineNumber.foreground': '#a0a1a7',
      'editorCursor.foreground': '#526fff',
      'editor.selectionBackground': '#e5e5e6',
    },
  })

  monaco.editor.defineTheme('solarized-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '93a1a1' },
      { token: 'string', foreground: '2aa198' },
      { token: 'keyword', foreground: '859900' },
      { token: 'number', foreground: 'd33682' },
      { token: 'type', foreground: 'b58900' },
      { token: 'function', foreground: '268bd2' },
      { token: 'variable', foreground: '586e75' },
    ],
    colors: {
      'editor.background': '#fdf6e3',
      'editor.foreground': '#586e75',
      'editor.lineHighlightBackground': '#eee8d5',
      'editorLineNumber.foreground': '#93a1a1',
      'editorCursor.foreground': '#586e75',
      'editor.selectionBackground': '#eee8d5',
    },
  })

  monaco.editor.defineTheme('nord-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '4c566a' },
      { token: 'string', foreground: 'a3be8c' },
      { token: 'keyword', foreground: '81a1c1' },
      { token: 'number', foreground: 'b48ead' },
      { token: 'type', foreground: '8fbcbb' },
      { token: 'function', foreground: '88c0d0' },
      { token: 'variable', foreground: '2e3440' },
    ],
    colors: {
      'editor.background': '#f0f4f8',
      'editor.foreground': '#2e3440',
      'editor.lineHighlightBackground': '#e2e8f0',
      'editorLineNumber.foreground': '#4c566a',
      'editorCursor.foreground': '#2e3440',
      'editor.selectionBackground': '#d9e2ec',
    },
  })
}
