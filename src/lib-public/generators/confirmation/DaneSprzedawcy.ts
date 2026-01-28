import { Content, ContentText } from 'pdfmake/interfaces';
import { createHeader, formatText } from '../../../shared/PDF-functions';
import { Podmiot1 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateDaneSprzedawcy(daneSprzedawcy: Podmiot1): Content[] {
  const result: Content[] = createHeader('Dane sprzedawcy', [0, 8, 0, 0]);

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
        formatText('Adres:', FormatTyp.HeaderContent),
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
      layout: {
        hLineWidth: () => 0,
        vLineWidth: () => 0,
        paddingTop: () => 0,
        paddingRight: () => 3, // odstęp za 'Adres:', bo pdfmake obcina whitespace w tabeli
        paddingBottom: () => 0,
        paddingLeft: () => 0,
      },
    });
  }
  return result;
}
