import { Content, ContentText } from 'pdfmake/interfaces';
import { formatText } from '../../../shared/PDF-functions';
import { Fa as Fa3 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateNaglowek(fa?: Fa3): Content[] {
  return [
    {
      text: [{ text: 'POTWIERDZENIE TRANSAKCJI', bold: true, fontSize: 18 }],
    },
    {
      ...(formatText('do faktury nr ', FormatTyp.ValueMedium) as ContentText),
      ...(formatText(fa?.P_2?._text, FormatTyp.HeaderPosition) as ContentText),
    },
  ];
}
