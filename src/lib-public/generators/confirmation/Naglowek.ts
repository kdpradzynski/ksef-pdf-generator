import { Content, ContentText } from 'pdfmake/interfaces';
import { formatText } from '../../../shared/PDF-functions';
import { Fa as Fa3 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateNaglowek(fa?: Fa3): Content[] {
  return [
    {
      text: [formatText('POTWIERDZENIE TRANSAKCJI', FormatTyp.HeaderPosition) as ContentText],
      alignment: 'center',
    },
    {
      text: [
        formatText('do faktury nr ', FormatTyp.HeaderContent) as ContentText,
        formatText(fa?.P_2?._text, FormatTyp.HeaderContent) as ContentText,
      ],
      alignment: 'center',
    },
  ];
}
