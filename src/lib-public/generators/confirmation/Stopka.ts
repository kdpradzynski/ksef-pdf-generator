import { Content } from 'pdfmake/interfaces';

export function generateStopka(): Content {
  const fontSize = 16;

  return {
    text: [
      { text: 'Krajowy System ', fontSize },
      { text: 'e', color: 'red', bold: true, fontSize },
      { text: '-Faktur', bold: true, fontSize },
    ],
    alignment: 'center',
  };
}
