import { Content, ContentText } from 'pdfmake/interfaces';
import { createHeader, formatText } from '../../../shared/PDF-functions';
import { Podmiot2 } from '../../types/fa3.types';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateDaneNabywcy(daneNabywcy: Podmiot2): Content[] {
  const result: Content[] = createHeader('Dane nabywcy', [0, 8, 0, 0]);
  const { DaneIdentyfikacyjne } = daneNabywcy;

  if (!DaneIdentyfikacyjne) {
    return result;
  }

  if (DaneIdentyfikacyjne.NIP?._text) {
    // <NIP>3766866819</NIP>
    result.push({
      text: [
        formatText('NIP: ', FormatTyp.HeaderContent),
        formatText(DaneIdentyfikacyjne.NIP?._text, null, { fontSize: 10 }) as ContentText,
      ],
    });
  } else if (DaneIdentyfikacyjne.BrakID) {
    // <BrakID>1</BrakID>
    result.push({
      text: [formatText('Brak identyfikatora podatkowego', FormatTyp.HeaderContent)],
    });
  } else if (DaneIdentyfikacyjne.NrVatUE) {
    // <KodUE>DE</KodUE>
    // <NrVatUE>12/345/67890</NrVatUE>
    result.push({
      text: [
        formatText('Nr VAT UE: ', FormatTyp.HeaderContent),
        formatText(`${DaneIdentyfikacyjne.KodUE?._text} ${DaneIdentyfikacyjne.NrVatUE?._text}`, null, {
          fontSize: 10,
        }) as ContentText,
      ],
    });
  } else if (DaneIdentyfikacyjne.NrID) {
    // <KodKraju>UG</KodKraju>
    // <NrID>TIN 1021375648</NrID>
    result.push({
      text: [
        formatText('Nr ID: ', FormatTyp.HeaderContent),
        formatText(
          `${DaneIdentyfikacyjne.KodKraju ? DaneIdentyfikacyjne.KodKraju._text + ' ' : ''}${DaneIdentyfikacyjne.NrID?._text}`,
          null,
          {
            fontSize: 10,
          }
        ) as ContentText,
      ],
    });
  }

  result.push({
    text: [
      formatText('Nazwa: ', FormatTyp.HeaderContent),
      formatText(DaneIdentyfikacyjne.Nazwa?._text, null, { fontSize: 10 }) as ContentText,
    ],
  });

  if (daneNabywcy.Adres && (daneNabywcy.Adres.AdresL1 || daneNabywcy.Adres.AdresL2)) {
    const line1 = daneNabywcy.Adres.AdresL1 ?? daneNabywcy.Adres.AdresL2;
    const line2 = daneNabywcy.Adres.AdresL1 ? daneNabywcy.Adres.AdresL2 : undefined;
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
