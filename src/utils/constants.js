export const LANGUAGE_CATEGORIES = [
  'Programming Languages',
  'Web',
  'Database',
  'Configuration',
  'Shell & DevOps',
  'Data Formats',
]

export const LANGUAGES = [
  // --- Programming Languages ---
  { category: 'Programming Languages', id: 'c', label: 'C', monacoId: 'c', extension: 'c', customFileName: 'main.c' },
  { category: 'Programming Languages', id: 'cpp', label: 'C++', monacoId: 'cpp', extension: 'cpp', customFileName: 'main.cpp' },
  { category: 'Programming Languages', id: 'java', label: 'Java', monacoId: 'java', extension: 'java', customFileName: 'main.java' },
  { category: 'Programming Languages', id: 'python', label: 'Python', monacoId: 'python', extension: 'py', customFileName: 'main.py' },
  { category: 'Programming Languages', id: 'javascript', label: 'JavaScript', monacoId: 'javascript', extension: 'js', customFileName: 'main.js' },
  { category: 'Programming Languages', id: 'typescript', label: 'TypeScript', monacoId: 'typescript', extension: 'ts', customFileName: 'main.ts' },
  { category: 'Programming Languages', id: 'csharp', label: 'C#', monacoId: 'csharp', extension: 'cs', customFileName: 'main.cs' },
  { category: 'Programming Languages', id: 'go', label: 'Go', monacoId: 'go', extension: 'go', customFileName: 'main.go' },
  { category: 'Programming Languages', id: 'rust', label: 'Rust', monacoId: 'rust', extension: 'rs', customFileName: 'main.rs' },
  { category: 'Programming Languages', id: 'kotlin', label: 'Kotlin', monacoId: 'kotlin', extension: 'kt', customFileName: 'main.kt' },
  { category: 'Programming Languages', id: 'swift', label: 'Swift', monacoId: 'swift', extension: 'swift', customFileName: 'main.swift' },
  { category: 'Programming Languages', id: 'dart', label: 'Dart', monacoId: 'dart', extension: 'dart', customFileName: 'main.dart' },
  { category: 'Programming Languages', id: 'php', label: 'PHP', monacoId: 'php', extension: 'php', customFileName: 'main.php' },
  { category: 'Programming Languages', id: 'ruby', label: 'Ruby', monacoId: 'ruby', extension: 'rb', customFileName: 'main.rb' },
  { category: 'Programming Languages', id: 'perl', label: 'Perl', monacoId: 'perl', extension: 'pl', customFileName: 'main.pl' },
  { category: 'Programming Languages', id: 'haskell', label: 'Haskell', monacoId: 'haskell', extension: 'hs', customFileName: 'main.hs' },
  { category: 'Programming Languages', id: 'elixir', label: 'Elixir', monacoId: 'elixir', extension: 'ex', customFileName: 'main.ex' },
  { category: 'Programming Languages', id: 'erlang', label: 'Erlang', monacoId: 'erlang', extension: 'erl', customFileName: 'main.erl' },
  { category: 'Programming Languages', id: 'ocaml', label: 'OCaml', monacoId: 'ocaml', extension: 'ml', customFileName: 'main.ml' },
  { category: 'Programming Languages', id: 'fsharp', label: 'F#', monacoId: 'fsharp', extension: 'fs', customFileName: 'main.fs' },
  { category: 'Programming Languages', id: 'lua', label: 'Lua', monacoId: 'lua', extension: 'lua', customFileName: 'main.lua' },
  { category: 'Programming Languages', id: 'r', label: 'R', monacoId: 'r', extension: 'r', customFileName: 'main.r' },
  { category: 'Programming Languages', id: 'matlab', label: 'MATLAB', monacoId: 'objective-c', extension: 'm', customFileName: 'main.m' },
  { category: 'Programming Languages', id: 'assembly', label: 'Assembly', monacoId: 'asm', extension: 'asm', customFileName: 'main.asm' },
  { category: 'Programming Languages', id: 'objective-c', label: 'Objective-C', monacoId: 'objective-c', extension: 'm', customFileName: 'main.m' },
  { category: 'Programming Languages', id: 'scala', label: 'Scala', monacoId: 'scala', extension: 'scala', customFileName: 'main.scala' },
  { category: 'Programming Languages', id: 'solidity', label: 'Solidity', monacoId: 'sol', extension: 'sol', customFileName: 'main.sol' },

  // --- Web ---
  { category: 'Web', id: 'html', label: 'HTML', monacoId: 'html', extension: 'html', customFileName: 'index.html' },
  { category: 'Web', id: 'css', label: 'CSS', monacoId: 'css', extension: 'css', customFileName: 'styles.css' },
  { category: 'Web', id: 'scss', label: 'SCSS', monacoId: 'scss', extension: 'scss', customFileName: 'styles.scss' },
  { category: 'Web', id: 'less', label: 'LESS', monacoId: 'less', extension: 'less', customFileName: 'styles.less' },
  { category: 'Web', id: 'json', label: 'JSON', monacoId: 'json', extension: 'json', customFileName: 'data.json' },
  { category: 'Web', id: 'xml', label: 'XML', monacoId: 'xml', extension: 'xml', customFileName: 'document.xml' },
  { category: 'Web', id: 'yaml', label: 'YAML', monacoId: 'yaml', extension: 'yaml', customFileName: 'config.yaml' },
  { category: 'Web', id: 'markdown', label: 'Markdown', monacoId: 'markdown', extension: 'md', customFileName: 'README.md' },

  // --- Database ---
  { category: 'Database', id: 'sql', label: 'SQL', monacoId: 'sql', extension: 'sql', customFileName: 'main.sql' },
  { category: 'Database', id: 'pgsql', label: 'PostgreSQL', monacoId: 'pgsql', extension: 'sql', customFileName: 'query.sql' },
  { category: 'Database', id: 'mysql', label: 'MySQL', monacoId: 'mysql', extension: 'sql', customFileName: 'query.sql' },

  // --- Configuration ---
  { category: 'Configuration', id: 'toml', label: 'TOML', monacoId: 'ini', extension: 'toml', customFileName: 'config.toml' },
  { category: 'Configuration', id: 'ini', label: 'INI', monacoId: 'ini', extension: 'ini', customFileName: 'config.ini' },
  { category: 'Configuration', id: 'terraform', label: 'Terraform', monacoId: 'hcl', extension: 'tf', customFileName: 'main.tf' },
  { category: 'Configuration', id: 'hcl', label: 'HCL', monacoId: 'hcl', extension: 'hcl', customFileName: 'main.hcl' },

  // --- Shell & DevOps ---
  { category: 'Shell & DevOps', id: 'bash', label: 'Bash', monacoId: 'shell', extension: 'sh', customFileName: 'script.sh' },
  { category: 'Shell & DevOps', id: 'shell', label: 'Shell', monacoId: 'shell', extension: 'sh', customFileName: 'script.sh' },
  { category: 'Shell & DevOps', id: 'powershell', label: 'PowerShell', monacoId: 'powershell', extension: 'ps1', customFileName: 'script.ps1' },
  { category: 'Shell & DevOps', id: 'dockerfile', label: 'Dockerfile', monacoId: 'dockerfile', extension: 'dockerfile', customFileName: 'Dockerfile' },
  { category: 'Shell & DevOps', id: 'nginx', label: 'Nginx', monacoId: 'nginx', extension: 'conf', customFileName: 'nginx.conf' },
  { category: 'Shell & DevOps', id: 'apache', label: 'Apache Config', monacoId: 'apex', extension: 'conf', customFileName: 'httpd.conf' },
  { category: 'Shell & DevOps', id: 'makefile', label: 'Makefile', monacoId: 'makefile', extension: 'mk', customFileName: 'Makefile' },

  // --- Data Formats ---
  { category: 'Data Formats', id: 'csv', label: 'CSV', monacoId: 'plaintext', extension: 'csv', customFileName: 'data.csv' },
  { category: 'Data Formats', id: 'graphql', label: 'GraphQL', monacoId: 'graphql', extension: 'graphql', customFileName: 'schema.graphql' },
]

export const EDITOR_THEMES = [
  {
    id: 'vscode',
    label: 'VS Code',
    monacoId: 'vs-dark',
    lightMonacoId: 'vs',
    swatch: ['#1e1e1e', '#569cd6', '#ce9178'],
    lightSwatch: ['#ffffff', '#005cc5', '#d73a49'],
  },
  {
    id: 'dracula',
    label: 'Dracula',
    monacoId: 'dracula',
    lightMonacoId: 'solarized-light',
    swatch: ['#282a36', '#ff79c6', '#50fa7b'],
    lightSwatch: ['#fdf6e3', '#b58900', '#268bd2'],
  },
  {
    id: 'github',
    label: 'GitHub',
    monacoId: 'github-dark',
    lightMonacoId: 'github-light',
    swatch: ['#0d1117', '#79c0ff', '#ffa657'],
    lightSwatch: ['#ffffff', '#0366d6', '#d73a49'],
  },
  {
    id: 'one',
    label: 'One',
    monacoId: 'one-dark',
    lightMonacoId: 'one-light',
    swatch: ['#282c34', '#61afef', '#e5c07b'],
    lightSwatch: ['#fafafa', '#4078f2', '#a626a4'],
  },
  {
    id: 'nord',
    label: 'Nord',
    monacoId: 'nord',
    lightMonacoId: 'nord-light',
    swatch: ['#2e3440', '#88c0d0', '#a3be8c'],
    lightSwatch: ['#f0f4f8', '#88c0d0', '#81a1c1'],
  },
]

export const BACKGROUNDS = [
  {
    id: 'clay',
    label: 'Clay',
    style: {
      background: 'radial-gradient(circle at 50% -20%, #A35E47, #1C120F, #0F0F10)',
    },
    lightStyle: {
      background: 'radial-gradient(circle at 50% -20%, #F5EAE6, #ECDAD3, #E3CFC9)',
    },
  },
  {
    id: 'midnight',
    label: 'Midnight',
    style: {
      background: 'radial-gradient(circle at 50% -20%, #374151, #111827, #000000)',
    },
    lightStyle: {
      background: 'radial-gradient(circle at 50% -20%, #F8FAFC, #E2E8F0, #CBD5E1)',
    },
  },
  {
    id: 'aurora',
    label: 'Aurora',
    style: {
      background:
        'radial-gradient(at 0% 0%, #1e1b4b 0px, transparent 50%), radial-gradient(at 100% 100%, #312e81 0px, transparent 50%), #020617',
    },
    lightStyle: {
      background:
        'radial-gradient(at 0% 0%, #EEF2F6 0px, transparent 50%), radial-gradient(at 100% 100%, #E0E7FF 0px, transparent 50%), #F5F3FF',
    },
  },
  {
    id: 'emerald',
    label: 'Emerald',
    style: {
      background:
        'radial-gradient(at 100% 0%, #064e3b 0px, transparent 50%), radial-gradient(at 0% 100%, #022c22 0px, transparent 50%), #020617',
    },
    lightStyle: {
      background:
        'radial-gradient(at 100% 0%, #ECFDF5 0px, transparent 50%), radial-gradient(at 0% 100%, #D1FAE5 0px, transparent 50%), #F4FBF7',
    },
  },
  {
    id: 'amethyst',
    label: 'Amethyst',
    style: {
      background:
        'radial-gradient(at 0% 0%, #4c1d95 0px, transparent 50%), radial-gradient(at 50% 100%, #1e1b4b 0px, transparent 50%), #020617',
    },
    lightStyle: {
      background:
        'radial-gradient(at 0% 0%, #FAF9FE 0px, transparent 50%), radial-gradient(at 50% 100%, #F5F3FF 0px, transparent 50%), #EDE9FE',
    },
  },
  {
    id: 'noise',
    label: 'Paper',
    style: {
      backgroundColor: '#09090b',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
    },
    lightStyle: {
      backgroundColor: '#F9FAFB',
      backgroundImage:
        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
    },
  },
  {
    id: 'solid-dark',
    label: 'Charcoal',
    style: {
      background: '#09090b',
    },
    lightStyle: {
      background: '#F3F4F6',
    },
  },
  {
    id: 'solid-purple',
    label: 'Lavender',
    style: {
      background: '#2e1065',
    },
    lightStyle: {
      background: '#FDF4FF',
    },
  },
  {
    id: 'solid-blue',
    label: 'Frost',
    style: {
      background: '#082f49',
    },
    lightStyle: {
      background: '#F0F9FF',
    },
  },
  {
    id: 'transparent',
    label: 'Transparent',
    style: {
      backgroundImage:
        'linear-gradient(45deg, #27272a 25%, transparent 25%), linear-gradient(-45deg, #27272a 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #27272a 75%), linear-gradient(-45deg, transparent 75%, #27272a 75%)',
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      backgroundColor: '#09090B',
    },
    lightStyle: {
      backgroundImage:
        'linear-gradient(45deg, #F3F4F6 25%, transparent 25%), linear-gradient(-45deg, #F3F4F6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #F3F4F6 75%), linear-gradient(-45deg, transparent 75%, #F3F4F6 75%)',
      backgroundSize: '16px 16px',
      backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
      backgroundColor: '#FFFFFF',
    },
  },
]

export const WINDOW_FRAMES = [
  { id: 'macos', label: 'macOS' },
  { id: 'windows', label: 'Windows' },
  { id: 'browser', label: 'Browser' },
  { id: 'none', label: 'None' },
]

export const DEFAULT_CODE = `#include<iostream>

using namespace std;

int main() {

    cout << "Hello, Prismio!";

    return 0;

}`

export const DEFAULT_FILENAME = 'main.cpp'

export function getFileName(languageId) {
  const lang = LANGUAGES.find((l) => l.id === languageId)
  if (lang) {
    if (lang.customFileName) return lang.customFileName
    if (lang.extension) return `main.${lang.extension}`
  }
  const ext = EXTENSIONS[languageId] || 'txt'
  return `main.${ext}`
}

