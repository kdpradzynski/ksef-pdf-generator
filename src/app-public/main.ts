import { generateInvoice, generatePDFUPO, generatePotwierdzenieTransakcji } from '../lib-public';

import { AdditionalDataTypes } from '../lib-public/types/common.types';

const inputInvoice: HTMLInputElement = document.getElementById('xmlInput') as HTMLInputElement;
const inputInvoiceOffline: HTMLInputElement = document.getElementById('xmlInputOffline') as HTMLInputElement;
const inputUPO: HTMLInputElement = document.getElementById('xmlInputUPO') as HTMLInputElement;
const xmlInputPotwierdzenieTransakcji: HTMLInputElement = document.getElementById(
  'xmlInputPotwierdzenieTransakcji'
) as HTMLInputElement;

inputInvoice.addEventListener('change', async (): Promise<void> => {
  const file: File | undefined = inputInvoice.files?.[0];

  if (!file) {
    return;
  }

  const additionalData: AdditionalDataTypes = {
    nrKSeF: '5555555555-20250808-9231003CA67B-BE',
    qrCode:
      'https://qr-test.ksef.mf.gov.pl/invoice/5265877635/26-10-2025/HS5E1zrA8WVjDNq_xMVIN5SD6nyRymmQ-BcYHReUAa0',
  };

  generateInvoice(file, additionalData, 'blob').then((data: Blob): void => {
    const url: string = URL.createObjectURL(data);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;
    a.download = 'test.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

inputInvoiceOffline.addEventListener('change', async (): Promise<void> => {
  const file: File | undefined = inputInvoice.files?.[0];

  if (!file) {
    return;
  }

  const additionalData: AdditionalDataTypes = {
    encodedFakturaURL:
      'aHR0cHM6Ly9rc2VmLXRlc3QubWYuZ292LnBsL2NsaWVudC1hcHAvaW52b2ljZS81MjY1ODc3NjM1LzI2LTEwLTIwMjUvSFM1RTF6ckE4V1ZqRE5xX3hNVklONVNENm55UnltbVEtQmNZSFJlVUFhMA',
    encodedCertyfikatURL:
      'aHR0cHM6Ly9xci10ZXN0LmtzZWYubWYuZ292LnBsL2NlcnRpZmljYXRlL05pcC81NTUyMTQyNTQ1LzU1NTIxNDI1NDUvMDE5YmRlY2RkM2RlNTE2Ny9DRFRFankyRVo4emtjSVRnN09NeTE0Yi0wVUhzS0c4eVhLdUkyR3VWWkN3L01FUUNJRFpOZi1MeEpzM2tBZjRqN0l1dV9FUDlXNnd3bDJKTFNfMWVzVG5VSDlMSEFpQWlKdXhsX0hzSXFBYlM4UWdDUVJvVkVxVjhfZVVWRGhkYkM5SDVIcDAtSlE',
  };

  generateInvoice(file, additionalData, 'blob').then((data: Blob): void => {
    const url: string = URL.createObjectURL(data);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;
    a.download = 'test.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

inputUPO.addEventListener('change', async (): Promise<void> => {
  const file: File | undefined = inputUPO.files?.[0];

  if (!file) {
    return;
  }
  generatePDFUPO(file).then((blob) => {
    const url: string = URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;
    a.download = 'test.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});

xmlInputPotwierdzenieTransakcji.addEventListener('change', async (): Promise<void> => {
  const file: File | undefined = inputInvoice.files?.[0];

  if (!file) {
    return;
  }

  const additionalData: AdditionalDataTypes = {
    encodedFakturaURL:
      'aHR0cHM6Ly9rc2VmLXRlc3QubWYuZ292LnBsL2NsaWVudC1hcHAvaW52b2ljZS81MjY1ODc3NjM1LzI2LTEwLTIwMjUvSFM1RTF6ckE4V1ZqRE5xX3hNVklONVNENm55UnltbVEtQmNZSFJlVUFhMA',
    encodedCertyfikatURL:
      'aHR0cHM6Ly9xci10ZXN0LmtzZWYubWYuZ292LnBsL2NlcnRpZmljYXRlL05pcC81NTUyMTQyNTQ1LzU1NTIxNDI1NDUvMDE5YmRlY2RkM2RlNTE2Ny9DRFRFankyRVo4emtjSVRnN09NeTE0Yi0wVUhzS0c4eVhLdUkyR3VWWkN3L01FUUNJRFpOZi1MeEpzM2tBZjRqN0l1dV9FUDlXNnd3bDJKTFNfMWVzVG5VSDlMSEFpQWlKdXhsX0hzSXFBYlM4UWdDUVJvVkVxVjhfZVVWRGhkYkM5SDVIcDAtSlE',
  };

  generatePotwierdzenieTransakcji(file, additionalData).then((data: Blob): void => {
    const url: string = URL.createObjectURL(data);

    const a: HTMLAnchorElement = document.createElement('a');

    a.href = url;
    a.download = 'test.pdf';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
