import type { ExportFormat } from '@/context/SvgContext';

interface ExportOptions {
  svgDataUrl: string;
  svgString: string;
  format: ExportFormat;
  width: number;
  height: number;
  backgroundColor: string;
  quality: number;
  filterCss: string;
}

/**
 * Export SVG to various formats
 */
export async function exportToFormat(options: ExportOptions): Promise<void> {
  const { format, ...rest } = options;

  switch (format) {
    case 'png':
      await exportToPng(rest);
      break;
    case 'jpeg':
      await exportToJpeg(rest);
      break;
    case 'webp':
      await exportToWebp(rest);
      break;
    case 'gif':
      await exportToGif(rest);
      break;
    case 'ico':
      await exportToIco(rest);
      break;
    case 'avif':
      await exportToAvif(rest);
      break;
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

/**
 * Creates a canvas from SVG with applied settings
 */
async function createCanvas(options: Omit<ExportOptions, 'format'>): Promise<HTMLCanvasElement> {
  const { svgDataUrl, width, height, backgroundColor, filterCss } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Fill background
      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      // Apply CSS filters using a temporary canvas
      if (filterCss && filterCss !== 'none') {
        // Create a temporary canvas for the filtered image
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          tempCtx.filter = filterCss;
          tempCtx.drawImage(img, 0, 0, width, height);
          ctx.drawImage(tempCanvas, 0, 0);
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }

      resolve(canvas);
    };

    img.onerror = () => reject(new Error('Failed to load SVG image'));
    img.src = svgDataUrl;
  });
}

/**
 * Triggers a download with the given data URL
 */
function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * Triggers a download with a blob
 */
function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

async function exportToPng(options: Omit<ExportOptions, 'format'>): Promise<void> {
  const canvas = await createCanvas(options);
  const dataUrl = canvas.toDataURL('image/png');
  downloadDataUrl(dataUrl, 'converted-svg.png');
}

async function exportToJpeg(options: Omit<ExportOptions, 'format'>): Promise<void> {
  // JPEG doesn't support transparency, ensure background is set
  const opts = {
    ...options,
    backgroundColor:
      options.backgroundColor === 'transparent' ? '#ffffff' : options.backgroundColor,
  };

  const canvas = await createCanvas(opts);
  const dataUrl = canvas.toDataURL('image/jpeg', options.quality / 100);
  downloadDataUrl(dataUrl, 'converted-svg.jpg');
}

async function exportToWebp(options: Omit<ExportOptions, 'format'>): Promise<void> {
  const canvas = await createCanvas(options);
  const dataUrl = canvas.toDataURL('image/webp', options.quality / 100);
  downloadDataUrl(dataUrl, 'converted-svg.webp');
}

async function exportToGif(options: Omit<ExportOptions, 'format'>): Promise<void> {
  // Note: canvas.toDataURL('image/gif') is not widely supported
  // We'll fall back to PNG if GIF isn't supported
  const canvas = await createCanvas(options);

  // Try GIF first
  const dataUrl = canvas.toDataURL('image/gif');
  if (dataUrl.startsWith('data:image/gif')) {
    downloadDataUrl(dataUrl, 'converted-svg.gif');
  } else {
    // Fallback to PNG
    const pngDataUrl = canvas.toDataURL('image/png');
    downloadDataUrl(pngDataUrl, 'converted-svg.png');
  }
}

async function exportToAvif(options: Omit<ExportOptions, 'format'>): Promise<void> {
  const canvas = await createCanvas(options);

  // Check if AVIF is supported
  const dataUrl = canvas.toDataURL('image/avif', options.quality / 100);
  if (dataUrl.startsWith('data:image/avif')) {
    downloadDataUrl(dataUrl, 'converted-svg.avif');
  } else {
    // Fallback to WebP
    const webpDataUrl = canvas.toDataURL('image/webp', options.quality / 100);
    downloadDataUrl(webpDataUrl, 'converted-svg.webp');
  }
}

/**
 * ICO export - creates a multi-size ICO file
 */
async function exportToIco(options: Omit<ExportOptions, 'format'>): Promise<void> {
  const sizes = [16, 32, 48];
  const pngBuffers: ArrayBuffer[] = [];

  for (const size of sizes) {
    const canvas = await createCanvas({
      ...options,
      width: size,
      height: size,
    });

    // Get PNG data
    const dataUrl = canvas.toDataURL('image/png');
    const base64 = dataUrl.split(',')[1];
    const binary = atob(base64);
    const buffer = new ArrayBuffer(binary.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binary.length; i++) {
      view[i] = binary.charCodeAt(i);
    }
    pngBuffers.push(buffer);
  }

  // Create ICO file
  const icoBlob = createIcoFile(pngBuffers, sizes);
  downloadBlob(icoBlob, 'favicon.ico');
}

/**
 * Creates an ICO file from PNG buffers
 * ICO format: https://en.wikipedia.org/wiki/ICO_(file_format)
 */
function createIcoFile(pngBuffers: ArrayBuffer[], sizes: number[]): Blob {
  const numImages = pngBuffers.length;

  // Calculate header and directory sizes
  const headerSize = 6;
  const directoryEntrySize = 16;
  const directorySize = directoryEntrySize * numImages;

  // Calculate total size
  const dataOffset = headerSize + directorySize;
  const totalSize = dataOffset + pngBuffers.reduce((sum, buf) => sum + buf.byteLength, 0);

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);
  const uint8 = new Uint8Array(buffer);

  // ICO Header
  view.setUint16(0, 0, true); // Reserved (must be 0)
  view.setUint16(2, 1, true); // Image type (1 = ICO)
  view.setUint16(4, numImages, true); // Number of images

  // Directory entries
  let currentOffset = dataOffset;
  for (let i = 0; i < numImages; i++) {
    const entryOffset = headerSize + i * directoryEntrySize;
    const size = sizes[i];
    const pngSize = pngBuffers[i].byteLength;

    view.setUint8(entryOffset + 0, size === 256 ? 0 : size); // Width
    view.setUint8(entryOffset + 1, size === 256 ? 0 : size); // Height
    view.setUint8(entryOffset + 2, 0); // Color palette (0 for PNG)
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Color planes
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel
    view.setUint32(entryOffset + 8, pngSize, true); // Image size
    view.setUint32(entryOffset + 12, currentOffset, true); // Image offset

    // Copy PNG data
    uint8.set(new Uint8Array(pngBuffers[i]), currentOffset);
    currentOffset += pngSize;
  }

  return new Blob([buffer], { type: 'image/x-icon' });
}
