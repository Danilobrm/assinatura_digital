import {PDFDocument, degrees} from 'pdf-lib';

export default async function addSignatureToPDF(
  pdfBytesBase64,
  signatureImage,
) {
  const pdfBytes = Uint8Array.from(atob(pdfBytesBase64), c => c.charCodeAt(0));

  //   Load the PDF document
  const pdfDoc = await PDFDocument.load(pdfBytes);

  const form = pdfDoc.getForm();
  const fields = form.getFields();

  for (const field of fields) {
    const fieldName = field.getName();
    if (fieldName === '25  Assinatura do Beneficiário ou Responsável') {
      const widgets = field.acroField.getWidgets();
      if (widgets.length > 0) {
        const rect = widgets[0].getRectangle();
        const {x, y} = rect;

        
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        
        const pngImage = await pdfDoc.embedPng(signatureImage);
        const { width, height } = pngImage.scale(0.065);
        
        firstPage.drawImage(pngImage, {
          x: x+15,
          y: y,
          width: width,
          height: height,
          rotate: degrees(90),
        });
      }
    }
  }

  // Save the modified PDF document as Base64
  const modifiedPdfBytes = await pdfDoc.saveAsBase64();
  return modifiedPdfBytes;
}
