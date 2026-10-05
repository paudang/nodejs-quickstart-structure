const braceExpand = require('brace-expansion');

function expandPattern(pattern) {
  if (typeof pattern !== 'string') return [pattern];
  const expanded = braceExpand.expand(pattern);
  return expanded && expanded.length ? expanded : [pattern];
}

function braces(pattern, options) {
  if (typeof pattern !== 'string') return pattern;
  const items = expandPattern(pattern);
  if (options && options.expand) return items;
  if (items.length === 1) return items[0];
  return '(' + items.join('|') + ')';
}

braces.expand = function(pattern, options) {
  return expandPattern(pattern);
};

braces.compile = function(pattern, options) {
  const items = expandPattern(pattern);
  if (items.length === 1) return items[0];
  return '(' + items.join('|') + ')';
};

module.exports = braces;
