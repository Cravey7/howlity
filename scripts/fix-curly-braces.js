const fs = require('fs');
const path = require('path');

function fixCurlyBraces(content) {
  // Handle single-line if statements
  content = content.replace(
    /if\s*\((.*?)\)\s*([^{\n].*?)(?=\n|$)/g,
    (match, condition, statement) => {
      if (match.includes('{')) {
        return match;
      }
      return `if (${condition}) {\n  ${statement}\n}`;
    }
  );

  // Handle multi-line if statements
  content = content.replace(
    /if\s*\((.*?)\)\s*([^{][\s\S]*?)(?=\n\s*(?:else|else if|})|$)/g,
    (match, condition, statements) => {
      if (match.includes('{')) {
        return match;
      }
      const indentedStatements = statements
        .split('\n')
        .map((line) => '  ' + line)
        .join('\n');
      return `if (${condition}) {\n${indentedStatements}\n}`;
    }
  );

  // Handle else statements
  content = content.replace(
    /else\s*([^{][\s\S]*?)(?=\n\s*(?:else if|})|$)/g,
    (match, statements) => {
      if (match.includes('{')) {
        return match;
      }
      const indentedStatements = statements
        .split('\n')
        .map((line) => '  ' + line)
        .join('\n');
      return `else {\n${indentedStatements}\n}`;
    }
  );

  // Handle else if statements
  content = content.replace(
    /else\s+if\s*\((.*?)\)\s*([^{][\s\S]*?)(?=\n\s*(?:else|else if|})|$)/g,
    (match, condition, statements) => {
      if (match.includes('{')) {
        return match;
      }
      const indentedStatements = statements
        .split('\n')
        .map((line) => '  ' + line)
        .join('\n');
      return `else if (${condition}) {\n${indentedStatements}\n}`;
    }
  );

  return content;
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const fixed = fixCurlyBraces(content);
    if (content !== fixed) {
      fs.writeFileSync(filePath, fixed, 'utf8');
      console.log(`Fixed curly braces in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      processFile(filePath);
    }
  });
}

const apiDir = path.join(__dirname, '..', 'app', 'api');
const componentsDir = path.join(__dirname, '..', 'components');
const libDir = path.join(__dirname, '..', 'lib');

[apiDir, componentsDir, libDir].forEach((dir) => {
  if (fs.existsSync(dir)) {
    processDirectory(dir);
  }
});
