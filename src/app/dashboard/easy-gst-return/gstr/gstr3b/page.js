import { getBusinessProfile } from "@/hooks/authProvider";
import Link from "next/link";

const CardData = [
    {
        id: "1",
        href: "outward-and-inward-charge-inward",
        title: "3.1 Tax On outward and reverse charge inward supplies",
        data: {
            ["Integrated Tax"]: "",
            ["central Tax"]: "",
            ["State/Ut Tax"]: "",
            ["CESS (&#8377;)"]: "",
        },
    },
    {
        id: "2",
        href: "supply-cgst-act",
        title: "3.1.1 supplies notified under section 9(5) of CGST Act, 2017",
        data: {
            ["Integrated Tax"]: "",
            ["central Tax"]: "",
            ["State/Ut Tax"]: "",
            ["CESS (&#8377;)"]: "",
        },
    },
    {
        id: "3",
        href: "inter-state-supply",
        title: "3.2 Inter-state supplies",
        data: {
            ["Taxable value"]: "",
            ["Integrated Tax"]: "",
        },
    },
    {
        id: "4",
        href: "quantity-return",
        title: "4.1 Eligible ITC",
        data: {
            ["Integrated Tax"]: "",
            ["central Tax"]: "",
            ["State/Ut Tax"]: "",
            ["CESS (&#8377;)"]: "",
        },
    },
    {
        id: "5",
        href: "inward-supply",
        title: "5.0 Exempt, nill and Neon GST inward supply",
        data: {
            ["Integrated supplies"]: "",
            ["Integrated state supplies"]: "",
        },
    },
    {
        id: "6",
        href: "interest-and-late-fee",
        title: "5.1 Interest and late fee for previous tax period",
        data: {
            ["Integrated Tax"]: "",
            ["central Tax"]: "",
            ["State/Ut Tax"]: "",
            ["CESS (&#8377;)"]: "",
        },
    },
    {
        id: "7",
        href: "payment-of-tax",
        title: "6.1 Payment of tax",
        data: {
            ["Balance Liability"]: "",
            ["Paid through"]: "",
            ["Paid through Credit"]: "",
            ["CESS (&#8377;)"]: "",
        },
    },
];

const page = async () => {
    const businessProfile = await getBusinessProfile();
    const bProfile = businessProfile.response.data.profile;
    const userDetails = {
        gstNum: bProfile.gstin,
        // legalName: "Anurag sharma",
        tradeName: bProfile.businessName,
        fy: "2023-24",
        returnPeriod: "December",
    };
    return (
        <div className="bg-neutral-100">
            <div className="rounded-md overflow-hidden">
                <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 bg-gray-200">
                    <p className="px-2 py-3">
                        GSTIN -{" "}
                        <span className="uppercase">{userDetails.gstNum}</span>
                    </p>
                    <p className="px-2 py-4">
                        Legal Name -{" "}
                        <span className="uppercase">
                            {userDetails.legalName}
                        </span>
                    </p>
                    <p className="px-2 py-4">
                        Trade Name -{" "}
                        <span className="uppercase">
                            {userDetails.tradeName}
                        </span>
                    </p>
                    <p className="px-2 py-4">
                        FY - <span className="uppercase">{userDetails.fy}</span>
                    </p>
                    <p className="px-2 py-4">
                        Return Period -{" "}
                        <span className="uppercase">
                            {userDetails.returnPeriod}
                        </span>
                    </p>
                </div>
            </div>
            <ul className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {CardData.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white text-neutral-950 text-sm "
                    >
                        <Link href={`gstr3b/${item.href}`}>
                            <h4
                                className={`&#8377; ${item.title === "4.1 Eligible ITC" ? "bg-red-800" : "bg-blue-800"} text-white font-medium p-2 min-h-20`}
                            >
                                {item.title}
                            </h4>
                            <div className="p-2">
                                {Object.entries(item.data).map(
                                    ([key, value]) => (
                                        <p key={key} className="mt-1">
                                            <span className="font-medium">
                                                &#8377;{key}:{" "}
                                            </span>
                                            {value || "--"}
                                        </p>
                                    ),
                                )}
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default page;
