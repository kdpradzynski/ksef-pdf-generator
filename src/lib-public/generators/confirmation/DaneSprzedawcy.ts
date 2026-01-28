import { Content, ContentText } from 'pdfmake/interfaces';
import { createHeader, formatText, getValue } from '../../../shared/PDF-functions';
// import { createHeader, createLabelText, formatText, getValue, hasValue } from '../../../shared/PDF-functions';
// import FormatTyp from '../../../shared/enums/common.enum';
import { FP, Podmiot1 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';
import { generateDaneIdentyfikacyjneTPodmiot1Dto } from '../FA3/PodmiotDaneIdentyfikacyjneTPodmiot1Dto';
import { generateAdres } from '../FA3/Adres';
// import { generateAdres } from './Adres';
// import { generateDaneIdentyfikacyjneTPodmiot1Dto } from './PodmiotDaneIdentyfikacyjneTPodmiot1Dto';
// import { generateDaneKontaktowe } from './PodmiotDaneKontaktowe';
// import { TAXPAYER_STATUS } from '../../../shared/consts/const';

export function generateDaneSprzedawcy(daneSprzedawcy: Podmiot1): Content[] {
  const result: Content[] = createHeader('Dane sprzedawcy', [0, 0, 0, 4]);

  if (daneSprzedawcy.DaneIdentyfikacyjne) {
    result.push(
      {
        text: [
          formatText('NIP: ', FormatTyp.HeaderContent),
          formatText(daneSprzedawcy.DaneIdentyfikacyjne.NIP?._text, null, { fontSize: 10 }) as ContentText,
        ],
      },
      {
        text: [
          formatText('Nazwa: ', FormatTyp.HeaderContent),
          formatText(daneSprzedawcy.DaneIdentyfikacyjne.Nazwa?._text, null, { fontSize: 10 }) as ContentText,
        ],
      }
    );
  }

  if (daneSprzedawcy.Adres && (daneSprzedawcy.Adres.AdresL1 || daneSprzedawcy.Adres.AdresL2)) {
    const line1 = daneSprzedawcy.Adres.AdresL1 ?? daneSprzedawcy.Adres.AdresL2;
    const line2 = daneSprzedawcy.Adres.AdresL1 ? daneSprzedawcy.Adres.AdresL2 : undefined;
    const body = [
      [
        formatText('Adres: ', FormatTyp.HeaderContent),
        formatText(line1!._text, null, { fontSize: 10 }) as ContentText,
      ],
    ];

    if (line2) {
      body.push(['', formatText(line2._text!, null, { fontSize: 10 }) as ContentText]);
    }
    result.push({
      table: {
        body,
      },
      layout: 'noBorders',
    });
  }
  // if (podmiot1.AdresKoresp) {
  //   result.push(
  //     formatText('Adres do korespondencji', [FormatTyp.Label, FormatTyp.LabelMargin]),
  //     ...generateAdres(podmiot1.AdresKoresp)
  //   );
  // }
  // if (podmiot1.DaneKontaktowe) {
  //   result.push(
  //     formatText('Dane kontaktowe', [FormatTyp.Label, FormatTyp.LabelMargin]),
  //     ...generateDaneKontaktowe(podmiot1.DaneKontaktowe)
  //   );
  // }
  // if (hasValue(podmiot1.StatusInfoPodatnika)) {
  //   const statusInfo: string = TAXPAYER_STATUS[getValue(podmiot1.StatusInfoPodatnika)!];
  //
  //   result.push(createLabelText('Status podatnika: ', statusInfo));
  // }
  return result;
}
