import sanitizeHtml from 'sanitize-html';

const ALLOWED_HTML_TAGS = [
  'abbr',
  'acronym',
  'b',
  'bdi',
  'bdo',
  'big',
  'br',
  'cite',
  'code',
  'data',
  'del',
  'dfn',
  'em',
  'i',
  'ins',
  'kbd',
  'mark',
  'q',
  'ruby',
  's',
  'samp',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'tt',
  'u',
  'var',
  'wbr',
];

const HTML_SANITIZE_OPTS = {
  allowedTags: ALLOWED_HTML_TAGS,
  allowedAttributes: {},
};

const PLAIN_SANITIZE_OPTS = {
  allowedTags: ['br'],
  allowedAttributes: {},
};

export function sanitizeToHtml(dirty: string): string {
  return sanitizeHtml(dirty, HTML_SANITIZE_OPTS);
}

export function sanitizeToPlain(dirty: string): string {
  return sanitizeHtml(dirty, PLAIN_SANITIZE_OPTS)
    .replaceAll('<br />', '\n');
}
