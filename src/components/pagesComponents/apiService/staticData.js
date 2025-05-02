  const invoice = '/icons/home/services/invoice.png';
const gst = '/icons/home/gst.png';
const hsn = '/icons/home/hsn.png';
const sac = '/icons/home/sac.png';
const BACK_URL= process.env.NEXT_PUBLIC_NEXT_PUBLIC_BACK_URL;
import {
  Authentication,
  Bank,
  ImagePDF,
  Post_Office,
  E_KYC,
  Extraction,
  All_Apis,
  pan,
  ifsc,
  logout,
  login,
  signUp,
  pdfMerge,
  form16,
  google,
  aadhar,
  verify,
  pinCode,
  pinCity,
  compress,
} from './icons';

export const iconList = {
  Signup: { icon: signUp },
  'Admin SignUp': { icon: signUp },
  'Form-16': { icon: form16 },
  Aadhaar: { icon: aadhar },
  Pan: { icon: pan },
  Login: { icon: login },
  'Admin Login': { icon: login },
  Logout: { icon: logout },
  Invoice: { src: invoice },
  'E-KYC': { icon: E_KYC },
  'IFSC Details': { icon: ifsc },
  'Verify Accounts': { icon: verify },
  'PIN Code Info': { icon: pinCode },
  'PIN Code by City': { icon: pinCity },
  'PDF Merge': { icon: pdfMerge },
  'IMG to PDF': { icon: ImagePDF },
  Compress: { icon: compress },
  'Login with Google': { icon: google },
  'HSN Code API': { src: hsn },
  'SAC Code API': { src: sac },
  Verify: { icon: verify },
};

export const categories = [
  {
    id: 'all_apis',
    icon: All_Apis,
    title: 'All Apis',
    path: `${process.env.BACK_URL}/apis/get-all-apis`,
  },
  {
    id: 'authentication',
    icon: Authentication,
    title: 'Authentication',
    path: `${process.env.BACK_URL}/apis/authentication`,
  },
  {
    id: 'bank',
    icon: Bank,
    title: 'Bank',
    path: `${process.env.BACK_URL}/apis/bank`,
  },
  {
    id: 'image_pdf',
    icon: ImagePDF,
    title: 'Image/PDF',
    path: `${process.env.BACK_URL}/apis/image_pdf`,
  },
  {
    id: 'post_office',
    icon: Post_Office,
    title: 'Post Office',
    path: `${process.env.BACK_URL}/apis/post_office`,
  },
  {
    id: 'gst',
    src: gst,
    title: 'GST',
    path: `${process.env.BACK_URL}/apis/gst`,
  },
  {
    id: 'extraction_e_kyc',
    icon: Extraction,
    title: 'Extraction & E-KYC',
    path: `${process.env.BACK_URL}/apis/extraction_e_kyc`,
  },
];

export const list = [
  {
    title: "Authentication",
    id: "authentication",
    icon: Authentication,
    apis: [
      {
        upcoming: false,
        icon: signUp,
        label: "SignUp",
        description:
          "API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials.",
      },
      {
        upcoming: false,
        icon: login,
        label: "Login",
        description:
          "API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.",
      },
      {
        upcoming: false,
        icon: signUp,
        label: "Admin SignUp",
        description:
          "API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.",
      },
      {
        upcoming: false,
        icon: logout,
        label: "Logout",
        description:
          "API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.",
      },
      {
        upcoming: true,
        icon: google,
        label: "Login With Google",
        description:
          "API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.",
      },
      {
        upcoming: false,
        icon: login,
        label: "Admin Login",
        description:
          " API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.",
      },
    ],
  },
  {
    title: "Extraction E-KYC",
    id: "extraction_e_kyc",
    icon: Extraction,
    apis: [
      {
        icon: form16,
        upcoming: false,
        label: "Form-16",
        description:
          "The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.",
      },
      {
        upcoming: false,
        icon: pan,
        label: "Pan",
        description:
          "API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier.",
      },
      {
        upcoming: false,
        icon: aadhar,
        label: "Aadhaar",
        description:
          "The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature.",
      },
      {
        upcoming: false,
        icon: invoice,
        isPNG: true,
        label: "Invoice",
        description:
          "Revamp your invoice management with our API-powered image recognition solution. Our API offers accurate and efficient recognition of invoice data, saving you time and effort. Say goodbye to manual data entry and hello to streamlined invoice processing. Get started today!",
      },
    ],
  },
  {
    title: "Bank",
    id: "bank",
    icon: Bank,
    apis: [
      {
        upcoming: false,
        icon: ifsc,
        label: "IFSC Details",
        description:
          "The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.",
      },
      {
        upcoming: false,
        icon: verify,
        label: "Verify Accounts",
        description:
          "API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.",
      },
    ],
  },
  {
    title: "Post Office",
    id: "post_office",
    icon: Post_Office,
    apis: [
      {
        upcoming: false,
        icon: pinCode,
        label: "Pin Code Info",
        description:
          "API provides access to information about postal codes, including location, state, district, and geographical coordinates.",
      },
      {
        icon: pinCity,
        upcoming: false,
        label: "Pin Code by City",
        description:
          "Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.",
      },
    ],
  },
  {
    title: "Image/PDF",
    id: "image_pdf",
    icon: ImagePDF,
    apis: [
      {
        upcoming: true,
        label: "PDF Merge",
        icon: pdfMerge,
        description:
          "PDF Merge APIs provide solutions for combining multiple PDF files into a single document.",
      },
      {
        upcoming: true,
        icon: ImagePDF,
        label: "IMG To PDF",
        description:
          "Image to PDF APIs convert images to PDF format, supporting various image formats with customization options for the resulting PDF.",
      },
      {
        upcoming: true,
        icon: compress,
        label: "Compress",
        description:
          "API offers a simple UI for compressing JPEG, PNG, GIF, and SVG images with bulk compression option.",
      },
    ],
  },
  {
    title: "GST",
    id: "gst",
    isPng: true,
    icon: gst,
    apis: [
      {
        upcoming: false,
        icon: hsn,
        isPNG: true,
        label: "HSN Code API",
        description:
          "Get accurate HSN code information at your fingertips with our powerful API. Streamline your GST compliance processes and stay ahead of the game. Contact us today to learn more.",
      },
      {
        upcoming: false,
        isPNG: true,
        icon: sac,
        label: "SAC Code API",
        description:
          "Integrate our API to streamline your business operations. Our user-friendly interface provides real-time information and automates processes, making it easy for you to manage your business. Plus, our API is fully compliant with GST regulations and accepts SAC codes for accurate reporting. Try it now and experience the benefits of seamless integration.",
      },
    ],
  },
];

export const apiDocsData = [
  {
    upcoming: false,
    id: "signup",
    title: "Signup",
    category: "Authentication",
    overview:
      "API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials",
    price: 500.00,
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/user/sign-up`,
    },
    // headers: [
    //     {
    //         name: 'x-apideck-consumer-id',
    //         type: 'String',
    //         required: 'Yes',
    //         description:
    //             'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
    //     },
    // ],
    bodyParams: [
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "password",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "id",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "Registration Successfull",
        "data": {
            "id": 134,
            "email": "Vineetka@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "phone": "9146732156",
            "pincode": "2411122"
        },
    }
}`,
  },
  {
    upcoming: false,
    title: "Admin SignUp",
    id: "adminsignup",
    category: "Authentication",
    overview:
      "API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.",
    price: 500.00,
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/admin/sign-up`,
    },
    bodyParams: [
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "password",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "id",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "isAdmin",
        type: "boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "Registration Successfull",
        "data": {
            "id": 134,
            "email": "Vineetka@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "phone": "9146732156",
            "pincode": "2411122",
            "isAdmin": true
        },
    }
}`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "Form-16",
    id: "form-16",
    category: "Extraction_E-KYC",
    overview:
      "The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/form-16`,
    },
    bodyParams: [
      {
        name: "bsr_code",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "challan_date",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "challan_serial_no",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "provisional_receipt_number",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "challan_amount",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "unique_pan_amount_combination_for_challan",
        type: "Array",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "bsr_code",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "challan_date",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "challlan_serial_no",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "job_id",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "tan",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "financial_year",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "quarter",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "bsr_code": "1234567",
    "challan_date": 1670783400000,
    "challlan_serial_no": "01234",
    "job: {
        job_id: "12345",
        tan: "AAAA12345A",
        financial_year: "2020-21",
        quarter: "q1",
        status: "ok"
    }
}`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Aadhaar",
    id: "aadhaar",
    overview:
      "API allows user to send a file i.e. the image for aadhaar card and sends the response as a JSON object.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/admin/login`,
    },
    bodyParams: [
      {
        name: "file",
        type: "String",
        required: "Yes",
        description:
          "The File i.e. image for Aadhaar card is required to extract and get any proper response.",
      },
    ],
    response: [
      {
        name: "yearOfBirth",
        type: "String",
        required: "Yes",
        description: "The birthdate field extracted from the image..",
      },
      {
        name: "gender",
        type: "String",
        required: "Yes",
        description: "The gender field extracted from the image..",
      },
      {
        name: "aadhaarNumber",
        type: "String",
        required: "Yes",
        description: "The Aadhaar card number field extracted from the image..",
      },
      {
        name: "name",
        type: "String",
        required: "Yes",
        description: "The name field extracted from the image..",
      },
    ],
    responseJSON: `{
      "status": "success",
      "data": {
          "yearOfBirth": "05/01/1989",
          "gender": "male",
          "aadhaarNumber": "400978972174",
          "name": "Pramod Kumar Yadav"
      }
  }`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Pan",
    id: "pan",
    category: "Extraction_E-KYC",
    overview:
      "API allows user to send picture for PAN Card and sends the information of the pan card in json format.",
    endpoint: {
      method: "post",
      endpoint: "https://ocr.itaxeasy.com/pan",
    },
    bodyParams: [
      {
        name: "file",
        type: "Form-data",
        required: "Yes",
        description:
          "The File which user wants to extract information from i.e. PAN Card Picture.",
      },
    ],
    response: [
      {
        name: "name",
        type: "String",
        required: "Yes",
        description: "The extracted name from the file",
      },
      {
        name: "fatherName",
        type: "String",
        required: "Yes",
        description: "The extracted father's name from the file",
      },
      {
        name: "dob",
        type: "String",
        required: "Yes",
        description: "The extracted dob from the file",
      },
      {
        name: "pan",
        type: "String",
        required: "Yes",
        description: "The extracted PAN from the file",
      },
    ],
    responseJSON: `{
      "status": "success",
      "data": {
          "name": "",
          "fatherName": "",
          "dob": "",
          "pan": ""
      }
  }`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "Login",
    id: "login",
    category: "Authentication",
    overview:
      "API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/users/login`,
    },
    // headers: [
    //     {
    //         name: 'Content-Type',
    //         type: 'String',
    //         required: 'Yes',
    //         description: 'application/json',
    //     },
    // ],
    bodyParams: [
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "password",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "id",
        type: "number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "userType",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "isverified",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "login successfull",
        "data": {
            "id": 54,
            "email": "vxxxxxxxxxxu@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "userType": "normal",
            "phone": "8xxxxxxxx5",
            "pincode": "241122",
            "isverified": true
        },
}`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Admin Login",
    id: "adminlogin",
    category: "Authentication",
    overview:
      "API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/admin/login`,
    },
    // headers: [
    //     {
    //         name: 'Content-Type',
    //         type: 'String',
    //         required: 'Yes',
    //         description: 'application/json',
    //     },
    // ],
    bodyParams: [
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "password",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "id",
        type: "number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "userType",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "isverified",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "isAdmin",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "login successfull",
        "data": {
            "id": 54,
            "email": "vxxxxxxxxxxu@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "userType": "normal",
            "phone": "8xxxxxxxx5",
            "pincode": "241122",
            "isverified": true,
            "isAdmin": true
        },
}`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Logout",
    id: "logout",
    category: "Authentication",
    overview:
      "API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/`,
    },
    headers: [
      {
        name: "x-apideck-consumer-id",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    queryParams: [
      {
        name: "x-apideck-consumer-id",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "x-apideck-consumer-id",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `curl --request POST
--url https://api.sandbox.co.in/
--header 'Accept: application/json'
--header 'Content-Type: application/json'
--header 'x-api-version: 1.0' \ --data`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Pan",
    id: "pan",
    category: "Pan",
    overview:
      "API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/pan/get-pan-details`,
    },
    // headers: [
    //     {
    //         name: 'x-apideck-consumer-id',
    //         type: 'String',
    //         required: 'Yes',
    //         description:
    //             'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
    //     },
    // ],
    queryParams: [
      {
        name: "pan",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "@entity",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pan",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "full_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "aadhaar_seeding_status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "category",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_updated",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rachit",
        "last_name": "Kumar",
        "full_name": "Shri Rachit Kumar",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020",
        
    }
}`,
  },
  {
    price: 500.00,
    upcoming: false,
    title: "Aadhar",
    id: "aadhaar",
    category: "Extraction_E-KYC",
    overview:
      "The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/pan/verify_aadhar`,
    },
    // headers: [
    //     {
    //         name: 'x-apideck-consumer-id',
    //         type: 'String',
    //         required: 'Yes',
    //         description:
    //             'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
    //     },
    // ],
    queryParams: [
      {
        name: "aadhar",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "@entity",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pan",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "full_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "aadhaar_seeding_status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "category",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_updated",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "D.O.B",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "driver_license",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "voter_id",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rishab",
        "last_name": "Rawat",
        "full_name": "Shri Rishab Rawat",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020",
        "D.O.B": "02/10/1985",
        "driver_license": "DL-12345678901234",
        "voter_id": "ABC1234567" 
    }
}`,
  },
  {
    upcoming: false,
    title: "Invoice",
    id: "invoice",
    category: "Extraction_E-KYC",
    overview:
      "API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.",
    price: 500.00,
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/admin/sign-up`,
    },
    bodyParams: [
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "password",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "id",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "phone",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "isAdmin",
        type: "boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": true,
    "results": {
        "status": 200,
        "message": "Registration Successfull",
        "data": {
            "id": 134,
            "email": "Vineetka@gmail.com",
            "first_name": "Vineet",
            "last_name": "Sharma",
            "phone": "9146732156",
            "pincode": "2411122",
            "isAdmin": true
        },
    }
}`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "E-KYC",
    id: "ekyc",
    overview:
      "E-KYC APIs provide electronic verification of individuals from goverment database",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/pan/verify_aadhar`,
    },
    // headers: [
    //     {
    //         name: 'x-apideck-consumer-id',
    //         type: 'String',
    //         required: 'Yes',
    //         description:
    //             'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
    //     },
    // ],
    queryParams: [
      {
        name: "aadhar",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "@entity",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pan",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "first_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "full_name",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "aadhaar_seeding_status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "category",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "last_updated",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": "success",
    "company": {
        "@entity": "pan",
        "pan": "A********F",
        "first_name": "Rishab",
        "last_name": "Singh",
        "full_name": "Shri Rishab Singh",
        "aadhaar_seeding_status": "Y",
        "status": "VALID",
        "category": "Individual",
        "last_updated": "06/10/2020"
    }
}`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "IFSC Details",
    id: "ifscdetails",
    category: "Bank",
    overview:
      "The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.",
    endpoint: {
      method: "post",
      endpoint: "https://laravel.itaxeasy.com/api/  get-details?ifsc",
    },
    queryParams: [
      {
        name: "IFSC",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "MICR",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "BRANCH",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "ADDRESS",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "STATE",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "CONTACT",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "UPI",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "RTGS",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "CITY",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "CENTRE",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "DISTRICT",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "NEFT",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "IMPS",
        type: "Boolean",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "SWIFT",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "ISO3166",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "BANK",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "BANKCODE",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "IFSC",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
        "data": {
        "MICR": null,
        "BRANCH": "Noida Branch",
        "ADDRESS": "B-121, Sector-5,Noida-201301",
        "STATE": "UTTAR PRADESH",
        "CONTACT": "+911133996699",
        "UPI": true,
        "RTGS": true,
        "CITY": "NOIDA",
        "CENTRE": "Gautam Buddh Nagar",
        "DISTRICT": "Gautam Buddh Nagar",
        "NEFT": true,
        "IMPS": true,
        "SWIFT": null,
        "ISO3166": "IN-UP",
        "BANK": "Paytm Payments Bank",
        "BANKCODE": "PYTM",
        "IFSC": "PYTM0123456"
    }
        }`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "Verify Accounts",
    id: "verifyaccounts",
    category: "Bank",
    overview:
      "API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/email/verify`,
    },
    queryParams: [
      {
        name: "email",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "status",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "message",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "status": "success",
    "message": "user verified successfully"
}`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "PIN Code Info",
    id: "pincodeinfo",
    category: "Post_Office",
    overview:
      "API provides access to information about postal codes, including location, state, district, and geographical coordinates.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/pincode/pincodeinfo`,
    },
    queryParams: [
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "officeName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "taluk",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "districtName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "stateName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "success": true,
    "info": [
        {
            "officeName": "Defence Colony S.O (Meerut)",
            "pincode": 250001,
            "taluk": "Meerut",
            "districtName": "Meerut",
            "stateName": "UTTAR PRADESH"
        },
    ]
}`,
  },
  {
    upcoming: false,
    price: 500.00,
    title: "PIN Code by City",
    id: "pincodebycity",
    category: "Post_Office",
    overview:
      "Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/pincode/pincodebycity`,
    },
    queryParams: [
      {
        name: "pincode",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "city",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    response: [
      {
        name: "officeName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "pincode",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "taluk",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "districtName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "stateName",
        type: "String",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
    ],
    responseJSON: `{
    "success": true,
    "info": [
        {
            "officeName": "Defence Colony S.O (Meerut)",
            "pincode": 250001,
            "taluk": "Meerut",
            "districtName": "Meerut",
            "stateName": "UTTAR PRADESH"
        },
        {
            "officeName": "Saket S.O (Meerut)",
            "pincode": 250003,
            "taluk": "Meerut",
            "districtName": "Meerut",
            "stateName": "UTTAR PRADESH"
        },
    ]
  }`,
  },
  {
    upcoming: true,
    price: 500.00,
    title: "PDF Merge",
    id: "pdfmerge",
    category: "Image_PDF",
    overview:
      "PDF Merge APIs provide solutions for combining multiple PDF files into a single document.",
    endpoint: {
      method: "post",
      endpoint: "https://mom.itaxeasy.com/api/merge",
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.00,
    title: "IMG to PDF",
    id: "imgtopdf",
    category: "Image_PDF",
    overview:
      "Image to PDF APIs convert images to PDF format, supporting various image formats with customization options for the resulting PDF.",
    endpoint: {
      method: "post",
      endpoint: "https://mom.itaxeasy.com/api/imagetopdf",
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.00,
    title: "Compress",
    category: "Image_PDF",
    id: "compress",
    overview:
      "API offers a simple UI for compressing JPEG, PNG, GIF, and SVG images with bulk compression option.",
    endpoint: {
      method: "post",
      endpoint: "https://mom.itaxeasy.com/api/compress",
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.00,
    title: "Login with Google",
    id: "loginwithgoogle",
    category: "Authentication",
    overview:
      "API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.",
    endpoint: {
      method: "post",
      endpoint: `${BACK_URL}/login/google`,
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: false,
    title: "HSN Code API",
    id: "hsncodeapi",
    category: "GST",
    overview:
      "API allows user to fetch all HSN Codes via a GET request and sends as a JSON object in response to the request",
    price: 500.00,
    endpoint: {
      method: "get",
      endpoint: `${BACK_URL}/hsn/gethsnall`,
    },

    response: [
      {
        name: "id",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "hsn_code",
        type: "Number",
        required: "Yes",
        description: "HSN Code for the respective ID",
      },
      {
        name: "description",
        type: "String",
        required: "Yes",
        description: "Description for the respective HSN Code and ID",
      },
      {
        name: "createdAt",
        type: "String",
        required: "Yes",
        description:
          "The Date and time of HSN Code created at respective to the ID",
      },
      {
        name: "updatedAt",
        type: "String",
        required: "Yes",
        description:
          "The Date and time of HSN Code updated at respective to the ID",
      },
    ],
    responseJSON: `{
      "status": true,
      "message": "hsn code",
      "data": [
          {
              "id": 2,
              "hsn_code": 1,
              "description": "Live Animals; Animal Products",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 3,
              "hsn_code": 101,
              "description": "LIVE HORSES, ASSES, MULES AND HINNIES - Horses:",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 4,
              "hsn_code": 1011010,
              "description": "LIVE HORSES, ASSES, MULES AND HINNIES PURE-BRED BREEDING ANIMALS HORSES",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },
          {
              "id": 5,
              "hsn_code": 1011020,
              "description": "LIVE HORSES, ASSES, MULESANDHINNIES PURE-BRED BREEDING ANIMALS ASSES",
              "createdAt": "2022-11-18T18:55:39.000Z",
              "updatedAt": "2022-11-18T18:57:46.000Z"
          },

          ....rest of the response`,
  },
  {
    upcoming: false,
    title: "SAC Code API",
    id: "saccodeapi",
    category: "GST",
    overview:
      "API allows user to fetch all SAC Codes via a GET request and sends as a JSON object in response to the request",
    price: 500.00,
    endpoint: {
      method: "get",
      endpoint: `${BACK_URL}/hsn/getsacall`,
    },

    response: [
      {
        name: "id",
        type: "Number",
        required: "Yes",
        description:
          "The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app",
      },
      {
        name: "code",
        type: "Number",
        required: "Yes",
        description: "SAC Code for the respective ID",
      },
      {
        name: "description",
        type: "String",
        required: "Yes",
        description: "Description for the respective SAC Code and ID",
      },
      {
        name: "createdAt",
        type: "String",
        required: "Yes",
        description:
          "The Date and time of SAC Code created at respective to the ID",
      },
      {
        name: "updatedAt",
        type: "String",
        required: "Yes",
        description:
          "The Date and time of SAC Code updated at respective to the ID",
      },
    ],
    responseJSON: `{
      "status": true,
      "message": "Sac code",
      "data": [
          {
              "id": 2,
              "code": 99,
              "description": "All Services",
              "createdAt": "2022-11-18T19:06:09.000Z",
              "updatedAt": "2022-11-18T19:06:09.000Z"
          },
          {
              "id": 3,
              "code": 9954,
              "description": "Construction services",
              "createdAt": "2022-11-18T19:06:09.000Z",
              "updatedAt": "2022-11-18T19:06:09.000Z"
          },
          {
            "id": 4,
            "code": 995411,
            "description": "Construction services of single dwelling or multi dwelling or multi-storied residential buildings",
            "createdAt": "2022-11-18T19:06:09.000Z",
            "updatedAt": "2022-11-18T19:06:09.000Z"
        },
          ....rest of the response`,
  },
];
