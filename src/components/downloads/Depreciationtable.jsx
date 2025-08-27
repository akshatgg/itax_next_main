
'use client';
import React, { useMemo, useCallback } from 'react';

export default function Depreciationtable() {
  // —— Company details ——
  const COMPANY = useMemo(
    () => ({
      name: 'iTax-Easy Pvt. Ltd.',
      address1: ' Sat 1, Flat - 811, Logix Zest Blossom, Sector 143, Noida 201306 ( U.P)',
      address2: 'Main Branch: G - 41, Gandhi Nagar, Near Defence Colony, Padav Gwalior 474002 (M.P)',
    }),
    []
  );
  const LOGO_SRC = '/logo.svg';

  // Today (DD-MM-YYYY)
  const TODAY = useMemo(() => {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
  }, []);

  // —— Primary color for watermark (blue) ——
  const WM_COLOR = 'rgba(29, 78, 216, 1)'; // Tailwind blue-700

  // Blue tiled SVG watermark (print only)
  const WM_DATA_URI = useMemo(() => {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="280" height="180">
        <g transform="rotate(-30,140,90)">
          <text x="20" y="95"
                font-family="Arial, Helvetica, sans-serif"
                font-size="34"
                fill="${WM_COLOR}"
                fill-opacity="0.20">
            iTax-Easy
          </text>
        </g>
      </svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  }, []);

  // Print handler
  const exportPDFFile = useCallback(() => {
    const area = document.getElementById('print-area');
    if (!area) {
      alert('Nothing to print: #print-area not found.');
      return;
    }
    const hasText = area.innerText.replace(/\s+/g, '').length > 0;
    const hasRich = !!area.querySelector('img,table,svg,canvas,[data-printable]');
    if (!hasText && !hasRich) {
      area.setAttribute('data-empty', 'true');
      alert('No content to print.');
      return;
    }
    area.removeAttribute('data-empty');
    window.print();
  }, []);

  return (
    <>
      {/* Print CSS: force colors to appear in PDF, keep header with content, set margins, add watermark */}
      <style jsx global>{`
        @media print {
          html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* Hide everything by default; then reveal #print-area only */
          body * { visibility: hidden !important; }
          #print-area, #print-area * { visibility: visible !important; }

          /* Keep background & text colors in print */
          #print-area, #print-area * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          #print-area {
            position: absolute; left: 0; top: 0; width: 100%;
            background-image: url('${WM_DATA_URI}');
            background-repeat: repeat;
            background-size: 280px 180px;
          }

          /* If flagged empty, suppress page entirely */
          #print-area[data-empty="true"] { display: none !important; }

          /* Keep the header block with the next section */
          .no-break { break-inside: avoid !important; page-break-inside: avoid !important; }
          .keep-with-next { break-after: avoid-page !important; page-break-after: avoid !important; }

          /* Better table pagination */
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
          tr, thead tr { break-inside: avoid !important; page-break-inside: avoid !important; }

          /* Unclamp common wrappers */
          .print-unclamp { overflow: visible !important; }
          .print-block { display: block !important; }
          .print-mx-0 { margin-left: 0 !important; margin-right: 0 !important; }
          .print-p-0 { padding: 0 !important; }

          .noprint { display: none !important; }

          /* Page setup */
          @page { size: A4; margin: 14mm; }

          /* Remove any extra top gap on first child */
          #print-area > *:first-child { margin-top: 0 !important; padding-top: 0 !important; }
        }
      `}</style>

      {/* Controls (screen only) */}
      <div className="noprint mb-4 flex justify-end gap-2">
        <button
          onClick={exportPDFFile}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Download PDF (Main Content Only)
        </button>
      </div>

      {/* ======== PRINTABLE AREA (blue theme) ======== */}
      <div id="print-area" className="text-[13px] text-blue-800">
        {/* Header (print only) — keeps the next block on the same page */}
        <div className="hidden print:block no-break keep-with-next">
          <h5 className="my-3 text-center text-base font-semibold text-blue-900">
            Depreciation Table
          </h5>

          {/* Just under heading: left logo, right company info + date */}
          <div className="mb-2 flex items-start justify-between gap-4">
            {/* Left: Logo */}
            <div className="shrink-0">
              <img src={LOGO_SRC} alt="Company logo" className="h-9 w-auto" />
            </div>

            {/* Right: Company info & date */}
            <div className="text-right leading-tight">
              <div className="font-semibold text-blue-900">{COMPANY.name}</div>
              <div>{COMPANY.address1}</div>
              <div>{COMPANY.address2}</div>
              <div className="mt-1">Date: {TODAY}</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 print-unclamp print-mx-0">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 print-block print-p-0">
              <div className="overflow-x-auto print-unclamp">
                <table
                  className="min-w-full border border-blue-300 text-[12.5px]"
                  id="depreciationtable"
                >
                  <thead>
                    <tr className="bg-blue-200 text-blue-900">
                      <th className="w-10 border border-blue-300 px-3 py-2 font-semibold"></th>
                      <th className="border border-blue-300 px-3 py-2 text-left font-semibold">
                        Block of Assets
                      </th>
                      <th className="border border-blue-300 px-3 py-2 font-semibold">
                        Depreciation<br />allowance (%)
                      </th>
                      <th className="border border-blue-300 px-3 py-2 font-semibold">
                        Depreciation<br />allowance (%)
                      </th>
                      <th className="border border-blue-300 px-3 py-2 font-semibold">
                        Depreciation<br />allowance (%)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* AY row */}
                    <tr>
                      <td className="border border-blue-300 px-3 py-2" colSpan={2}></td>
                      <td className="border border-blue-300 px-3 py-2">A.Y 2018-19 onwards</td>
                      <td className="border border-blue-300 px-3 py-2">A.Y. 2006-07 to 2017-18</td>
                      <td className="border border-blue-300 px-3 py-2">A.Y. 2003-04 to 2005-06</td>
                    </tr>

                    {/* I. Buildings band */}
                    <tr className="bg-blue-100">
                      <th colSpan={2} className="border border-blue-300 px-3 py-2 text-left font-semibold">
                        I. Buildings
                        <div className="text-[11px] text-blue-700">[See Notes 1 to 4]</div>
                      </th>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                    </tr>

                    <tr className="bg-blue-50">
                      <td className="border border-blue-300 px-3 py-2 align-top">(1)</td>
                      <td className="border border-blue-300 px-3 py-2">
                        Buildings mainly for residential use<br />except hotels/boarding houses
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">5</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">5</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">5</td>
                    </tr>

                    <tr>
                      <td className="border border-blue-300 px-3 py-2">(2)</td>
                      <td className="border border-blue-300 px-3 py-2">
                        Building other than those used mainly for residential purposes and not
                        covered by sub-items (1) above and (3) below
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">10</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">10</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">10</td>
                    </tr>

                    <tr className="bg-blue-50">
                      <td className="border border-blue-300 px-3 py-2">(3)</td>
                      <td className="border border-blue-300 px-3 py-2">
                        Building acquired on or after 1 Sept 2002 for installing machinery and plant
                        forming part of water supply project or water treatment system and used for
                        business of providing infrastructure facilities under section 80-IA(4)(i)
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">
                        <span className="font-semibold text-red-600">40</span>
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">100</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">100</td>
                    </tr>

                    <tr>
                      <td className="border border-blue-300 px-3 py-2">(4)</td>
                      <td className="border border-blue-300 px-3 py-2">Purely temporary erections such as wooden structures</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">
                        <span className="font-semibold text-red-600">40</span>
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">100</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">100</td>
                    </tr>

                    {/* II. Furniture & Fittings */}
                    <tr className="bg-blue-100">
                      <th colSpan={2} className="border border-blue-300 px-3 py-2 text-left font-semibold">
                        II. Furniture and Fittings
                      </th>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                    </tr>

                    <tr>
                      <td className="border border-blue-300 px-3 py-2">(1)</td>
                      <td className="border border-blue-300 px-3 py-2">
                        Furniture and fittings including electrical fittings
                        <span className="text-[11px] text-blue-700"> [See Note 5]</span>
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">10</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">10</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">15</td>
                    </tr>

                    {/* III. Machinery & Plant */}
                    <tr className="bg-blue-100">
                      <th colSpan={2} className="border border-blue-300 px-3 py-2 text-left font-semibold">
                        III. Machinery and Plant
                      </th>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2"></td>
                    </tr>

                    <tr>
                      <td className="border border-blue-300 px-3 py-2">(1)</td>
                      <td className="border border-blue-300 px-3 py-2">
                        Machinery and plant other than those covered by sub-items (2), (3) and (8) below
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">15</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">15</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">25</td>
                    </tr>

                    {/* ===== PART B ===== */}
                    <tr>
                      <td colSpan={5} className="border border-blue-300 bg-blue-200 px-3 py-1 text-center font-semibold text-blue-900">
                        PART B
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5} className="border border-blue-300 px-3 py-1 text-center font-semibold text-blue-900">
                        INTANGIBLE ASSETS
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-blue-300 px-3 py-2"></td>
                      <td className="border border-blue-300 px-3 py-2">
                        Know-how, patents, copyrights, trademarks, licences, franchises or any
                        other business or commercial rights of similar nature
                      </td>
                      <td className="border border-blue-300 px-3 py-2 text-center">25</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">25</td>
                      <td className="border border-blue-300 px-3 py-2 text-center">25</td>
                    </tr>
                  </tbody>
                </table>

                {/* Notes */}
                <div className="mt-3 border-t border-blue-300 pt-1">
                  <div className="text-sm font-semibold text-blue-900">Note:-</div>
                  <ol className="mt-1 list-inside list-decimal space-y-1">
                    <li>“Buildings” include roads, bridges, culverts, wells and tube-wells.</li>
                    <li>
                      A building shall be deemed to be used mainly for residential purposes if
                      the built-up floor area used for residential purposes is not less than
                      sixty-six and two-third per cent of its total built-up floor area and shall
                      include any such building in the factory premises.
                    </li>
                    <li>
                      For any structure/work by way of renovation or improvement in or in relation to a
                      building referred to in Explanation 1 of clause (ii) of sub-item (1) of section 32,
                      apply the percentage specified against item I(1) or I(2) as appropriate. Where the
                      structure/work is an extension, apply as a separate building.
                    </li>
                    <li>Water treatment system includes desalinisation, demineralisation and purification.</li>
                    <li>“Electrical fittings” include wiring, switches, sockets, other fittings and fans, etc.</li>
                    <li>Vehicle definitions are as per the Motor Vehicles Act, 1988.</li>
                    <li>“Computer software” means any program recorded on any storage device.</li>
                    <li>“TUFS” means Technology Upgradation Fund Scheme (MoT, 31-3-1999).</li>
                    <li>Pipes to/from plant/storage are included as machinery and plant.</li>
                    <li>
                      “Speed boat” means a motor boat capable of a maximum speed of 24 km/h in still water
                      and designed to rise from the water surface at such speed.
                    </li>
                  </ol>
                </div>

                <div className="mt-6 text-center text-blue-700">
                  [As amended by Finance Act, 2022]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* /print-area */}
    </>
  );
}
