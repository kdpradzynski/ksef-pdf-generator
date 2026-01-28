import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStyle } from '../shared/PDF-functions';

import { generateNaglowek } from './generators/confirmation/Naglowek';
import { generatePodsumowanie } from './generators/confirmation/Podsumowanie';
import { generateStopka } from './generators/confirmation/Stopka';
import { generateWeryfikacja } from './generators/confirmation/Weryfikacja';
import { AdditionalDataTypes } from './types/common.types';
import { Faktura as Faktura3 } from './types/fa3.types';
import { parseXML, parseXMLStr } from '../shared/XML-parser';
import { generateTest } from './generators/confirmation/Test';
import { generatePodmioty } from './generators/confirmation/Podmioty';

pdfMake.vfs = pdfFonts.vfs;

export async function generateConfirmationPDF(
  file: File,
  additionalData: AdditionalDataTypes
): Promise<Blob> {
  const xml: unknown = await parseXML(file);

  return generate(xml, additionalData);
  // const faktura: Faktura3 = (xml as any).Faktura as Faktura3;
  //
  // const docDefinition: TDocumentDefinitions = {
  //   content: [
  //     ...generateNaglowek(faktura.Fa),
  //     ...generatePodmioty(faktura),
  //     ...generatePodsumowanie(faktura.Fa?.P_15),
  //     ...generateWeryfikacja(additionalData),
  //     generateStopka(),
  //     generateTest(),
  //   ],
  //   ...generateStyle(),
  // };
  //
  // return new Promise((resolve, reject) => {
  //   const pdf: TCreatedPdf = pdfMake.createPdf(docDefinition);
  //
  //   pdf.getBlob((blob: Blob) => {
  //     if (blob) {
  //       resolve(blob);
  //     } else {
  //       reject(blob);
  //     }
  //   });
  // });
}

export async function generateConfirmationString(
  xmlString: string,
  additionalData: AdditionalDataTypes
): Promise<Blob> {
  const xml: unknown = await parseXMLStr(xmlString);

  return generate(xml, additionalData);
  // const faktura: Faktura3 = (xml as any).Faktura as Faktura3;
  //
  // const docDefinition: TDocumentDefinitions = {
  //   content: [
  //     ...generateNaglowek(faktura.Fa),
  //     ...generatePodmioty(faktura),
  //     ...generatePodsumowanie(faktura.Fa?.P_15),
  //     ...generateWeryfikacja(additionalData),
  //     generateStopka(),
  //     generateTest(),
  //   ],
  //   ...generateStyle(),
  // };
  //
  // return new Promise((resolve, reject) => {
  //   const pdf: TCreatedPdf = pdfMake.createPdf(docDefinition);
  //
  //   pdf.getBlob((blob: Blob) => {
  //     if (blob) {
  //       resolve(blob);
  //     } else {
  //       reject(blob);
  //     }
  //   });
  // });
}

function generate(xml: unknown, additionalData: AdditionalDataTypes): Promise<Blob> {
  const faktura: Faktura3 = (xml as any).Faktura as Faktura3;

  const docDefinition: TDocumentDefinitions = {
    content: [
      ...generateNaglowek(faktura.Fa),
      ...generatePodmioty(faktura),
      ...generatePodsumowanie(faktura.Fa?.P_15),
      ...generateWeryfikacja(additionalData),
      generateStopka(),
      generateTest(),
    ],
    ...generateStyle(),
  };

  return new Promise((resolve, reject) => {
    const pdf: TCreatedPdf = pdfMake.createPdf(docDefinition);

    pdf.getBlob((blob: Blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(blob);
      }
    });
  });
}
