import DownloadButton from './DownloadButton';

const Depreciationtable = () => {
  return (
    <>
      <div>
        <h5 className="text-center my-5">Depreciation Table</h5>
        {/* <h6 className="text-center">[See Rule 5]</h6>
        <p className="text-danger text-center">
          (Rates changed w.e.f. A.Y. 2018-19 has been shown in red color)
        </p> */}
        <div>
          <div className="flex justify-end">
            <DownloadButton
              id={'#depreciationtable'}
              fileName={'Depreciationtable.pdf'}
            >
              Download
            </DownloadButton>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-x-auto">
                  <table
                    className="table border-collapse border border-gray-300 "
                    id="depreciationtable"
                  >
                    <thead class="border-b">
                      <tr className="bg-blue-300">
                        <th className="border border-gray-300 p-2 font-semibold"></th>
                        <th
                          className="border border-gray-300 p-2 font-semibold"
                          align="left"
                        >
                          Block of Assets
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Depreciation allowance as percentage of written down
                          value
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Depreciation allowance as percentage of written down
                          value
                        </th>
                        <th className="border border-gray-300 p-2 font-semibold">
                          Depreciation allowance as percentage of written down
                          value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="h-10 text-left">
                        <td
                          className="border border-gray-300 p-2"
                          colSpan={2}
                        ></td>
                        <td className="border border-gray-300 p-2">
                          A.Y 2018-19 onwards
                        </td>
                        <td className="border border-gray-300 p-2">
                          A.Y. 2006-07 to 2017-18
                        </td>
                        <td className="border border-gray-300 p-2">
                          A.Y. 2003-04 to 2005-06
                        </td>
                      </tr>
                      <tr className="h-10 text-left">
                        <th colSpan={2}>
                          I. Buildings{' '}
                          <p className="text-info">
                            {' '}
                            [See Notes 1 to 4 below the Table]
                          </p>
                        </th>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="table-primary">(1)</td>
                        <td className="table-primary">
                          Buildings which are used mainly for residential
                          purposes except hotels and boarding houses
                        </td>
                        <td className="table-primary">5</td>
                        <td className="table-primary">5</td>
                        <td className="table-primary">5</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(2)</td>
                        <td className="border border-gray-300 p-2">
                          Building other than those used mainly for residential
                          purposes and not covered by sub-items (1) above and
                          (3) below
                        </td>
                        <td className="border border-gray-300 p-2">10</td>
                        <td className="border border-gray-300 p-2">10</td>
                        <td className="border border-gray-300 p-2">10</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="table-primary">(3)</td>
                        <td className="table-primary">
                          Building acquired on or after the 1st day of
                          September, 2002 for installing machinery and plant
                          forming part of water supply project or water
                          treatment system and which is put to use for the
                          purpose of business of providing infrastructure
                          facilities under clause (i) of sub-section (4) of
                          section 80-IA
                        </td>
                        <td className="table-primary">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="table-primary">100</td>
                        <td className="table-primary">100</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(4)</td>
                        <td className="border border-gray-300 p-2">
                          Purely temporary erections such as wooden structures
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <th colSpan={2}>II. Furniture and Fittings </th>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(1)</td>
                        <td className="border border-gray-300 p-2">
                          Furniture and Fittings including electrical fittings
                          [See Note 5 below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">10</td>
                        <td className="border border-gray-300 p-2">10</td>
                        <td className="border border-gray-300 p-2">15</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <th colSpan={2}>III. Machinery and Plant </th>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(1)</td>
                        <td className="border border-gray-300 p-2">
                          Machinery and plant other than those covered by
                          sub-items (2), (3) and (8) below
                        </td>
                        <td className="border border-gray-300 p-2">15</td>
                        <td className="border border-gray-300 p-2">15</td>
                        <td className="border border-gray-300 p-2">25</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(2)</td>
                        <td className="border border-gray-300 p-2">
                          Motor cars, other than those used in a business of
                          running them on hire, acquired or put to use on or
                          after the 1st day of April, 1990
                        </td>
                        <td className="border border-gray-300 p-2">15</td>
                        <td className="border border-gray-300 p-2">15</td>
                        <td className="border border-gray-300 p-2">20</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(3) (i)</td>
                        <td className="border border-gray-300 p-2">
                          Aeroplanes – Aeroengines
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">40</td>
                        <td className="border border-gray-300 p-2">40</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(ii)</td>
                        <td className="border border-gray-300 p-2">
                          Motor buses, motor lorries and motor taxis used in a
                          business of running them on hire
                        </td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">40</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(iii)</td>
                        <td className="border border-gray-300 p-2">
                          Commercial vehicle which is acquired by the assessee
                          on or after the 1st day of October, 1998, but before
                          the 1st day of April, 1999 and is put to use for any
                          period before the 1st day of April, 1999 for the
                          purposes of business or profession in accordance with
                          the third proviso to clause (ii) of sub-section (1) of
                          section 32 [See Note 6 below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">40</td>
                        <td className="border border-gray-300 p-2">40</td>
                        <td className="border border-gray-300 p-2">40</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(iv)</td>
                        <td className="border border-gray-300 p-2">
                          New commercial vehicle which is acquired on or after
                          the 1st day of October, 1998 but before the 1st day of
                          April, 1999 in replacement of condemned vehicle of
                          over 15 years of age and is put to use for any period
                          before the 1st day of April, 1999 for the purposes of
                          business or profession in accordance with the third
                          proviso to clause (ii) of sub-section (1) of section
                          32 [See Note 6 below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">60</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(v)</td>
                        <td className="border border-gray-300 p-2">
                          New commercial vehicle which is acquired on or after
                          the Ist day of April, 1999 but before the Ist day of
                          April, 2000 in replacement of condemned vehicle of
                          over 15 years of age and is put to use before the 1st
                          day of April, 2000 for the purposes of business or
                          profession in accordance with the second proviso to
                          clause (ii) sub-section (1) of section 32 [See Note 6
                          below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">60</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(vi)</td>
                        <td className="border border-gray-300 p-2">
                          New commercial vehicle which is acquired on or after
                          the 1st day of April, 2001 but before the 1st day of
                          April, 2002 and is put to use before the 1st day of
                          April, 2002 for the purposes of business or profession
                          [See Note 6 below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">50</td>
                        <td className="border border-gray-300 p-2">50</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(vii)</td>
                        <td className="border border-gray-300 p-2">
                          Moulds used in rubber and plastic goods factories
                        </td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">50</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(viii)</td>
                        <td className="border border-gray-300 p-2">
                          Air Pollution control equipment being <br />
                          (a) Electrostatic precipitation systems <br />
                          (b) Felt-filter systems <br />
                          (c) Dust collector systems <br />
                          (d) Scrubber-counter
                          current/venturi/packed-bed/cyclonic scrubbers <br />
                          (e) Ash handling system and evacuation being
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(ix)</td>
                        <td className="border border-gray-300 p-2">
                          Water pollution control equipment being (a) Mechanical
                          screen systems <br />
                          (b) Aerated detritus chambers (including air
                          compressor) <br />
                          (c) Mechanically skimmed oil and grease removal
                          systems <br />
                          (d) Chemical feed systems and flash mixing equipment{' '}
                          <br />
                          (e) Mechanical flocculators and mechanical reactors{' '}
                          <br />
                          (f) Diffused air/mechanically aerated activated sludge
                          systems <br />
                          (g) Aerated lagoon systems <br />
                          (h) Biofilters <br />
                          (i) Methane-recovery anaerobic digester systems <br />
                          (j) Air floatation systems <br />
                          (k) Air/steam stripping systems <br />
                          (l) Urea hydrolysis systems <br />
                          (m) Marine outfall systems <br />
                          (n) Centrifuge for dewatering sludge <br />
                          (o) Rotating biological contractor or bio-disc <br />
                          (p) Ion exchange resin column <br />
                          (q) Activated carbon column
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(x)</td>
                        <td className="border border-gray-300 p-2">
                          (a) Solidwaste control equipments, being-
                          caustic/lime/chrome/mineral/ cryolite recovery system{' '}
                          <br />
                          (b) Solidwaste recycling and resource recovery systems
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(xi)</td>
                        <td className="border border-gray-300 p-2">
                          Machinery and plant used in semi-conductor industry
                          convering all integrated circuits (ICs) (excluding
                          hybrid integrated circuits) ranging from small scale
                          integration (SSI) to large scale integration/very
                          large scale integration (LSI/VLSI) as also discrete
                          semi-conductor devices such as diodes, transistors,
                          thyristors, triacs, etc.) other than those covered by
                          entries (viii), (ix) and (x) of this sub-item and
                          sub-item (8) below
                        </td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">30</td>
                        <td className="border border-gray-300 p-2">40</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(xia)</td>
                        <td className="border border-gray-300 p-2">
                          Life saving medical equipment, being- (a) D.C.
                          Defibrillators for internal use and pace makers <br />
                          (b) Haemodialysors <br />
                          (c) Heart lung machine <br />
                          (d) Cobalt Therapy Unit <br />
                          (e) Colour Doppler <br />
                          (f) SPECT Gamma Camera <br />
                          (g) Vascular Angiography System including Digital
                          subtraction Angiography <br />
                          (h) Ventilator used with anaesthesia apparatus <br />
                          (i) Magnetic Resonance Imaging System <br />
                          (j) Surgical Laser <br />
                          (k) Ventilators other than those used with anaesthesia{' '}
                          <br />
                          (l) Gamma knife <br />
                          (m) Bone Marrow Transplant Equipment including
                          silastic long standing intravenous catheters for
                          chemotherapy <br />
                          (n) Fibreoptic endoscopes including Paediatirc
                          resectoscope/audit resectoscope, Peritoneoscopes,
                          Arthoscope, Microlaryngoscope, Fibreoptic Flexible
                          Nasal Pharyngo Bronchoscope, Fibreoptic Flexible
                          Laryngo Bronchoscope, Video Laryngo Bronchoscope and
                          Video Oesophago Gastroscope, Stroboscope, Fibreoptic
                          Flexible Oesophago Gastroscope <br />
                          (o) Laparoscope (single incision)
                        </td>
                        <td className="border border-gray-300 p-2">40</td>
                        <td className="border border-gray-300 p-2">40</td>
                        <td className="border border-gray-300 p-2">40</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(4)</td>
                        <td className="border border-gray-300 p-2">
                          Containers made of glass or plastic used as re-fills
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">50</td>
                        <td className="border border-gray-300 p-2">50</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(5)</td>
                        <td className="border border-gray-300 p-2">
                          Computers including computer software [See note 7
                          below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">60</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(6)</td>
                        <td className="border border-gray-300 p-2">
                          Machinery and plant, used in weaving, processing and
                          garment sector of textile industry, which is purchased
                          under TUFS on or after the 1st day of April, 2001 but
                          before the 1st day of April, 2004 and is put to use
                          before the 1st day of April, 2004 [See Note 8 below
                          the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">50</td>
                        <td className="border border-gray-300 p-2">50</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(7)</td>
                        <td className="border border-gray-300 p-2">
                          Machinery and plant, acquired and installed on or
                          after the 1st day of September, 2002 in a water supply
                          project or a water treatment system and which is put
                          to use for the purpose of business of providing
                          infrastructure facility under clause (i) of
                          sub-section (4) of section 80-IA [See Notes 4 and 9
                          below the Table]
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(8) (i)</td>
                        <td className="border border-gray-300 p-2">
                          Wooden parts used in artificial silk manufacturing
                          machinery
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(ii)</td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          Cinematograph films-bulbs of studio lights
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(iii)</td>
                        <td className="border border-gray-300 p-2">
                          Match factories-Wooden match frames
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(iv)</td>
                        <td className="border border-gray-300 p-2">
                          Mines and quarries (a) Tubs, winding ropes, haulage
                          rope and sand stowing pipes
                          <br />
                          (b) Safety lamps
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(v)</td>
                        <td className="border border-gray-300 p-2">
                          Salt works-Salt pans, reservoirs and condensers, etc.,
                          made of earthy, sand or clayey material or any other
                          similar material
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">100</td>
                        <td className="border border-gray-300 p-2">100</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(vi)</td>
                        <td className="border border-gray-300 p-2">
                          Flour Mills-Rollers
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(vii)</td>
                        <td className="border border-gray-300 p-2">
                          Iron and Steel industry-Rolling mill rolls
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(viii)</td>
                        <td className="border border-gray-300 p-2">
                          Sugar Works-Rollers
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(ix)</td>
                        <td className="border border-gray-300 p-2">
                          Energy saving devices being-
                        </td>
                        <td className="border border-gray-300 p-2"> </td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">A.</td>
                        <td className="border border-gray-300 p-2">
                          Specialised boilers and furnaces; (a)
                          Ignifluid/fluidized bed boilers <br />
                          (b) Flameless furnaces and continuous pusher type
                          furnaces <br />
                          (c) Fluidized bed type hear treatment furnaces <br />
                          (d) High efficiency boilers (thermal efficiency higher
                          than 75 per cent in case of coal fired and 80 per cent
                          in case of oil/gas fired boilers
                        </td>
                        <td className="border border-gray-300 p-2">
                          {' '}
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">B.</td>
                        <td className="border border-gray-300 p-2">
                          Instrumentation and monitoring system energy flows;
                          (a) Automatic electrical load monitoring systems{' '}
                          <br />
                          (b) Digital heat loss meters <br />
                          (c) Micro-processor based control systems <br />
                          (d) Infra-red thermography <br />
                          (e) Meters for measuring heat losses, furnace oil
                          flow, stream flow, electric energy and power factor
                          meters <br />
                          (f) Maximum demand indicator and clamp on power meters{' '}
                          <br />
                          (g) Exhaust gases analyzer <br />
                          (h) Fuel oil pump test bench
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">C.</td>
                        <td className="border border-gray-300 p-2">
                          Waste heat recovery equipments; (a) Economisers and
                          feed water heaters <br />
                          (b) Recuperators and air pre-heaters <br />
                          (c) Head pumps <br />
                          (d) Thermal energy wheel for high and low temperature
                          waste heat recovery
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">D.</td>
                        <td className="border border-gray-300 p-2">
                          Co-Generation systems; (a) Back pressure pass out,
                          controlled extraction, extraction-cum- condensing
                          turbines for co-generation along with pressure boilers{' '}
                          <br />
                          (b) Vapour absorption refrigeration systems <br />
                          (c) Organic rankine cycle power systems <br />
                          (d) Low inlet pressure small steam turbines
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">E.</td>
                        <td className="border border-gray-300 p-2">
                          Electrical equipments (a) Shunt capacitors and
                          synchronous condenser systems <br />
                          (b) Automatic power cut off devices (relays) mounted
                          on individual motors <br />
                          (c) Automatic voltage controller <br />
                          (d) Power factor controller for AC Motors <br />
                          (e) Solid state devices for controlling motor speeds{' '}
                          <br />
                          (f) Thermally energy-efficient stenters (which require
                          800 or less kilocalories of heat to evaporate one
                          kilogram of water) <br />
                          (g) Series compensation equipment <br />
                          (h) Flexible AC Transmission (FACT) devices- Thyristor
                          controlled series compensation equipment <br />
                          (i) Time of Day (TOD) energy meters <br />
                          (j) Equipment to establish transmission highways for
                          National Power Grid to facilitate transfer of surplus
                          power of one region to the deficient region <br />
                          (k) Remove terminal units/intelligent electronic
                          devices, computer hardware/software, router/bridges,
                          other required equipment and associated communication
                          systems for supervisory control and data acquisition
                          systems, energy management systems and distribution
                          management systems for power transmission systems{' '}
                          <br />
                          (l) Special energy meters for Availability Based
                          Tariff (ABT)
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">F.</td>
                        <td className="border border-gray-300 p-2">
                          Burners; (a) 0 to 10 per cent excess air burners{' '}
                          <br />
                          (b) Emulsion burners <br />
                          (c) Burners using air with high pre-heat temperature
                          (above 300’ C)
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">G.</td>
                        <td className="border border-gray-300 p-2">
                          Other equipment; (a) Wet air oxidation equipment for
                          recovery of chemicals and heat <br />
                          (b) Mechanical vapour recompressors <br />
                          (c) Thin film evaporators <br />
                          (d) Automatic micro-processor based load demand
                          controllers <br />
                          (e) Coal based producer gas plants <br />
                          (f) Fluid drives and fluid couplings <br />
                          (g) Turbo Charges/super charges <br />
                          (h) Sealed radiation sources for radiation processing
                          plants
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(x)</td>
                        <td className="border border-gray-300 p-2">
                          Gas cylinders including valves and regulators
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(xi)</td>
                        <td className="border border-gray-300 p-2">
                          Glass manufacturing concerns – Direct fire glass
                          melting furnaces
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(xii)</td>
                        <td className="border border-gray-300 p-2">
                          Mineral Oil concerns (a) Plant used in field
                          operations (above ground), distribution-Returnable
                          <br />
                          (b) Plant used in field operations (below ground), but
                          not including kerbside pumps including underground
                          tanks and fitting used in field operations
                          (distribution) by mineral oil concerns
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">60</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(xii)</td>
                        <td className="border border-gray-300 p-2">
                          Renewal energy devices being- (a) Flat plate solar
                          collectors <br />
                          (b) Concentrating and pipe type solar collectors{' '}
                          <br />
                          (c) Solar Cookers <br />
                          (d) Solar water heaters and systems <br />
                          (e) Air/gas fluid heating systems <br />
                          (f) Solar crop driers and systems <br />
                          (g) Solar refrigeration, cold storages and
                          air-conditioning systems <br />
                          (h) Solar power generating systems <br />
                          (i) Solar power generating systems <br />
                          (j) Solar pumps based on solar-thermal and solar
                          photovoltaic conversion <br />
                          (k) Solar photovoltaic modules and panels for water
                          pumping and other applications <br />
                          (l) Wind mills and any specially designed devices
                          which run on wind mills <br />
                          (m) Any special devices including electric generators
                          and pumps running on wind energy <br />
                          (n) Bio-gas plant and bio-gas engines <br />
                          (o) Electrically operated vehicles including battery
                          powered or fuel-cell powered vehicles <br />
                          (p) Agricultural and municipal waste conversion
                          devices producing energy <br />
                          (q) Equipment for utilising ocean waste and thermal
                          energy <br />
                          (r) Machinery and plant used in the manufacture of any
                          of the above sub-items
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">80</td>
                        <td className="border border-gray-300 p-2">80</td>
                      </tr>

                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">9 (i)</td>
                        <td className="border border-gray-300 p-2">
                          Books owned by assessees carrying on a profession (a)
                          Books, being annual publications <br />
                          (b) Books, other than those covered by entry (a) above
                        </td>
                        <td className="border border-gray-300 p-2">
                          <span className="text-danger">40</span>
                        </td>
                        <td className="border border-gray-300 p-2">
                          100 <br />
                          80
                        </td>
                        <td className="border border-gray-300 p-2">
                          100 <br />
                          80
                        </td>
                      </tr>
                      <tr className="h-10 text-left">
                        <th colSpan={2}>IV. Ships</th>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                        <td className="border border-gray-300 p-2"></td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(1)</td>
                        <td className="border border-gray-300 p-2">
                          Ocean-going ships including dredgers, tugs, barges,
                          survey launches and other similar ships used mainly
                          for dredging purposes and fishing vessels with wooden
                          hull
                        </td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">25</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(2)</td>
                        <td className="border border-gray-300 p-2">
                          Vessels ordinarily operating on inland waters, not
                          covered by sub-item (3) below
                        </td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">25</td>
                      </tr>
                      <tr className="h-10 text-left">
                        <td className="border border-gray-300 p-2">(3)</td>
                        <td className="border border-gray-300 p-2">
                          Vessels ordinarily operating on inland waters being
                          speed boats (see Note 10 below the Table)
                        </td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">20</td>
                        <td className="border border-gray-300 p-2">25</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6 className="text-center">PART B</h6>
                  <h3 className="text-center">INTANGIBLE ASSETS</h3>
                  <table class="min-w-full">
                    <tbody>
                      <td className="border border-gray-300 p-2"></td>
                      <td className="border border-gray-300 p-2">
                        Know-how, patents, copyrights, trademarks, licences,
                        franchises or any other business or commercial rights of
                        similar nature
                      </td>
                      <td className="border border-gray-300 p-2">25</td>
                      <td className="border border-gray-300 p-2">25</td>
                      <td className="border border-gray-300 p-2">25</td>
                    </tbody>
                  </table>
                  <h6>Note:-</h6>
                  <ol className="border">
                    <li>
                      “Buildings” include roads, bridges, culverts, wells and
                      tube-wells
                    </li>
                    <li>
                      {' '}
                      A building shall be deemed to be a building used mainly
                      for residential purposes, if the built-up floor area
                      thereof used for residential purposes is not less than
                      sixty-six and two their per cent of its total built up
                      floor area and shall include any such building in the
                      factory premises.
                    </li>
                    <li>
                      {' '}
                      In respect of any structure or work by way of renovation
                      or improvement in or in relation to a building referred to
                      in Explanation 1 of clause (ii) of sub-item (1) of section
                      32, the percentage to be applied will be the percentage
                      specified against sub-item (1) or (2) of item I as may be
                      appropriate to the class of building in or in relation to
                      which the renovation or improvement is effected. Where the
                      structure is constructed or the work is done by way of
                      extension of any such building, the percentage to be
                      applied would be such percentage as would be appropriate,
                      as if the structure or work constituted a separate
                      building.
                    </li>
                    <li>
                      {' '}
                      Water treatment system includes system for desalinisation,
                      demineralisation and purification of water.
                    </li>
                    <li>
                      {' '}
                      “Electrical fittings” include electrical wiring, switches,
                      sockets, other fittings and fans, etc.
                    </li>
                    <li>
                      {' '}
                      “Commercial vehicle” means “heavy goods vehicle”, heavy
                      passenger motor vehicle”, “light motor vehicle”, “Medium
                      goods vehicle” and “medium passenger motor vehicle” but
                      does not include “maxi-cab”, “motor-cab”, “tractor” and
                      “road-roller”. The expressions “heavy goods vehicle”,
                      “heavy passenger motor vehicle”, “light motor vehicle”,
                      “medium passenger motor vehicle”, “maxi-cab”, “tractor”
                      and “road-roller” shall have the meanings respectively as
                      assigned to them in section 2 of the Motor Vehicles Act,
                      1988]
                    </li>
                    <li>
                      {' '}
                      “Computer software” means any computer programme recorded
                      on any disc, tape, perforated media or other information
                      storage device.
                    </li>
                    <li>
                      {' '}
                      “TUFS” means Technology Upgradation Fund Scheme announced
                      by the Government of India in the form of a Resolution of
                      the Ministry of Textiles vide No. 28/1/99-CTI of
                      31-3-1999.
                    </li>
                    <li>
                      {' '}
                      Machinery and plant includes pipes needed for delivery
                      from the source of supply of raw water to the plant and
                      from the plant to the storage facility.
                    </li>
                    <li>
                      {' '}
                      “Speed boat” means a motor boat driven by a high speed
                      internal combustion engine capable of propelling the boat
                      at a speed exceeding 24 kilometres per hour in still water
                      and so designed that when running at a speed, it will rise
                      from the water.
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h6 className="text-secondary text-center">
          [As amended by Finance Act, 2022]
        </h6>
      </div>
    </>
  );
};

export default Depreciationtable;
