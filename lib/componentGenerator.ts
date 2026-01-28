export interface ComponentOptions {
  framework: 'react' | 'vue';
  typescript: boolean;
  componentName: string;
  defaultExport: boolean;
}

/**
 * Converts an SVG string to a React or Vue component
 */
export function generateComponent(svgString: string, options: ComponentOptions): string {
  const { framework, typescript, componentName, defaultExport } = options;

  // Clean and prepare SVG for JSX/Vue template
  const cleanedSvg = prepareSvgForComponent(svgString, framework);

  if (framework === 'react') {
    return generateReactComponent(cleanedSvg, {
      typescript,
      componentName,
      defaultExport,
    });
  }

  return generateVueComponent(cleanedSvg, {
    componentName,
    defaultExport,
  });
}

/**
 * Prepares SVG string for use in a component
 */
function prepareSvgForComponent(svgString: string, framework: 'react' | 'vue'): string {
  // Parse SVG
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, 'image/svg+xml');
  const svg = doc.querySelector('svg');

  if (!svg) {
    return svgString;
  }

  // Remove XML declaration if present
  let cleaned = svgString.replace(/<\?xml[^?]*\?>/gi, '');

  // Remove comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Remove unnecessary whitespace
  cleaned = cleaned.replace(/>\s+</g, '><').trim();

  if (framework === 'react') {
    // Convert attributes to JSX format
    cleaned = convertToJsxAttributes(cleaned);
  }

  // Remove fixed width/height so it can be controlled via props
  cleaned = cleaned.replace(/\s+(width|height)=["'][^"']*["']/gi, '');

  return cleaned;
}

/**
 * Converts HTML/SVG attributes to JSX camelCase format
 */
function convertToJsxAttributes(svgString: string): string {
  const attributeMap: Record<string, string> = {
    class: 'className',
    for: 'htmlFor',
    tabindex: 'tabIndex',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-opacity': 'strokeOpacity',
    'fill-opacity': 'fillOpacity',
    'fill-rule': 'fillRule',
    'clip-path': 'clipPath',
    'clip-rule': 'clipRule',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-style': 'fontStyle',
    'font-weight': 'fontWeight',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'dominant-baseline': 'dominantBaseline',
    'alignment-baseline': 'alignmentBaseline',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'xlink:href': 'xlinkHref',
    'xmlns:xlink': 'xmlnsXlink',
  };

  let result = svgString;

  // Replace kebab-case attributes with camelCase
  for (const [kebab, camel] of Object.entries(attributeMap)) {
    const regex = new RegExp(`\\b${kebab}=`, 'gi');
    result = result.replace(regex, `${camel}=`);
  }

  // Also handle any remaining kebab-case attributes generically
  result = result.replace(/([a-z])-([a-z])/gi, (_, a, b) => `${a}${b.toUpperCase()}`);

  return result;
}

interface ReactOptions {
  typescript: boolean;
  componentName: string;
  defaultExport: boolean;
}

function generateReactComponent(svgContent: string, options: ReactOptions): string {
  const { typescript, componentName, defaultExport } = options;

  // Extract the inner content of the SVG (attributes and children)
  const svgMatch = svgContent.match(/<svg([^>]*)>([\s\S]*)<\/svg>/i);
  if (!svgMatch) {
    return '// Error: Could not parse SVG';
  }

  const svgAttributes = svgMatch[1].trim();
  const svgChildren = svgMatch[2].trim();

  // Parse attributes into an object string
  const attrRegex = /(\w+)=["']([^"']*)["']/g;
  const attrs: string[] = [];
  let attrMatch: RegExpExecArray | null = attrRegex.exec(svgAttributes);

  while (attrMatch !== null) {
    const [, name, value] = attrMatch;
    // Skip width and height as we'll use props
    if (name.toLowerCase() !== 'width' && name.toLowerCase() !== 'height') {
      attrs.push(`${name}="${value}"`);
    }
    attrMatch = attrRegex.exec(svgAttributes);
  }

  const propsType = typescript ? ': React.SVGProps<SVGSVGElement>' : '';
  const exportKeyword = defaultExport ? 'export default' : 'export';
  const constKeyword = defaultExport ? '' : 'export ';

  const component = `${typescript ? "import type React from 'react';\n\n" : ''}${constKeyword}const ${componentName} = (props${propsType}) => (
  <svg
    ${attrs.join('\n    ')}
    {...props}
  >
    ${svgChildren}
  </svg>
);

${defaultExport ? `export default ${componentName};` : ''}`;

  return component.replace(/\n{3,}/g, '\n\n').trim();
}

interface VueOptions {
  componentName: string;
  defaultExport: boolean;
}

function generateVueComponent(svgContent: string, options: VueOptions): string {
  const { componentName } = options;

  // For Vue, we just need to replace the SVG attributes to use v-bind
  const svgMatch = svgContent.match(/<svg([^>]*)>([\s\S]*)<\/svg>/i);
  if (!svgMatch) {
    return '<!-- Error: Could not parse SVG -->';
  }

  const svgAttributes = svgMatch[1].trim();
  const svgChildren = svgMatch[2].trim();

  // Parse attributes
  const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
  const attrs: string[] = [];
  let attrMatch: RegExpExecArray | null = attrRegex.exec(svgAttributes);

  while (attrMatch !== null) {
    const [, name, value] = attrMatch;
    if (name.toLowerCase() !== 'width' && name.toLowerCase() !== 'height') {
      attrs.push(`${name}="${value}"`);
    }
    attrMatch = attrRegex.exec(svgAttributes);
  }

  return `<script setup lang="ts">
defineOptions({
  name: '${componentName}',
  inheritAttrs: false,
});
</script>

<template>
  <svg
    ${attrs.join('\n    ')}
    v-bind="$attrs"
  >
    ${svgChildren}
  </svg>
</template>`;
}
