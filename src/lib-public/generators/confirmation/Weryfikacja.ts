import { Content, ContentQr, ContentStack } from 'pdfmake/interfaces';
import { AdditionalDataTypes } from '../../types/common.types';
import { createSection, formatText, generateColumns, generateQRCode } from '../../../shared/PDF-functions';
import FormatTyp from '../../../shared/enums/common.enum';

export function generateWeryfikacja(additionalData: AdditionalDataTypes): Content {
  const fakturaLabel = 'Sprawdź fakturę w KSeF:';
  const certyfikatLabel = 'Zweryfikuj wystawcę faktury:';
  const result: Content[] = [];

  result.push([
    generateColumns(
      [
        makeQrCodeSection(fakturaLabel, additionalData.encodedFakturaURL!),
        makeQrCodeSection(certyfikatLabel, additionalData.encodedCertyfikatURL!),
      ],
      {
        columnGap: 20,
      }
    ),
  ]);
  return createSection(result, false, [0, 16, 0, 0]);
}

function makeQrCodeSection(label: string, encodedURL: string): Content[] {
  const plainTextUrl = atob(encodedURL!);
  const qrCode: ContentQr | undefined = generateQRCode(plainTextUrl);

  if (!qrCode) {
    return [];
  }

  return [
    {
      stack: [formatText(label, FormatTyp.Default)],
      width: 'auto',
      margin: [0, 8, 8, 8],
      fontSize: label.length <= 10 ? 14 : 10,
    } as ContentStack,
    qrCode,
    {
      stack: [formatText(plainTextUrl, FormatTyp.Link)],
      link: plainTextUrl,
      margin: [0, 8, 0, 0],
      width: 'auto',
    } as ContentStack,
  ];
}
