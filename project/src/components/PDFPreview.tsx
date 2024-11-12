import React from 'react';
import { pdf } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';

interface PDFPreviewProps {
  invoiceData: any;
}

export default function PDFPreview({ invoiceData }: PDFPreviewProps) {
  const [url, setUrl] = React.useState<string>('');

  React.useEffect(() => {
    const generatePdfBlob = async () => {
      const blob = await pdf(<InvoiceTemplate invoiceData={invoiceData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setUrl(url);
    };

    generatePdfBlob();

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [invoiceData]);

  if (!url) {
    return <div className="flex justify-center items-center h-full">Načítání náhledu...</div>;
  }

  return (
    <iframe
      src={url}
      className="w-full h-full"
      title="Invoice Preview"
    />
  );
}
