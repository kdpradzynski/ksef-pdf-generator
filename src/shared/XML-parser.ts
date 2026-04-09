import { xml2js } from 'xml-js';
import { Faktura } from '../lib-public/types/fa2.types';

export function stripPrefix(key: string): string {
  return key.includes(':') ? key.split(':')[1] : key;
}

export function parseXML(file: File): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    const reader = new FileReader();

    reader.onload = function (e: ProgressEvent<FileReader>): void {
      try {
        const xmlStr: string = e.target?.result as string;
        const jsonDoc: Faktura = xml2js(xmlStr, {
          compact: true,
          cdataKey: '_text',
          trim: true,
          elementNameFn: stripPrefix,
          attributeNameFn: stripPrefix,
        }) as Faktura;

        resolve(jsonDoc);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

export function parseXMLStr(encodedXmlStr: string): Promise<unknown> {
  return new Promise((resolve, reject): void => {
    try {
      const buffer = Buffer.from(encodedXmlStr, 'base64');
      const xmlStr = buffer.toString('utf8');
      const jsonDoc: Faktura = stripPrefixes(xml2js(xmlStr, { compact: true })) as Faktura;

      resolve(jsonDoc);
    } catch (error) {
      reject(error);
    }
  });
}
