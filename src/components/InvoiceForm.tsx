import React from 'react';
import { X } from 'lucide-react';

// ... (interfaces remain the same)

export default function InvoiceForm({ invoiceData, setInvoiceData, onGenerate }: InvoiceFormProps) {
  // ... (state and handlers remain the same)

  return (
    <div className="card">
      <div className="space-y-8">
        {/* Basic Info */}
        <div>
          <h2 className="section-title">Základní údaje</h2>
          <div className="form-grid">
            <div>
              <label>Číslo faktury</label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Bankovní účet</label>
              <input
                type="text"
                name="bankAccount"
                value={invoiceData.bankAccount}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Supplier */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Dodavatel</h2>
            <button
              onClick={() => setIsEditingSupplier(!isEditingSupplier)}
              className="btn btn-secondary"
            >
              {isEditingSupplier ? 'Zavřít' : 'Upravit'}
            </button>
          </div>
          
          {isEditingSupplier ? (
            <div className="form-grid">
              <div>
                <label>Jméno</label>
                <input
                  type="text"
                  name="supplierName"
                  value={invoiceData.supplierName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>IČO</label>
                <input
                  type="text"
                  name="supplierICO"
                  value={invoiceData.supplierICO}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Adresa</label>
                <input
                  type="text"
                  name="supplierAddress"
                  value={invoiceData.supplierAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Město</label>
                <input
                  type="text"
                  name="supplierCity"
                  value={invoiceData.supplierCity}
                  onChange={handleInputChange}
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
        <div>
          <h2 className="section-title">Odběratel</h2>
          <div className="form-grid">
            <div>
              <label>Jméno</label>
              <input
                type="text"
                name="customerName"
                value={invoiceData.customerName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>IČO</label>
              <input
                type="text"
                name="customerICO"
                value={invoiceData.customerICO}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Adresa</label>
              <input
                type="text"
                name="customerAddress"
                value={invoiceData.customerAddress}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Město</label>
              <input
                type="text"
                name="customerCity"
                value={invoiceData.customerCity}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h2 className="section-title">Položky faktury</h2>
          {invoiceData.items.map((item: Item, index: number) => (
            <div key={index} className="item-card">
              <button
                onClick={() => removeItem(index)}
                className="absolute right-2 top-2 p-1.5 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Odstranit položku"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                <div>
                  <label>Množství</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                  />
                </div>
                <div>
                  <label>Jednotka</label>
                  <input
                    type="text"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                  />
                </div>
                <div>
                  <label>Popis</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <label>Cena za ks</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                  />
                </div>
                <div>
                  <label>Celkem</label>
                  <input
                    type="text"
                    value={item.totalPrice}
                    readOnly
                    className="bg-gray-50 text-gray-500"
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addItem} className="btn btn-primary">
            Přidat položku
          </button>
        </div>

        <div className="flex justify-between items-center pt-6 border-t">
          <p className="text-xl font-semibold">
            Celková částka: {invoiceData.totalAmount} Kč
          </p>
          <button onClick={onGenerate} className="btn btn-primary px-6">
            Generovat fakturu
          </button>
        </div>
      </div>
    </div>
  );
}
