'use client';
import DashSection from '@/components/pagesComponents/pageLayout/DashSection';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { IoMdDownload } from 'react-icons/io';
import Button from '@/components/ui/Button';
import OverviewTable from '../OverviewTable';

/* ---------- helpers ---------- */
const formatDate = (ts) =>
  new Date(ts).toLocaleString('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

const tableData = {
  'Party Name': 'partyName',
  Date: 'createdAt',
  'GST Number': 'gstNumber',
  'Invoice No.': 'invoiceNumber',
  Amount: 'totalAmount',
  Status: 'status',
};

/* ====== minimal XLS export helpers (unchanged) ====== */
const xmlEsc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const buildItems = (salesInvoices = []) =>
  salesInvoices.length
    ? salesInvoices.map((inv) => ({
      description: inv.partyName
        ? `${inv.partyName} — ${inv.invoiceNumber || ''}`.trim()
        : inv.invoiceNumber || 'Item',
      price: Number(inv.totalAmount) || 0,
      qty: 1,
    }))
    : [{ description: 'Sample', price: 0, qty: 1 }];

const buildSheetXml = (items) => {
  const widths = [260, 90, 90, 120];
  const cols = widths.length;
  const subtotal = items.reduce((s, r) => s + (Number(r.price) || 0) * (Number(r.qty) || 0), 0);
  const tax = Math.round(subtotal * 0.18 * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  const rowHeader = 6;
  const rowItemsStart = 7;
  const rowItemsEnd = rowItemsStart + items.length - 1;
  const lastRow = rowItemsEnd + 10;
  const LOCK_SHEET = true;

  const parts = [];
  parts.push(
    '<?xml version="1.0"?>',
    '<?mso-application progid="Excel.Sheet"?>',
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ',
    'xmlns:o="urn:schemas-microsoft-com:office:office" ',
    'xmlns:x="urn:schemas-microsoft-com:office:excel" ',
    'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ',
    'xmlns:html="http://www.w3.org/TR/REC-html40">',
    `<Names><NamedRange ss:Name="_Print_Area" ss:RefersTo="=Invoice!R1C1:R${lastRow}C${cols}"/></Names>`,
    '<Styles>',
    '<Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Center"/><Borders/><Font ss:FontName="Calibri" ss:Size="11"/><Interior/><NumberFormat/><Protection/></Style>',
    '<Style ss:ID="sCompany"><Font ss:Bold="1" ss:Size="14" ss:Color="#1F4E78"/><Alignment ss:Horizontal="Left" ss:Vertical="Center"/></Style>',
    '<Style ss:ID="sMuted"><Font ss:Size="10" ss:Color="#374151"/><Alignment ss:Horizontal="Left" ss:Vertical="Center"/></Style>',
    '<Style ss:ID="sBigTitle"><Font ss:Bold="1" ss:Size="16"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>',
    '<Style ss:ID="sHeaderBand"><Font ss:Bold="1"/><Interior ss:Color="#C9DAF8" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sCellL"><Alignment ss:Horizontal="Left" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sCellR"><Alignment ss:Horizontal="Right" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sMoney"><NumberFormat ss:Format="&quot;₹&quot;#,##0.00"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sMoneyBold"><Font ss:Bold="1"/><NumberFormat ss:Format="&quot;₹&quot;#,##0.00"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/><Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sTotalsLabel"><Font ss:Bold="1"/><Interior ss:Color="#F2F2F2" ss:Pattern="Solid"/><Alignment ss:Horizontal="Right" ss:Vertical="Center"/></Style>',
    '<Style ss:ID="sSig"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Borders><Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/></Borders></Style>',
    '<Style ss:ID="sFooter"><Font ss:Italic="1"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>',
    '</Styles>',
    '<Worksheet ss:Name="Invoice" ss:Protected="1"><Table ss:DefaultRowHeight="18">',
    ...widths.map((w) => `<Column ss:Width="${w}"/>`),
    `<Row ss:Height="22"><Cell ss:StyleID="sCompany" ss:MergeAcross="1"><Data ss:Type="String">Itax Easy Pvt Ltd</Data></Cell><Cell ss:StyleID="sBigTitle" ss:MergeAcross="1" ss:MergeDown="1"><Data ss:Type="String">Sales Invoice</Data></Cell></Row>`,
    `<Row><Cell ss:StyleID="sMuted" ss:MergeAcross="1"><Data ss:Type="String">(Street Address), (City, ST ZIP Code)</Data></Cell></Row>`,
    `<Row><Cell ss:StyleID="sMuted" ss:MergeAcross="1"><Data ss:Type="String">Phone: 555-555-5555</Data></Cell></Row>`,
    `<Row><Cell ss:StyleID="sMuted" ss:MergeAcross="1"><Data ss:Type="String">abc@example.com</Data></Cell></Row>`,
    '<Row><Cell/><Cell/><Cell/><Cell/></Row>',
    '<Row>',
    '<Cell ss:StyleID="sHeaderBand"><Data ss:Type="String">Description</Data></Cell>',
    '<Cell ss:StyleID="sHeaderBand"><Data ss:Type="String">Price</Data></Cell>',
    '<Cell ss:StyleID="sHeaderBand"><Data ss:Type="String">Quantity</Data></Cell>',
    '<Cell ss:StyleID="sHeaderBand"><Data ss:Type="String">Extension</Data></Cell>',
    '</Row>'
  );

  items.forEach((r) => {
    const price = Number(r.price || 0);
    const qty = Number(r.qty || 0);
    parts.push(
      '<Row>',
      `<Cell ss:StyleID="sCellL"><Data ss:Type="String">${xmlEsc(r.description || '')}</Data></Cell>`,
      `<Cell ss:StyleID="sMoney"><Data ss:Type="Number">${price.toFixed(2)}</Data></Cell>`,
      `<Cell ss:StyleID="sCellR"><Data ss:Type="Number">${qty}</Data></Cell>`,
      `<Cell ss:StyleID="sMoney" ss:Formula="=RC[-2]*RC[-1]"><Data ss:Type="Number">${(price * qty).toFixed(2)}</Data></Cell>`,
      '</Row>'
    );
  });

  for (let i = 0; i < 3; i++) {
    parts.push('<Row><Cell ss:StyleID="sCellL"/><Cell ss:StyleID="sCellR"/><Cell ss:StyleID="sCellR"/><Cell ss:StyleID="sCellR"/></Row>');
  }

  parts.push(
    `<Row><Cell/><Cell/><Cell ss:StyleID="sTotalsLabel"><Data ss:Type="String">Sub Total:</Data></Cell><Cell ss:StyleID="sMoney"><Data ss:Type="Number">${subtotal.toFixed(2)}</Data></Cell></Row>`,
    `<Row><Cell/><Cell/><Cell ss:StyleID="sTotalsLabel"><Data ss:Type="String">Tax:</Data></Cell><Cell ss:StyleID="sMoney"><Data ss:Type="Number">${tax.toFixed(2)}</Data></Cell></Row>`,
    `<Row><Cell/><Cell/><Cell ss:StyleID="sTotalsLabel"><Data ss:Type="String">Total Due:</Data></Cell><Cell ss:StyleID="sMoneyBold"><Data ss:Type="Number">${total.toFixed(2)}</Data></Cell></Row>`,
    '<Row><Cell/><Cell/><Cell/><Cell/></Row>',
    '<Row ss:Height="24"><Cell ss:StyleID="sSig"><Data ss:Type="String">Signatures</Data></Cell><Cell/><Cell ss:StyleID="sSig"><Data ss:Type="String">Date</Data></Cell><Cell/></Row>',
    '<Row><Cell/><Cell/><Cell/><Cell/></Row>',
    '<Row ss:Height="20"><Cell ss:StyleID="sFooter" ss:MergeAcross="3"><Data ss:Type="String">Thank You For Your Business!</Data></Cell></Row>',
    '</Table>',
    `<AutoFilter x:Range="R${rowHeader}C1:R${rowHeader}C${cols}"/>`,
    '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">',
    '<Selected/>',
    '<ProtectObjects>True</ProtectObjects><ProtectScenarios>True</ProtectScenarios>',
    '<PageSetup><Header x:Margin="0.3"/><Footer x:Margin="0.3"/><PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75"/></PageMargins></PageSetup>',
    '<FitToPage/><FitWidth>1</FitWidth><FitHeight>0</FitHeight>',
    '<DoNotDisplayGridlines/><FreezePanes/><SplitHorizontal>6</SplitHorizontal><TopRowBottomPane>6</TopRowBottomPane><ActivePane>2</ActivePane>',
    '</WorksheetOptions></Worksheet>',
    '</Workbook>'
  );

  return parts.join('');
};

const downloadXls = (xml, filename = 'Sales_Invoice.xls') => {
  const blob = new Blob(['﻿' + xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
};

/* ---------- component ---------- */
export default function Sales(props) {
  const router = useRouter();
  const { salesInvoices = [], loading, error } = props || {};

  const handleExport = () => {
    const items = buildItems(salesInvoices);
    const xml = buildSheetXml(items);
    downloadXls(xml);
  };

  if (loading) return <div className="py-6 text-center">loading</div>;
  if (error?.isError) return <div className="py-6 text-center">{error?.response?.data?.message || 'Something went wrong'}</div>;

  return (
    <DashSection
      title={
        <span className="text-lg font-bold text-blue-600 pl-2">
          Sales Invoices
        </span>}
      titleRight={
        <div className="flex items-center gap-2 mb-2">
          <Button
            accessKey="n"
            title="Shortcut: Alt+Shift+N"
            onClick={() => router.push('/dashboard/accounts/invoice/sales/create')}
            className="m-1 px-2 py-1 text-xs h-8 flex items-center gap-1 justify-center mt-2"
          > C</Button>
          <Button
            accessKey="e"
            title="Shortcut: Alt+Shift+E"
            onClick={handleExport}
            className="m-1 px-2 py-1 text-xs h-8 flex items-center gap-1 justify-center mr-4 mt-2">
            <IoMdDownload />
          </Button>
        </div>
      }
      className="py-0"
    >
      <div>
      <OverviewTable
        handleEdit={() => {}}
        invoices={salesInvoices}
        refresh={() => {}}
        search={null}
        setSearch={() => {}}
        pagination={null}
        currentPage={1}
        setCurrentPage={() => {}}
      />
     </div>
      {/* <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-230px)] overflow-y-auto p-1 border border-t">
        {(!salesInvoices || salesInvoices.length === 0) ? (
          <div className="grid place-content-center h-full">
            <Icon className="w-40 h-24 opacity-5 mx-auto" icon="ph:files-light" />
            <p className="text-center">No Record Found</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-nowrap">
              <thead className="text-left">
                <tr>
                  {Object.keys(tableData).map((column) => (
                    <th key={column} className="border-b px-3 py-2">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-left">
                {salesInvoices.map((invoice, index) => (
                  <tr key={invoice?.id ?? `row-${index}`} className={index % 2 !== 0 ? 'bg-blue-100' : ''}>
                    {Object.keys(tableData).map((column) => (
                      <td
                        key={`${invoice?.id ?? index}-${tableData[column]}`}
                        className={`px-3 py-2 ${column === 'Status' ? 'text-orange-500' : ''}`}
                      >
                        {column === 'Date'
                          ? formatDate(invoice[tableData[column]])
                          : invoice[tableData[column]]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div> */}
    </DashSection>
  );
}
