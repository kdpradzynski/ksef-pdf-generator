import { Content, ContentText } from 'pdfmake/interfaces';
import { FP } from '../../types/fa3.types';
import { formatText } from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';

export function generatePodsumowanie(kwotaNaleznosciOgolem?: FP): Content[] {
  return [
    {
      text: [
        { text: 'Kwota należności ogółem: ', bold: true },
        formatText(kwotaNaleznosciOgolem?._text, FormatTyp.Currency, {}, 'zł') as ContentText,
      ],
      alignment: 'center',
      fontSize: 12,
      margin: [0, 16, 0, 0],
    },
  ];
}
