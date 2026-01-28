/**
 * Extracts unique colors from an SVG string
 */
export function extractColors(svgString: string): string[] {
  const colors = new Set<string>();

  // Regex patterns for different color formats
  const patterns = [
    // Hex colors: #fff, #ffffff
    /#([0-9a-fA-F]{3}){1,2}\b/g,
    // RGB/RGBA: rgb(255, 255, 255), rgba(255, 255, 255, 0.5)
    /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(?:,\s*[\d.]+\s*)?\)/gi,
    // HSL/HSLA: hsl(360, 100%, 50%), hsla(360, 100%, 50%, 0.5)
    /hsla?\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*(?:,\s*[\d.]+\s*)?\)/gi,
    // Named colors in attributes
    /(?:fill|stroke|stop-color|color)=["']([a-zA-Z]+)["']/gi,
  ];

  // Named CSS colors (subset of common ones)
  const namedColors = new Set([
    'black',
    'white',
    'red',
    'green',
    'blue',
    'yellow',
    'cyan',
    'magenta',
    'gray',
    'grey',
    'orange',
    'pink',
    'purple',
    'brown',
    'navy',
    'teal',
    'olive',
    'maroon',
    'aqua',
    'fuchsia',
    'lime',
    'silver',
    'gold',
    'coral',
    'salmon',
    'tomato',
    'turquoise',
    'violet',
    'indigo',
    'beige',
    'ivory',
    'khaki',
    'lavender',
    'plum',
    'tan',
    'chocolate',
    'crimson',
    'darkblue',
    'darkgreen',
    'darkred',
    'lightblue',
    'lightgreen',
    'lightgray',
    'lightgrey',
  ]);

  // Extract colors using each pattern
  for (const pattern of patterns.slice(0, 3)) {
    const matches = svgString.match(pattern);
    if (matches) {
      for (const match of matches) {
        colors.add(normalizeColor(match.toLowerCase()));
      }
    }
  }

  // Extract named colors from attributes
  const attributePattern = patterns[3];
  let match: RegExpExecArray | null;
  while ((match = attributePattern.exec(svgString)) !== null) {
    const colorName = match[1].toLowerCase();
    if (namedColors.has(colorName)) {
      colors.add(colorName);
    }
  }

  // Also look for style attributes with colors
  const stylePattern = /style=["'][^"']*(?:fill|stroke|color):\s*([^;}"']+)/gi;
  while ((match = stylePattern.exec(svgString)) !== null) {
    const value = match[1].trim().toLowerCase();
    if (value && value !== 'none' && value !== 'currentcolor') {
      colors.add(normalizeColor(value));
    }
  }

  // Filter out special values
  const specialValues = new Set(['none', 'transparent', 'inherit', 'currentcolor', 'initial']);
  const filteredColors = Array.from(colors).filter((c) => !specialValues.has(c.toLowerCase()));

  return filteredColors;
}

/**
 * Normalizes a color value (e.g., expands 3-char hex to 6-char)
 */
function normalizeColor(color: string): string {
  // Expand 3-char hex to 6-char
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    const r = color[1];
    const g = color[2];
    const b = color[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }

  return color;
}

/**
 * Parses SVG viewBox attribute
 */
export function parseViewBox(
  svgString: string
): { minX: number; minY: number; width: number; height: number } | null {
  const match = svgString.match(/viewBox=["']([^"']+)["']/i);
  if (!match) {
    return null;
  }

  const values = match[1].split(/\s+|,/).map(Number);
  if (values.length !== 4 || values.some(Number.isNaN)) {
    return null;
  }

  return {
    minX: values[0],
    minY: values[1],
    width: values[2],
    height: values[3],
  };
}

/**
 * Gets dimensions from SVG string
 */
export function getSvgDimensions(svgString: string): { width: number; height: number } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) {
    return { width: 300, height: 150 };
  }

  let width = 0;
  let height = 0;

  // Try width/height attributes first
  const widthAttr = svg.getAttribute('width');
  const heightAttr = svg.getAttribute('height');

  if (widthAttr && heightAttr) {
    width = Number.parseFloat(widthAttr);
    height = Number.parseFloat(heightAttr);
  }

  // Fall back to viewBox
  if (!width || !height) {
    const viewBox = parseViewBox(svgString);
    if (viewBox) {
      width = viewBox.width;
      height = viewBox.height;
    }
  }

  // Default dimensions
  if (!width) {
    width = 300;
  }
  if (!height) {
    height = 150;
  }

  return { width, height };
}
