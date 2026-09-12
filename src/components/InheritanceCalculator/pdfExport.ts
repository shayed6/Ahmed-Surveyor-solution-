import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { CalculationOutcome, PropertyAssets } from './types';
import { toBengaliNumerals, formatDecimalBn } from './muslimCalculation';

export interface ExportPdfOptions {
  elementId?: string;
  fileName?: string;
}

/**
 * Exports an HTML element directly to a downloadable PDF file.
 */
export async function exportElementToPdf(
  element: HTMLElement,
  fileName: string = 'উত্তরাধিকার_সম্পত্তি_বণ্টন_ফলাফল.pdf'
): Promise<boolean> {
  try {
    // Generate high-resolution canvas using html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // High resolution for crystal clear Bengali text
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 800,
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.96);

    // Initialize jsPDF in A4 portrait format (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 10;
    const contentWidth = pageWidth - margin * 2; // 190mm
    const contentHeight = (canvas.height * contentWidth) / canvas.width;

    // If fits in single page
    if (contentHeight <= pageHeight - margin * 2) {
      pdf.addImage(imgData, 'JPEG', margin, margin, contentWidth, contentHeight);
    } else {
      // Multipage support
      let heightLeft = contentHeight;
      let position = margin;
      const maxPageContentHeight = pageHeight - margin * 2;

      pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
      heightLeft -= maxPageContentHeight;

      while (heightLeft > 0) {
        position = position - maxPageContentHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, contentWidth, contentHeight);
        heightLeft -= maxPageContentHeight;
      }
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error('PDF generation error:', error);
    return false;
  }
}
