import { Content } from 'pdfmake/interfaces';

export function generateStopka(): Content {
  return {
    text: [
      { text: 'Krajowy System ', fontSize: 18 },
      { text: 'e', color: 'red', bold: true, fontSize: 18 },
      { text: '-Faktur', bold: true, fontSize: 18 },
    ],
  };
}
