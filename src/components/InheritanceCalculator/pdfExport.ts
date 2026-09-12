import html2canvas from 'html2canvas-pro';
import { jsPDF } from 'jspdf';

/**
 * Exports an HTML element directly to a downloadable PDF file.
 * Uses html2canvas-pro for full modern CSS (oklch, lab) support,
 * canvas slicing for crisp multipage A4 output, and robust Blob download.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  fileName: string = 'Ahmed_Survey_Inheritance_Report.pdf'
): Promise<boolean> {
  try {
    // Wait for all web fonts (Hind Siliguri, etc.) to be ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    // Small delay to ensure DOM and styles are fully rendered
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Capture the target element with html2canvas-pro
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (retina 2x) for razor-sharp Bengali text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      width: element.offsetWidth || 800,
      windowWidth: 800,
    });

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Captured canvas is empty');
    }

    // Initialize jsPDF in A4 portrait format (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 8;
    const contentWidth = pageWidth - margin * 2; // 194mm
    const contentHeight = (canvas.height * contentWidth) / canvas.width;
    const maxPageContentHeight = pageHeight - margin * 2; // 281mm

    // If content fits within a single A4 page
    if (contentHeight <= maxPageContentHeight) {
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
    } else {
      // Multipage slice rendering: slices canvas cleanly into A4-ratio chunks
      const pxPageHeight = Math.floor((canvas.width * maxPageContentHeight) / contentWidth);
      let renderedHeight = 0;
      let pageIndex = 0;

      while (renderedHeight < canvas.height) {
        const sliceHeight = Math.min(pxPageHeight, canvas.height - renderedHeight);
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeight;

        const ctx = pageCanvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          ctx.drawImage(
            canvas,
            0,
            renderedHeight,
            canvas.width,
            sliceHeight,
            0,
            0,
            canvas.width,
            sliceHeight
          );

          const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
          const sliceMmHeight = (sliceHeight * contentWidth) / canvas.width;

          if (pageIndex > 0) {
            pdf.addPage();
          }
          pdf.addImage(pageImgData, 'JPEG', margin, margin, contentWidth, sliceMmHeight);
          pageIndex++;
        }
        renderedHeight += sliceHeight;
      }
    }

    // Generate blob and trigger direct download
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }, 2000);

    return true;
  } catch (error) {
    console.error('PDF export error:', error);
    return false;
  }
}
