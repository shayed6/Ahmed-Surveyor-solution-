import html2canvasPro from 'html2canvas-pro';
import html2canvasStandard from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Robust HTML-to-PDF Exporter for Inheritance Reports.
 * Supports both Muslim Farayez and Hindu Dayabhaga reports.
 * 
 * Key Features:
 * 1. Clones target element into an isolated staging container.
 * 2. Multi-tier renderer: tries html2canvas-pro (for modern CSS/color support),
 *    with automatic fallback to html2canvas standard.
 * 3. 250ms font readiness race condition guard to avoid infinite hangs.
 * 4. Ultra-crisp Bengali typography rendering (scale=2).
 * 5. Automatic multi-page slicing to A4 portrait dimensions (210mm x 297mm).
 * 6. Resilient download trigger with Blob URL fallback.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  fileName: string = 'Ahmed_Survey_Inheritance_Report.pdf'
): Promise<boolean> {
  if (!element) {
    console.error('PDF export failed: Target element is missing.');
    return false;
  }

  let stagingWrapper: HTMLDivElement | null = null;

  try {
    // 1. Guarded Font Loading Check (max 300ms race timeout)
    try {
      if (document.fonts && document.fonts.ready) {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 300)),
        ]);
      }
    } catch (fontErr) {
      console.warn('Font loading check non-blocking warning:', fontErr);
    }

    // 2. Create isolated staging wrapper attached to DOM
    stagingWrapper = document.createElement('div');
    stagingWrapper.id = 'pdf-render-staging-box';
    stagingWrapper.style.position = 'fixed';
    stagingWrapper.style.top = '0';
    stagingWrapper.style.left = '0';
    stagingWrapper.style.width = '800px';
    stagingWrapper.style.minWidth = '800px';
    stagingWrapper.style.maxWidth = '800px';
    stagingWrapper.style.zIndex = '999999';
    stagingWrapper.style.backgroundColor = '#ffffff';
    stagingWrapper.style.pointerEvents = 'none';
    stagingWrapper.style.opacity = '1';
    stagingWrapper.style.visibility = 'visible';
    stagingWrapper.style.boxSizing = 'border-box';
    stagingWrapper.style.margin = '0';
    stagingWrapper.style.padding = '0';

    // 3. Clone target report element
    const clone = element.cloneNode(true) as HTMLElement;
    clone.style.width = '800px';
    clone.style.minWidth = '800px';
    clone.style.maxWidth = '800px';
    clone.style.opacity = '1';
    clone.style.visibility = 'visible';
    clone.style.display = 'block';
    clone.style.backgroundColor = '#ffffff';
    clone.style.margin = '0';

    stagingWrapper.appendChild(clone);
    document.body.appendChild(stagingWrapper);

    // Give DOM a frame to compute all layouts and fonts
    await new Promise((resolve) => setTimeout(resolve, 160));

    // 4. Capture canvas with fallback strategy
    let canvas: HTMLCanvasElement | null = null;

    try {
      // Primary: html2canvas-pro
      canvas = await html2canvasPro(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0,
        width: 800,
        windowWidth: 800,
      });
    } catch (proError) {
      console.warn('html2canvas-pro failed, falling back to standard html2canvas:', proError);
      try {
        canvas = await html2canvasStandard(clone, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
          width: 800,
          windowWidth: 800,
        });
      } catch (stdError) {
        console.error('Both html2canvas engines failed:', stdError);
        throw stdError;
      }
    }

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error('Canvas render produced zero or invalid dimensions.');
    }

    // 5. Build standard A4 jsPDF document
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

    if (contentHeight <= maxPageContentHeight) {
      // Fits neatly on a single page
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
    } else {
      // Multipage slice rendering for extensive reports
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

    // 6. Direct browser download with safety anchor fallback
    try {
      pdf.save(fileName);
    } catch (saveError) {
      console.warn('pdf.save() encountered an issue, using Blob URL anchor:', saveError);
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }, 2000);
    }

    return true;
  } catch (error) {
    console.error('Fatal error during PDF export:', error);
    return false;
  } finally {
    // 7. Clean up staging wrapper
    if (stagingWrapper && stagingWrapper.parentNode) {
      stagingWrapper.parentNode.removeChild(stagingWrapper);
    }
  }
}
