import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStyle } from '../shared/PDF-functions';

import { generateDaneKontrahentow } from './generators/potwierdzenie-transakcji/DaneKontrahentow';
import { generateNaglowek } from './generators/potwierdzenie-transakcji/Naglowek';
import { generatePodsumowanie } from './generators/potwierdzenie-transakcji/Podsumowanie';
import { generateStopka } from './generators/potwierdzenie-transakcji/Stopka';
import { generateWeryfikacja } from './generators/potwierdzenie-transakcji/Weryfikacja';
import { AdditionalDataTypes } from './types/common.types';
import { Faktura as Faktura3 } from './types/fa3.types';
import { parseXML } from '../shared/XML-parser';
import { generateTest } from './generators/potwierdzenie-transakcji/Test';
import { generatePodmioty } from './generators/potwierdzenie-transakcji/Podmioty';

pdfMake.vfs = pdfFonts.vfs;

export async function generatePotwierdzenieTransakcji(
  file: File,
  additionalData: AdditionalDataTypes
): Promise<Blob> {
  const xml: unknown = await parseXML(file);
  const faktura: Faktura3 = (xml as any).Faktura as Faktura3;

  const docDefinition: TDocumentDefinitions = {
    content: [
      ...generateNaglowek(faktura.Fa),
      // ...generatePodmioty(faktura),
      ...generatePodsumowanie(faktura.Fa?.P_15),
      // ...generateWeryfikacja(additionalData),
      generateStopka(),
      generateTest(),
    ],
    ...generateStyle(),
  };

  return new Promise((resolve) => {
    const pdf: TCreatedPdf = pdfMake.createPdf(docDefinition);

    pdf.getBlob((blob: Blob) => {
      resolve(blob);
    });
  });
}
