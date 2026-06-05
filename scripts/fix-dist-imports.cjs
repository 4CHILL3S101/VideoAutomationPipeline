#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

function fixFile(file) {
  let content = fs.readFileSync(file, 'utf8');
  // matches: from './something' or from "./something"
  const fromRe = /(from\s+['"])(\.\.??\/[\w@\-\/\.]+?)(['"])/g;
  content = content.replace(fromRe, (m, p1, p2, p3) => {
    // if path already has an extension, skip
    if (/\.[a-zA-Z0-9]+$/.test(p2)) return `${p1}${p2}${p3}`;
    return `${p1}${p2}.js${p3}`;
  });

  // dynamic imports: import('...')
  const dynRe = /(import\(\s*['"])(\.\.??\/[\w@\-\/\.]+?)(['"]\s*\))/g;
  content = content.replace(dynRe, (m, p1, p2, p3) => {
    if (/\.[a-zA-Z0-9]+$/.test(p2)) return `${p1}${p2}${p3}`;
    return `${p1}${p2}.js${p3}`;
  });

  fs.writeFileSync(file, content, 'utf8');
}

const dist = path.resolve(__dirname, '..', 'dist');
if (!fs.existsSync(dist)) {
  console.error('dist directory not found, skipping import fix.');
  process.exit(0);
}

const files = walk(dist).filter((f) => f.endsWith('.js'));
files.forEach(fixFile);
console.log(`Fixed imports in ${files.length} files.`);
