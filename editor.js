// Initialize Ace Editor for syntax highlighting
const htmlEditor = ace.edit("html-code");
htmlEditor.setTheme("ace/theme/monokai");
htmlEditor.session.setMode("ace/mode/html");

const cssEditor = ace.edit("css-code");
cssEditor.setTheme("ace/theme/monokai");
cssEditor.session.setMode("ace/mode/css");

const jsEditor = ace.edit("js-code");
jsEditor.setTheme("ace/theme/monokai");
jsEditor.session.setMode("ace/mode/javascript");

// Real-time preview
function updatePreview() {
  const html = htmlEditor.getValue();
  const css = `<style>${cssEditor.getValue()}</style>`;
  const js = `<script>${jsEditor.getValue()}<\/script>`;
  const previewFrame = document.getElementById('preview-frame');
  const previewDocument = previewFrame.contentDocument || previewFrame.contentWindow.document;
  previewDocument.open();
  previewDocument.write(html + css + js);
  previewDocument.close();
}

htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

// Console output
const originalConsoleLog = console.log;
console.log = function (...args) {
  originalConsoleLog(...args);
  const consoleOutput = document.getElementById('console-output');
  consoleOutput.textContent += args.join(' ') + '\n';
};

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Export Code
const exportBtn = document.getElementById('export-btn');
exportBtn.addEventListener('click', () => {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();
  const blob = new Blob([html + '\n\n<style>' + css + '</style>\n\n<script>' + js + '</script>'], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'code.html';
  a.click();
  URL.revokeObjectURL(url);
});

// Initial Preview
updatePreview();
