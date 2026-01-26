import http, { IncomingHttpHeaders } from 'node:http';
import { generateInvoiceString, generatePDFUPOString } from './lib-public';
import { AdditionalDataTypes } from './lib-public/types/common.types';
import nconf from 'nconf';

const config = nconf.argv().env();

config.required(['PORT', 'X_API_KEY']);
const apiKey = config.get('X_API_KEY');
// const apiKey = process.env.X_API_KEY;

function checkApiKey(headers: IncomingHttpHeaders): boolean {
  const xApiKey: string | string[] | undefined = headers['x-api-key'];

  return xApiKey === apiKey;
}
function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';

    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function sendJSON(res: http.ServerResponse, data: unknown, status = 200): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.method) {
    res.writeHead(404);
    res.end();
    return;
  }

  if (!checkApiKey(req.headers)) {
    res.writeHead(401);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/xml-input') {
    try {
      const body: string = await readBody(req);
      const bodyJSON = JSON.parse(body);
      const xml: string = bodyJSON.xml;
      const additionalData: AdditionalDataTypes = bodyJSON.additionalData;
      const { nrKSeF, encodedFakturaURL, encodedCertyfikatURL } = additionalData;

      if (!encodedFakturaURL || (!nrKSeF && !encodedCertyfikatURL)) {
        sendJSON(res, { error: 'Brak kodu QR' }, 400);
        return;
      }

      const invoiceData = await generateInvoiceString(xml, additionalData);

      sendJSON(res, { invoiceData });
    } catch (error: any) {
      sendJSON(res, { error: error.message }, 400);
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/xml-input-upo') {
    try {
      const body: string = await readBody(req);
      const upoPdf: Blob = await generatePDFUPOString(body);
      const buffer = Buffer.from(await upoPdf.arrayBuffer());
      const upoData = buffer.toString('base64');

      sendJSON(res, { upoData });
    } catch (error: any) {
      sendJSON(res, { error: error.message }, 400);
    }
    return;
  }

  if (req.method === 'GET' && (req.url === '/ping' || req.url === '/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

const port = config.get('PORT');

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
