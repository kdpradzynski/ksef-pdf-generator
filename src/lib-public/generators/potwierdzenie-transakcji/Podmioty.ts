import { Content } from 'pdfmake/interfaces';
import { Faktura as Faktura3, Podmiot1, Podmiot2 } from '../../types/fa3.types';
import { createSection, generateColumns, getTable } from '../../../shared/PDF-functions';
import { generateDaneSprzedawcy } from './DaneSprzedawcy';
import { generateDaneNabywcy } from './DaneNabywcy';

export function generatePodmioty(invoice: Faktura3): Content[] {
  const result: Content[] = [];
  const daneSprzedawcy: Podmiot1 = getTable(invoice.Podmiot1)[0];
  const daneNabywcy: Podmiot2 = getTable(invoice.Podmiot2)[0];

  console.log(daneSprzedawcy);
  console.log(daneNabywcy);
  result.push([
    generateColumns([generateDaneSprzedawcy(daneSprzedawcy), generateDaneNabywcy(daneNabywcy)], {
      margin: [0, 0, 0, 8],
      columnGap: 20,
    }),
  ]);

  return createSection(result, false, [0, 0, 0, 0]);
}
