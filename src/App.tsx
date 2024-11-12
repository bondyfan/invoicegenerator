import React from 'react';
import { X, Plus } from 'lucide-react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import InvoiceTemplate from './components/InvoiceTemplate';

interface Item {
  quantity: string;
  unit: string;
  description: string;
  unitPrice: string;
  totalPrice: string;
}

export default function App() {
  const [showPdfPreview, setShowPdfPreview] = React.useState(false);
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

  const [isEditingSupplier, setIsEditingSupplier] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value,
      totalPrice: field === 'quantity' || field === 'unitPrice' 
        ? (parseFloat(field === 'quantity' ? value : newItems[index].quantity) * 
           parseFloat(field === 'unitPrice' ? value : newItems[index].unitPrice)).toFixed(2)
        : newItems[index].totalPrice
    };
    
    setInvoiceData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2)
    }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { quantity: '1', unit: 'ks', description: '', unitPrice: '0.00', totalPrice: '0.00' }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = invoiceData.items.filter((_, i) => i !== index);
    setInvoiceData(prev => ({
      ...prev,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-center mb-2">Generátor Faktur</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          {/* Basic Info */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Základní údaje</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  Číslo faktury
                </label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  Bankovní účet
                </label>
                <input
                  type="text"
                  name="bankAccount"
                  value={invoiceData.bankAccount}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Supplier */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Dodavatel</h2>
              <button
                onClick={() => setIsEditingSupplier(!isEditingSupplier)}
                className="px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 text-gray-900 font-medium transition-colors"
              >
                {isEditingSupplier ? 'Zavřít' : 'Upravit'}
              </button>
            </div>
            
            {isEditingSupplier ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-900">
                    Jméno
                  </label>
                  <input
                    type="text"
                    name="supplierName"
                    value={invoiceData.supplierName}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-900">
                    IČO
                  </label>
                  <input
                    type="text"
                    name="supplierICO"
                    value={invoiceData.supplierICO}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-900">
                    Adresa
                  </label>
                  <input
                    type="text"
                    name="supplierAddress"
                    value={invoiceData.supplierAddress}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block mb-1.5 text-sm font-medium text-gray-900">
                    Město
                  </label>
                  <input
                    type="text"
                    name="supplierCity"
                    value={invoiceData.supplierCity}
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                  />
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-900">{invoiceData.supplierName} - IČO: {invoiceData.supplierICO}</p>
                <p className="text-sm text-gray-600">{invoiceData.supplierAddress}, {invoiceData.supplierCity}</p>
              </div>
            )}
          </div>

          {/* Customer */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Odběratel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  Jméno
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={invoiceData.customerName}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  IČO
                </label>
                <input
                  type="text"
                  name="customerICO"
                  value={invoiceData.customerICO}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  Adresa
                </label>
                <input
                  type="text"
                  name="customerAddress"
                  value={invoiceData.customerAddress}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-sm font-medium text-gray-900">
                  Město
                </label>
                <input
                  type="text"
                  name="customerCity"
                  value={invoiceData.customerCity}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Položky faktury</h2>
            <div className="space-y-4">
              {invoiceData.items.map((item, index) => (
                <div key={index} className="relative p-4 border border-gray-200 rounded-lg group">
                  <button
                    onClick={() => removeItem(index)}
                    className="absolute right-2 top-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pr-8">
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Množství
                      </label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Jednotka
                      </label>
                      <input
                        type="text"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Popis
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Cena za ks
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block mb-1.5 text-sm font-medium text-gray-900">
                        Celkem
                      </label>
                      <input
                        type="text"
                        value={`${item.totalPrice} Kč`}
                        readOnly
                        className="w-full rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addItem}
              className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Přidat položku
            </button>
          </div>

          {/* Total and Generate */}
          <div className="flex justify-between items-center pt-6 border-t">
            <p className="text-xl font-semibold">
              Celková částka: {invoiceData.totalAmount} Kč
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setShowPdfPreview(true)}
                className="px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors"
              >
                Náhled faktury
              </button>
              <PDFDownloadLink
                document={<InvoiceTemplate invoiceData={invoiceData} />}
                fileName={`faktura-${invoiceData.invoiceNumber}.pdf`}
              >
                {({ loading }) => (
                  <button
                    className="px-6 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium transition-colors disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading ? 'Připravuji PDF...' : 'Stáhnout fakturu'}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Náhled faktury</h2>
              <button
                onClick={() => setShowPdfPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <PDFViewer width="100%" height="100%" className="rounded-md">
                <InvoiceTemplate invoiceData={invoiceData} />
              </PDFViewer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
