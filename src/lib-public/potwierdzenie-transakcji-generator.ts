import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { generateStyle } from '../shared/PDF-functions';

import { generateDaneKontrahentow } from './generators/potwierdzenie-transakcji/DaneKontrahentow';
import { generateNaglowek } from './generators/potwierdzenie-transakcji/Naglowek';
import { generatePodsumowanie } from './generators/potwierdzenie-transakcji/Podsumowanie';
import { generateStopka } from './generators/potwierdzenie-transakcji/Stopka';
import { generateWeryfikacja } from './generators/potwierdzenie-transakcji/Weryfikacja';
import { AdditionalDataTypes } from './types/common.types';
import { Fa as Fa1 } from './types/fa1.types';
import { Fa as Fa2 } from './types/fa2.types';
import { Fa as Fa3 } from './types/fa3.types';

pdfMake.vfs = pdfFonts.vfs;

export function generatePotwierdzenieTransakcji(
  fa: Fa2 | Fa3 | Fa1,
  additionalData: AdditionalDataTypes
): TCreatedPdf {
  const docDefinition: TDocumentDefinitions = {
    content: [
      ...generateNaglowek(fa),
      ...generateDaneKontrahentow(),
      generatePodsumowanie(),
      ...generateWeryfikacja(),
      generateStopka(),
    ],
    ...generateStyle(),
  };

  return pdfMake.createPdf(docDefinition);
}
