import db from '@/lib/db';
import { errorHandler } from '@/helper/api/error-handler';
import {
  BASE_URL,

  token,c
} from '../../Home/staticData'
export async function GET(req, res) {
  try {
    const apiServices = await db.apiService.findMany();
    return new Response(
      JSON.stringify({
        status: true,
        data: apiServices,
      }),
    );
  } catch (error) {
    console.log('🚀 ~ POST ~ err:', error);
    return errorHandler(error, req);
  } finally {
    await db.$disconnect();
  }
}

const apiDocsData = [
  {
    title: 'Signup',
    category: 'authentication',
    overview:
      'API enables users to register for a service by sending a request with their information and receiving a response with status and authentication credentials',
    price: 500.0,
    upcoming: false,
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/users/sign-up',
      endpoint:`${BASE_URL}/api/auth/signup`,

    },
    bodyParams: [
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'password',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'id',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    title: 'Admin SignUp',
    category: 'authentication',
    overview:
      'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
    price: 500.0,
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/admin/sign-up',
      endpoint:`${BASE_URL}/api/auth/signup`,
    },
    bodyParams: [
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'password',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'id',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'isAdmin',
        type: 'boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    title: 'Form-16',
    category: 'extraction_e_kyc',
    overview:
      'The API uses OCR technology to convert the image data into machine-readable text and retrieve the required information, such as the employees name, PAN number, and salary details.',
    endpoint: {
      method: 'post',
      endpoint:`${BASE_URL}/api/form16`,
    },
    bodyParams: [
      {
        name: 'bsr_code',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'challan_date',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'challan_serial_no',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'provisional_receipt_number',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'challan_amount',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'unique_pan_amount_combination_for_challan',
        type: 'Array',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'bsr_code',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'challan_date',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'challlan_serial_no',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'job_id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'tan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'financial_year',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'quarter',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    upcoming: false,
    title: 'Aadhaar',
    category: 'extraction_e_kyc',
    overview:
      'API allows user to send a file i.e. the image for aadhaar card and sends the response as a JSON object.',
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/admin/login',
      endpoint:`${BASE_URL}/api/auth/login`,
    },
    bodyParams: [
      {
        name: 'file',
        type: 'String',
        required: 'Yes',
        description:
          'The File i.e. image for Aadhaar card is required to extract and get any proper response.',
      },
    ],
    response: [
      {
        name: 'yearOfBirth',
        type: 'String',
        required: 'Yes',
        description: 'The birthdate field extracted from the image..',
      },
      {
        name: 'gender',
        type: 'String',
        required: 'Yes',
        description: 'The gender field extracted from the image..',
      },
      {
        name: 'aadhaarNumber',
        type: 'String',
        required: 'Yes',
        description: 'The Aadhaar card number field extracted from the image..',
      },
      {
        name: 'name',
        type: 'String',
        required: 'Yes',
        description: 'The name field extracted from the image..',
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
    price: 500.0,
    upcoming: false,
    title: 'Pan',
    category: 'extraction_e_kyc',
    overview:
      'API allows user to send picture for PAN Card and sends the information of the pan card in json format.',
    endpoint: {
      method: 'post',
      endpoint: 'https://ocr.itaxeasy.com/pan',
    },
    bodyParams: [
      {
        name: 'file',
        type: 'Form-data',
        required: 'Yes',
        description:
          'The File which user wants to extract information from i.e. PAN Card Picture.',
      },
    ],
    response: [
      {
        name: 'name',
        type: 'String',
        required: 'Yes',
        description: 'The extracted name from the file',
      },
      {
        name: 'fatherName',
        type: 'String',
        required: 'Yes',
        description: "The extracted father's name from the file",
      },
      {
        name: 'dob',
        type: 'String',
        required: 'Yes',
        description: 'The extracted dob from the file',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description: 'The extracted PAN from the file',
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
    price: 500.0,
    title: 'Login',
    category: 'authentication',
    overview:
      'API allows users to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token',
    endpoint: {
      method: 'post',
      endpoint:`${BASE_URL}/api/auth/login`,
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
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'password',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'id',
        type: 'number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'userType',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'isverified',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    upcoming: false,
    title: 'Admin Login',
    category: 'authentication',
    overview:
      'API allows administrators to create a new account by sending a request with their information and receiving a response with status and authentication credentials.',
    endpoint: {
      method: 'post',
      endpoint:`${BASE_URL}/api/auth/login`,
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
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'password',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'id',
        type: 'number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'userType',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'isverified',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'isAdmin',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    upcoming: false,
    title: 'Logout',
    category: 'authentication',
    overview:
      'API allows users to log out of a system by sending a request to invalidate their current session and terminate authentication.',
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/',
      endpoint:`${BASE_URL}/`,
    },
    headers: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    queryParams: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'x-apideck-consumer-id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `curl --request POST
--url https://api.sandbox.co.in/
--header 'Accept: application/json'
--header 'Content-Type: application/json'
--header 'x-api-version: 1.0' \ --data`,
  },
  {
    price: 500.0,
    upcoming: false,
    title: 'Pan',
    category: 'extraction_e_kyc',
    overview:
      'API is used to retrieve information about an individual or entitys PAN card, including the cardholders name, date of birth, and PAN number, using the PAN number as the key identifier',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/pan/get-pan-details`,
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
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    upcoming: false,
    title: 'Aadhar',
    category: 'extraction_e_kyc',
    overview:
      'The unique identification number assigned to Indian citizens, for various purposes such as e-KYC (electronic Know Your Customer) verification, demographic data retrieval, and digital signature',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/pan/verify_aadhar`,
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
        name: 'aadhar',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'D.O.B',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'driver_license',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'voter_id',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    title: 'Invoice',
    category: 'extraction_e_kyc',
    overview:
      'API allows administrators to log in to a system by sending a request with their credentials and receiving a response with authentication status and a session token.',
    price: 500.0,
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/admin/sign-up',
      endpoint:`${BASE_URL}/api/auth/signup`,
    },
    bodyParams: [
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'password',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'id',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'phone',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'isAdmin',
        type: 'boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    title: 'E-KYC',
    category: 'extraction_e_kyc',
    overview:
      'E-KYC APIs provide electronic verification of individuals from goverment database',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/pan/verify_aadhar`,
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
        name: 'aadhar',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: '@entity',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pan',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'first_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'full_name',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'aadhaar_seeding_status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'category',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'last_updated',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    category: 'bank',
    title: 'IFSC Details',
    overview:
      'The IFSC (Indian Financial System Code) Details API is used to retrieve information about a particular bank branch in India, including the banks name, address, contact details, and IFSC code, using the IFSC code as the key identifier.',
    endpoint: {
      method: 'post',
      endpoint: 'https://laravel.itaxeasy.com/api/bank/get-details?ifsc',
    },
    queryParams: [
      {
        name: 'IFSC',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'MICR',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'BRANCH',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'ADDRESS',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'STATE',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'CONTACT',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'UPI',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'RTGS',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'CITY',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'CENTRE',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'DISTRICT',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'NEFT',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'IMPS',
        type: 'Boolean',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'SWIFT',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'ISO3166',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'BANK',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'BANKCODE',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'IFSC',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    category: 'bank',
    title: 'Verify Accounts',
    overview:
      'API provides a simple way to verify the authenticity of a users account information, typically by sending a confirmation code to their email or phone number.',
    endpoint: {
      method: 'post',
      // endpoint: 'https://api.itaxeasy.com/email/verify',
      endpoint:`${BASE_URL}/api/auth/verify-otp`,
    },
    queryParams: [
      {
        name: 'email',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'status',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'message',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    responseJSON: `{
    "status": "success",
    "message": "user verified successfully"
}`,
  },
  {
    upcoming: false,
    price: 500.0,
    category: 'post_office',
    title: 'PIN Code Info',
    overview:
      'API provides access to information about postal codes, including location, state, district, and geographical coordinates.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/pincode/pincodeinfo`,
    },
    queryParams: [
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'officeName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'taluk',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'districtName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'stateName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    category: 'post_office',
    title: 'PIN Code by City',
    overview:
      'Pin code API provides a solution for retrieving postal codes (known as PIN codes) based on a given city name.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/pincode/pincodebycity`,
    },
    queryParams: [
      {
        name: 'pincode',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'city',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
    ],
    response: [
      {
        name: 'officeName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'pincode',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'taluk',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'districtName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'stateName',
        type: 'String',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
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
    price: 500.0,
    category: 'image_pdf',
    title: 'PDF Merge',
    overview:
      'PDF Merge APIs provide solutions for combining multiple PDF files into a single document.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/api/merge`,
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.0,
    category: 'image_pdf',
    title: 'IMG to PDF',
    overview:
      'Image to PDF APIs convert images to PDF format, supporting various image formats with customization options for the resulting PDF.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/api/imagetopdf`,
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.0,
    category: 'image_pdf',
    title: 'Compress',
    overview:
      'API offers a simple UI for compressing JPEG, PNG, GIF, and SVG images with bulk compression option.',
    endpoint: {
      method: 'post',
      endpoint: 'https://mom.itaxeasy.com/api/compress',
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: true,
    price: 500.0,
    category: 'authentication',
    title: 'Login with Google',
    overview:
      'API allows users to log in to a system using their Google credentials, enabling a secure and streamlined authentication process.',
    endpoint: {
      method: 'post',
      endpoint: `${BASE_URL}/login/google`,
    },
    queryParams: [],
    response: [],
    responseJSON: ``,
  },
  {
    upcoming: false,
    title: 'HSN Code API',
    category: 'gst',
    overview:
      'API allows user to fetch all HSN Codes via a GET request and sends as a JSON object in response to the request',
    price: 500.0,
    endpoint: {
      method: 'get',
      endpoint: `${BASE_URL}/hsn/gethsnall`,
    },

    response: [
      {
        name: 'id',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'hsn_code',
        type: 'Number',
        required: 'Yes',
        description: 'HSN Code for the respective ID',
      },
      {
        name: 'description',
        type: 'String',
        required: 'Yes',
        description: 'Description for the respective HSN Code and ID',
      },
      {
        name: 'createdAt',
        type: 'String',
        required: 'Yes',
        description:
          'The Date and time of HSN Code created at respective to the ID',
      },
      {
        name: 'updatedAt',
        type: 'String',
        required: 'Yes',
        description:
          'The Date and time of HSN Code updated at respective to the ID',
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
    title: 'SAC Code API',
    category: 'gst',
    overview:
      'API allows user to fetch all SAC Codes via a GET request and sends as a JSON object in response to the request',
    price: 500.0,
    endpoint: {
      method: 'get',
      endpoint: `${BASE_URL}/hsn/getsacall`,
    },

    response: [
      {
        name: 'id',
        type: 'Number',
        required: 'Yes',
        description:
          'The id of the customer stored inside Apideck Vault. This can be a user id, account id, device id or whatever entity that can have integration within your app',
      },
      {
        name: 'code',
        type: 'Number',
        required: 'Yes',
        description: 'SAC Code for the respective ID',
      },
      {
        name: 'description',
        type: 'String',
        required: 'Yes',
        description: 'Description for the respective SAC Code and ID',
      },
      {
        name: 'createdAt',
        type: 'String',
        required: 'Yes',
        description:
          'The Date and time of SAC Code created at respective to the ID',
      },
      {
        name: 'updatedAt',
        type: 'String',
        required: 'Yes',
        description:
          'The Date and time of SAC Code updated at respective to the ID',
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

export async function POST(req) {
  try {
    const res = await db.apiService.findFirst();
    console.log('Filling db with api service');

    if (res && res.id) {
      return new Response(
        JSON.stringify({
          status: true,
          message: 'Api services already populated.',
        }),
      );
    }

    for (const apiDoc of apiDocsData) {
      await db.apiService.create({
        data: {
          title: apiDoc.title,
          category: apiDoc.category,
          overview: apiDoc.overview,
          price: apiDoc.price,
          upcoming: apiDoc.upcoming,
          endpoint: apiDoc.endpoint,
          bodyParams: apiDoc.bodyParams,
          response: apiDoc.response,
          responseJSON: apiDoc.responseJSON,
        },
      });
    }

    return new Response(
      JSON.stringify({
        status: true,
        message: 'Api services added successfully',
      }),
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        status: false,
        message: error.message,
      }),
    );
  } finally {
    await db.$disconnect();
  }
}
