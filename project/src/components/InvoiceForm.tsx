import React from 'react';
import { Button } from "@/components/ui/button";

interface Item {
  quantity: string;
  unit: string;
  description: string;
  unitPrice: string;
  totalPrice: string;
}

interface InvoiceFormProps {
  invoiceData: any;
  setInvoiceData: (data: any) => void;
  onGenerate: () => void;
}

export default function InvoiceForm({ invoiceData, setInvoiceData, onGenerate }: InvoiceFormProps) {
  const [isEditingSupplier, setIsEditingSupplier] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceData((prev: any) => ({
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
    
    setInvoiceData((prev: any) => ({
      ...prev,
      items: newItems,
      totalAmount: newItems.reduce((sum, item) => sum + parseFloat(item.totalPrice), 0).toFixed(2)
    }));
  };

  const addItem = () => {
    setInvoiceData((prev: any) => ({
      ...prev,
      items: [...prev.items, { quantity: '1', unit: 'ks', description: '', unitPrice: '0.00', totalPrice: '0.00' }]
    }));
  };

  const removeItem = (index: number) => {
    setInvoiceData((prev: any) => ({
      ...prev,
      items: prev.items.filter((_: any, i: number) => i !== index)
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Základní údaje</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Číslo faktury</label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Bankovní účet</label>
              <input
                type="text"
                name="bankAccount"
                value={invoiceData.bankAccount}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Dodavatel</h2>
            <Button
              onClick={() => setIsEditingSupplier(!isEditingSupplier)}
              variant="outline"
              size="sm"
            >
              {isEditingSupplier ? 'Zavřít' : 'Upravit'}
            </Button>
          </div>
          
          {isEditingSupplier ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Jméno</label>
                <input
                  type="text"
                  name="supplierName"
                  value={invoiceData.supplierName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">IČO</label>
                <input
                  type="text"
                  name="supplierICO"
                  value={invoiceData.supplierICO}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adresa</label>
                <input
                  type="text"
                  name="supplierAddress"
                  value={invoiceData.supplierAddress}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Město</label>
                <input
                  type="text"
                  name="supplierCity"
                  value={invoiceData.supplierCity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gray-50 rounded">
              <p>{invoiceData.supplierName} - IČO: {invoiceData.supplierICO}</p>
              <p>{invoiceData.supplierAddress}, {invoiceData.supplierCity}</p>
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Odběratel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Jméno</label>
              <input
                type="text"
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">IČO</label>
              <input
                type="text"
                name="customerICO"
                value={invoiceData.customerICO}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Adresa</label>
              <input
                type="text"
                name="customerAddress"
                value={invoiceData.customerAddress}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Město</label>
              <input
                type="text"
                name="customerCity"
                value={invoiceData.customerCity}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Položky faktury</h2>
          {invoiceData.items.map((item: Item, index: number) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Množství</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Jednotka</label>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Popis</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cena za ks</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Celkem</label>
                  <input
                    type="text"
                    value={item.totalPrice}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    onClick={() => removeItem(index)}
                    className="w-full"
                  >
                    Odstranit položku
                  </Button>
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addItem} className="mt-4">
            Přidat položku
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold">
            Celková částka: {invoiceData.totalAmount} Kč
          </p>
          <Button onClick={onGenerate} size="lg">
            Generovat fakturu
          </Button>
        </div>
      </div>
    </div>
  );
}
