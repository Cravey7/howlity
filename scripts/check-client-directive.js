const fs = require('fs');
const path = require('path');

const CLIENT_HOOKS = [
  'useState',
  'useEffect',
  'useRef',
  'useCallback',
  'useMemo',
  'useReducer',
  'useContext',
  'useLayoutEffect',
  'useImperativeHandle',
  'useDebugValue',
  'useDeferredValue',
  'useTransition',
  'useId',
  'useSyncExternalStore',
  'useInsertionEffect',
  'usePathname',
  'useRouter',
  'useSearchParams',
];

const CLIENT_APIS = [
  'window',
  'document',
  'localStorage',
  'sessionStorage',
  'navigator',
  'location',
  'history',
  'fetch',
  'setTimeout',
  'setInterval',
  'clearTimeout',
  'clearInterval',
  'requestAnimationFrame',
  'cancelAnimationFrame',
  'addEventListener',
  'removeEventListener',
];

const CLIENT_EVENTS = [
  'onClick',
  'onSubmit',
  'onChange',
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onKeyPress',
  'onMouseDown',
  'onMouseUp',
  'onMouseMove',
  'onMouseEnter',
  'onMouseLeave',
  'onDragStart',
  'onDragEnd',
  'onDrop',
];

function isServerComponent(content) {
  return (
    content.includes('export default async function') || content.includes('export async function')
  );
}

function isTestFile(filePath) {
  return (
    filePath.includes('__tests__') ||
    filePath.endsWith('.test.tsx') ||
    filePath.endsWith('.spec.tsx')
  );
}

function hasClientFeatures(content) {
  const hasHooks = CLIENT_HOOKS.some((hook) => content.includes(hook));
  const hasApis = CLIENT_APIS.some((api) => content.includes(api));
  const hasEvents = CLIENT_EVENTS.some((event) => content.includes(event));
  return hasHooks || hasApis || hasEvents;
}

function hasClientDirective(content) {
  return content.includes("'use client'") || content.includes('"use client"');
}

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Skip test files
  if (isTestFile(filePath)) {
    return true;
  }

  // Skip server components
  if (isServerComponent(content)) {
    return true;
  }

  const needsClient = hasClientFeatures(content);
  const hasClient = hasClientDirective(content);

  if (needsClient && !hasClient) {
    console.log(`⚠️  ${filePath} needs 'use client' directive`);
    return false;
  }

  if (!needsClient && hasClient) {
    console.log(`ℹ️  ${filePath} has unnecessary 'use client' directive`);
  }

  return true;
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  let hasIssues = false;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!file.startsWith('.') && file !== 'node_modules') {
        hasIssues = walkDir(filePath) || hasIssues;
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      hasIssues = !checkFile(filePath) || hasIssues;
    }
  }

  return hasIssues;
}

const rootDir = path.join(__dirname, '..');
const hasIssues = walkDir(rootDir);

if (hasIssues) {
  console.log('\n❌ Some files need the "use client" directive');
  process.exit(1);
} else {
  console.log('\n✅ All files have correct "use client" directives');
}
