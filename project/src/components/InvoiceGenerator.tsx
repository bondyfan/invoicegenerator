import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceTemplate from './InvoiceTemplate';
import InvoiceForm from './InvoiceForm';
import { Button } from "@/components/ui/button";

export default function InvoiceGenerator() {
  const [invoiceData, setInvoiceData] = React.useState({
    invoiceNumber: '202401',
    supplierICO: '14436272',
    supplierDIC: 'Neplátce DPH',
    bankAccount: '1854570052/3030',
    variableSymbol: '202401',
    issueDate: '07. 11. 2024',
    dueDate: '21. 11. 2024',
    supplierName: 'František Divoký',
    supplierAddress: 'Zástava 3',
    supplierCity: '533 04 Újezd u Sezemic - Zástava',
    customerName: '11:11 production s.r.o.',
    customerAddress: 'Dašická 851',
    customerCity: '530 03 Pardubice - Bílé Předměstí',
    customerICO: '05773547',
    customerDIC: 'CZ05773547',
    items: [
      {
        quantity: '1',
        unit: 'ks',
        description: 'Mix&Mastering skladby Vltava',
        unitPrice: '3000.00',
        totalPrice: '3000.00'
      }
    ],
    totalAmount: '3000.00'
  });

  const [showPreview, setShowPreview] = React.useState(false);

  const handleGenerate = () => {
    setShowPreview(true);
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Generátor faktur</h1>
        
        <div className="mb-8">
          <InvoiceForm 
            invoiceData={invoiceData} 
            setInvoiceData={setInvoiceData}
            onGenerate={handleGenerate}
          />
        </div>

        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Náhled faktury</h2>
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Zavřít
                </Button>
              </div>
              
              <div className="mb-4 h-[calc(100%-8rem)] bg-gray-100 rounded">
                <InvoiceTemplate invoiceData={invoiceData} />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowPreview(false)}>
                  Zpět k úpravám
                </Button>
                <PDFDownloadLink
                  document={<InvoiceTemplate invoiceData={invoiceData} />}
                  fileName="faktura.pdf"
                >
                  {({ blob, url, loading, error }) => 
                    loading ? 
                      'Načítání...' : 
                      <Button>
                        Stáhnout fakturu (PDF)
                      </Button>
                  }
                </PDFDownloadLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
