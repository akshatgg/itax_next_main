"use client"
import {
  ArrowLeft,
  FileText,
  Shield,
  Book,
  AlertTriangle,
  Scale,
  Clock,
  Zap,
  Globe,
  Gavel,
  FileCheck,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SoftwareLicense() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState(null)

  const sections = [
    {
      id: "license",
      title: "License",
      icon: <FileCheck className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <ul className="space-y-4">
            <li className="space-y-2">
              <p className="text-gray-700">
                License: Subject to the provisions of this EULA, the Licensor grants to the End User a non-transferable,
                non-sub-licensable, and non-exclusive license to use, solely in the Field and solely in object code
                form, the Software.
              </p>
            </li>
            <li className="space-y-2">
              <p className="text-gray-700">
                Reservation of rights: Except for the license explicitly granted by Clause 2.1, the Licensor reserves
                all its rights. The End User acknowledges and agrees that the End User is licensed to use the Software
                only in accordance with the express provisions of this EULA and not further or otherwise.
              </p>
            </li>
            <li className="space-y-2">
              <p className="text-gray-700">
                Licensor reserve all the right to change the prices and term & conditions with respect to this EULA.
              </p>
            </li>
            <li className="space-y-2">
              <p className="text-gray-700">
                No support, etc. Unless otherwise agreed by the Parties in writing, the Licensor shall have no
                obligation to upgrade, update, bug-fix, to provide support or maintenance services, or to provide
                assistance or consultancy services in relation to the Software.
              </p>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "use",
      title: "Use Restrictions",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Restrictions</h4>
            <p className="text-gray-700 mb-3">
              Except to the extent permitted by applicable mandatory law, the End User shall not:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "copy or reproduce the Software;",
                "merge the Software with any other software;",
                "translate, adapt, vary, or modify the Software; or",
                "disassemble, decompile, or reverse engineer the Software, or otherwise attempt to derive the source code of the Software",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Further restrictions</h4>
            <p className="text-gray-700 mb-3">The End User shall not:</p>
            <div className="space-y-3">
              {[
                "provide, disclose, demonstrate, or otherwise make available the Software to any third party; or",
                "use the Software to provide any services or training for any third party; or",
                "sell, lease, rent, transfer, hire-out, license, sub-license, assign, distribute, publish, charge, pledge, encumber, commercially exploit, or otherwise deal with the Software, or have any software written or developed that is based on or derived from the Software.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Obligations</h4>
            <p className="text-gray-700 mb-3">The End User shall at all times:</p>
            <div className="space-y-3">
              {[
                "effect and maintain adequate security measures to safeguard the Software from unauthorised access, use, and disclosure;",
                "supervise and control access to and use of the Software in accordance with the provisions of this EULA;",
                "provide the Licensor from time to time on request with contact details for the person responsible for supervising and controlling such access and use; and",
                "ensure that the Software is at all times clearly labelled as the property of the Licensor. The provisions of this Clause 3.3 are without prejudice to the provisions of Clause 9.1.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Fair usage Policy</h4>
            <p className="text-gray-700">
              Use of ITAX EASY GST Software is intended for authorized use. Software must be used in accordance with the
              terms and conditions set forth in this agreement. The End User should comply with the Fair usage policy of
              the Company and that violation of this policy may result in revocation of the license and denial of user
              access to the Software. The Fair usage policy is subject to change from time to time.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "payment",
      title: "Payment Terms",
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  End User agrees to the commercial terms as selected or opted by it. Invoices will be sent in
                  electronic form/soft copy via email only.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  The Fee applicable to a billing cycle will be paid in advance at the beginning of the Billing Cycle.
                  Advance fees once paid will not be refunded.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  3
                </div>
                <p className="text-gray-700">
                  All payment due under this EULA are exclusive of all the applicable taxes that may be levied by the
                  Government from time to time, which shall be paid by the End User to the Licensor in addition at the
                  rate and in the manner prescribed by applicable law;
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  4
                </div>
                <p className="text-gray-700">
                  If any local law requires "Customer" to withhold any tax on amount payable to "Licensor", then it
                  shall withhold the tax and remit the balance amount to "Licensor". For the Tax withheld, "Customer"
                  shall provide to "Licensor" with the relevant Tax Certificate(s). In cases where customer fails to
                  provide the relevant tax certificates on time, the customer shall pay the amount equivalent to the
                  withheld tax.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "confidential",
      title: "Confidential Information",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  Each Party and its subcontractors, affiliates and agents may have access to the Confidential
                  Information. Parties agree that whether or not the Confidential Information has been designated as
                  "confidential", the same shall be deemed to be confidential in nature and shall hereinafter be
                  referred to as "Confidential Information".
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  Each Party shall cause its employees, affiliates, sub-contractors, vendors and agents that may or are
                  likely to receive the Confidential Information to comply with the terms of this agreement and each
                  Party shall continue to be primarily responsible for any breach hereof by its employees, Affiliates,
                  sub-contractors, vendors, and/or agents.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  3
                </div>
                <div>
                  <p className="text-gray-700 mb-2">
                    The obligations of confidentiality shall not apply to parties for:
                  </p>
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">
                        disclosure of Confidential Information that is or becomes generally available to the public
                        other than as a result of disclosure by or at the direction of a Party or any of its
                        Representatives in violation of this Agreement;
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">
                        disclosure by Parties to its representatives provided such Representatives are bound by similar
                        confidentiality obligations; or
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">
                        disclosure, after giving prior notice to the other Parties to the extent practicable under the
                        circumstances and subject to any practicable arrangements to protect confidentiality, to the
                        extent required under the rules of any stock exchange or by Applicable Laws or government
                        regulations or generally accepted accounting principles and standards applicable to any Party or
                        judicial or regulatory process or in connection with any judicial process, regarding any legal
                        action, suit or proceeding, arising out of or relating to this Agreement.
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "warranties",
      title: "Warranties & Representations",
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 mb-4">
            Each Party represents and warrants to the other Party as mentioned hereto that:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Each Party, is duly incorporated and existing under the applicable laws of India.",
              "The execution and delivery of this agreement by each Party shall be performed as per the transactions contemplated hereby and each Party is duly authorized to perform their respective duties under this agreement.",
              "Assuming the due authorization, execution and delivery hereof by the other party, this agreement constitutes a legal, valid and binding obligation on each Party to this agreement, which is enforceable against each Party in accordance with its terms and conditions.",
              "The execution, delivery and performance of this agreement by each Party and the transactions contemplated hereby will not violate any provision of the organizational or governance documents of each Party.",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mt-4">
            <p className="text-gray-700">
              The express undertakings and warranties given by the Licensor in this EULA are in lieu of all other
              warranties, conditions, terms, undertakings and obligations, whether express or implied by statute, common
              law, custom, trade usage, course of dealing or in any other way, including any implied warranty of
              merchantability, satisfactory quality, fitness for any particular purpose. All of these are excluded to
              the fullest extent permitted by applicable law.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  End User shall at its own expense, defend, indemnify and hold harmless("Indemnifying Party") Licensor
                  and each of its Affiliates, officers, directors, employees, representatives, successors and permitted
                  assigns(individually and collectively the "Indemnified Parties"),from and against all Losses, claims,
                  costs and expenses and liabilities suffered by the Indemnified Parties arising directly on account of
                  any wrongful actions of the indemnifying Party or the irrespective employees, agents and
                  representatives or out of breach of this agreement.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  End User shall indemnify the Licensor from and against any and all losses, damages, claims, demands,
                  liabilities, costs, and expenses of any nature whatsoever that may be asserted against or suffered by
                  the Licensor and which relate to: (a) any breach by the customer and/or other Third Party engaged by
                  the customer, of its obligations under any applicable law(s), statutory instructions, notifications,
                  guidelines as may be issued by the Government due to which Licensor may be held responsible for any
                  liability.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  3
                </div>
                <p className="text-gray-700">
                  This clause shall survive for 1 year after the expiry or earlier termination of this agreement.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700">
              The cumulative maximum liability of the Licensor to the Customer under or in connection with this
              AGREEMENT, irrespective of the basis of the claim (whether in contract, tort, negligence, by statute or
              otherwise), including the work, deliverables or Services covered by this Agreement, shall be the payment
              of direct damages only which shall be limited in accordance with the provisions of this Clause. In no
              event, the cumulative liability of the Licensor in respect of any and all claims made under or in
              connection with this AGREEMENT shall not exceed an amount that is equal to license fees received under
              this agreement.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "termination",
      title: "Term and Termination",
      icon: <Clock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  This agreement comes into effect from the date of its acceptance by the Customer and shall remain
                  operative for a period of three (3) Years from such date. Any extension to this agreement requires
                  express and written consent of both the parties.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  Licensor may terminate this Agreement, if Customer does not meet its obligation to make payment as per
                  agreed terms.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  3
                </div>
                <p className="text-gray-700">
                  Licensor may forthwith terminate the contract if the Customer shall have a receiver or administrative
                  receiver appointed of it or over any part of its undertaking or assets or shall pass a resolution for
                  winding up (otherwise than for a purpose of bonafide scheme of solvent amalgamation or reconstruction)
                  or a court of competent jurisdiction shall make an order to that effect or if the Customer becomes
                  subject to an administration order or shall enter into any voluntary arrangement with its creditors or
                  shall cease or threaten to cease to carry on its business.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Consequences of termination</h4>
            <p className="text-gray-700 mb-3">In the event of any termination of this EULA for any reason:</p>
            <div className="space-y-3">
              {[
                "any license granted by the Licensor under this EULA shall automatically terminate without further notice, and the End User shall make no further use of, or carry out any other activity in relation to, the Software; and",
                "any instalments of the license Fee due to be paid after the date of termination shall forthwith become due and payable by the End User, and the Licensor shall be under no obligation to reimburse the whole or any part of the license Fee.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Suspension due to non-compliance with Agreement</h4>
            <p className="text-gray-700 mb-3">
              Notwithstanding other legal remedies that may be available to, Licensor may in its sole discretion limit
              Customer activity by immediately removing Customer access either temporarily or indefinitely or suspend or
              terminate Customer membership, and/or refuse to provide Customer with access to the Site:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "If the Customer is in breach any of the terms and conditions of this Agreement and/or the Terms and conditions of usage of Licensor;",
                "If the Customer has provided wrong, inaccurate, incomplete or incorrect information;",
                "If any of Customer's actions may cause any harm, damage or loss to the other Customers, users or Licensor.",
                "Illegal and/or unauthorized use of the Service.",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "legal",
      title: "Legal Compliance",
      icon: <Gavel className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  Each Party while discharging its obligations under this agreement shall comply with applicable laws
                  and guidelines framed by the Government of India or the appropriate State Government or any other
                  statutory authority from time to time.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  Licensor hereby confirms that it has obtained necessary approval/s, permission from statutory
                  authorities, in respect of their scope of Services to be provided under this agreement.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "force-majeure",
      title: "Force Majeure",
      icon: <Zap className="h-5 w-5" />,
      content: (
        <div className="bg-purple-50 border border-purple-100 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700">
              Neither party shall be responsible for failure or delay of performance if caused by: an act of war,
              hostility, or sabotage; act of God; electrical, internet, or telecommunication outage that is not caused
              by the obligated party; government restrictions (including the denial or cancellation of any export or
              other license); or other event outside the reasonable control of the obligated party and is not caused due
              to the negligence or breach of the obligated party. Each party will use reasonable efforts to mitigate the
              effect of a force majeure event.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "dispute",
      title: "Dispute Resolution",
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-5">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  1
                </div>
                <p className="text-gray-700">
                  If any dispute or difference of any kind whatsoever shall arise between the Parties in connection with
                  or arising out of this Agreement (whether before or after the termination or breach of this Agreement)
                  the concerned representatives of the Parties shall promptly and in good faith negotiate with a view to
                  an amicable resolution and settlement of the dispute.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  2
                </div>
                <p className="text-gray-700">
                  In the event, no amicable resolution or settlement is reached within a period of thirty (30) days,
                  such dispute or difference shall be referred to a sole arbitrator mutually appointed by the Parties
                  or, upon the failure of the Parties to agree upon a sole arbitrator, within a period of ten (10) days,
                  each Party shall appoint one arbitrator each and the two appointed arbitrators shall appoint the third
                  arbitrator who shall act as the presiding arbitrator.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 text-white font-bold text-xs">
                  3
                </div>
                <p className="text-gray-700">
                  The existence of any dispute or difference or the initiation or continuance of the arbitration
                  proceedings shall not postpone or delay the performance by the Parties of their respective obligations
                  pursuant to this Agreement. It is agreed that the arbitrators shall also determine and make an award
                  as to the costs of the arbitration proceedings.
                </p>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: <Globe className="h-5 w-5" />,
      content: (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Globe className="h-6 w-6 text-gray-600 flex-shrink-0 mt-1" />
            <p className="text-gray-700">
              Subject to the above clause, the GWALIOR HIGH COURT shall have the exclusive authority to adjudicate upon
              any or all disputes arising out of or in connection with this Agreement. This Agreement and the rights and
              obligations thereunder shall be governed by and construed in accordance with the laws of the Republic of
              India, without regard to its conflict of law principles.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "general",
      title: "General",
      icon: <FileText className="h-5 w-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-800 mb-3">Amendments</h4>
            <p className="text-gray-700">
              This EULA may only be amended in writing signed by duly authorised representatives of the Licensor and the
              End User.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-800 mb-3">No Agency</h4>
            <p className="text-gray-700">
              Nothing in this EULA shall create, evidence, or imply any agency, partnership, or joint venture between
              the Parties. Neither Party shall act or describe itself as the agent of the other, nor shall it make or
              represent that it has authority to make any commitments on the other's behalf.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
            <h4 className="font-semibold text-gray-800 mb-3">e-Agreement</h4>
            <p className="text-gray-700">
              End User hereby agrees and undertakes that End User is legally entitled and eligible to enter into this
              e-Agreement and further agrees and undertakes to be bound by and abide by this Agreement and the person
              accepting this Agreement by and on behalf of the Entity is authorized representative of the Entity and is
              entitled and is legally authorized to bind the Entity on whose behalf this Agreement is being accepted.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="bg-white/20 p-4 rounded-full mb-6">
              <Book className="h-10 w-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">END USER SOFTWARE LICENSE AGREEMENT</h1>
            <p className="text-xl text-blue-100 max-w-3xl">For iTaxEasy Private Limited</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-10 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span className="font-medium">Print</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              <strong>This End-User License Agreement ("EULA")</strong> is a legal agreement between
              <strong> ITAX EASY PRIVATE LIMITED</strong> having its registered office at G-41, Gandhi Nagar, Padav,
              Gwalior Madhya Pradesh, India and Corporate Office at Logix Zest, Sat 1, Flat 811, Sector 143, Noida,
              Uttar Pradesh bearing Corporate Identification No. U74999MP2019PTC050453
              <strong> ("ITAX EASY/ Licensor")</strong> and user of the Software
              <strong> ("End User/ Customer")</strong> has agreed to avail such services, on the terms and conditions as
              set forth in the agreement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              ITAX EASY is engaged in the business of developing, owning, implementing and providing GST (Goods Service
              Tax) software products, services and solutions for various customers ("Software"). The Licensor and the
              End User together shall be referred to as the "Parties" and individually shall be referred to as a
              "Party".
            </p>
            <p className="text-gray-700 leading-relaxed">
              Customer's access to and use of the Service is conditioned on its acceptance of and compliance with these
              Terms. By accessing or using the Service, Customer agree to be bound by these Terms & Conditions set out
              in this EULA. If Customer disagrees with any part of the terms then it may not access the Service.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <p className="text-blue-800 font-semibold">
                IN CONSIDERATION OF THE MUTUAL COVENANTS AND CONDITIONS, IT IS HEREBY FURTHER AGREED BETWEEN THE PARTIES
                THAT:
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveSection(section.id)
                  document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors group ${
                  activeSection === section.id
                    ? "bg-blue-50 border border-blue-200"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                    activeSection === section.id ? "bg-blue-200" : "bg-gray-100 group-hover:bg-blue-100"
                  }`}
                >
                  {section.icon}
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    {index + 1}. {section.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 scroll-mt-20"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">{section.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                  {index + 1}. {section.title}
                </h3>
              </div>
              {section.content}
            </div>
          ))}
        </div>

        {/* Acceptance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5 text-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-2">Agreement Acceptance</h4>
                <p className="text-green-700 leading-relaxed">
                  By using iTaxEasy software, you acknowledge that you have read and understood this End User License
                  Agreement and agree to be bound by its terms and conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
