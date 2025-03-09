// 'use client';
// import { useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import actions from '@/store/actions';
// // import { API_CART, CART_DETAIL } from "@/store/actions";
// import { StoreContext } from '@/store/store-context';
// import {
//   MainLink,
//   NoData,
//   RemoveCartButton,
// } from '@/app_old/styles/globalStyles';
// import styled from 'styled-components';
// import axios from 'axios';
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// import { useAuth } from '../hooks/useAuth';
// import useAuth from '@/hooks/useAuth';
// import { v4 as uuidv4 } from 'uuid';
// import Image from 'next/image.js';
// // const Para = styled.p`
// //     max-height: 100px;
// //     overflow: hidden;
// //     display: -webkit-box;
// //     -webkit-line-clamp:2;
// //     -webkit-box-orient:vertical;
// // `

// import { removeFromCart, resetCart } from '@/store/slices/cartSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { formatINRCurrency } from '@/utils/utilityFunctions';
// export default function Cart() {
//   const { token, currentUser } = useAuth();
//   // const [loading, setLoding] = useState(false)
//   const [cartData, setCartData] = useState([]);
//   const [apiCartData, setApiCartData] = useState([]);
//   const [newCartData, setNewCartData] = useState([]);
//   //const [state, dispatch] = useContext(StoreContext);
//   const router = useRouter();

//   // ------ REDUX LOGIC STARTS ---------------
//   const { cart, totalAmount } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   // ----------REDUX LOGIC ENDS ---------------

//   useEffect(() => {
//     setCartData(JSON.parse(localStorage.getItem('cartData')));
//     setApiCartData(JSON.parse(localStorage.getItem('apiCart')));
//   }, [newCartData]);

//   // console.log("vvvbbvbvb",apiCartData)

//   // const removeFromCart = (id) => {
//   //   const uuidPattern =
//   //     /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

//   //   if (+id || uuidPattern.test(id)) {
//   //     const updatedData = cartData.filter((item) => item.id !== id);
//   //     setNewCartData(updatedData);
//   //     localStorage.setItem('cartData', JSON.stringify(updatedData));
//   //     dispatch({ type: actions.CART_DETAIL, payload: updatedData });
//   //   } else {
//   //     const updatedData = apiCartData.filter((item) => item.title !== id);
//   //     setNewCartData(updatedData);
//   //     localStorage.setItem('apiCart', JSON.stringify(updatedData));
//   //     dispatch({ type: actions.API_CART, payload: updatedData });
//   //   }
//   // };

//   const buyNowHandler = (id) => {
//     router.push(`/uploadFiles?${id}`);
//   };

//   const handlePayment = async () => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     const user = currentUser ? currentUser.user : {};

//     const userName = user.firstName + ' ' + user.lastName;

//     const totalPrice =
//       (cartData
//         ? cartData.reduce((acc, curr) => acc + (+curr.gst + +curr.price), 0)
//         : 0) +
//       (apiCartData
//         ? apiCartData.reduce(
//             (acc, curr) => acc + (+curr.price * (18 / 100) + +curr.price),
//             0,
//           )
//         : 0);

//     const uuid = uuidv4();

//     // console.log(apiCartData)

//     const data = {
//       unique_id: null,
//       split_payments: null,
//       sub_merchant_id: null,
//       customer_authentication_id: null,
//       name: userName,
//       amount: totalPrice.toFixed(2),
//       txnid: uuid,
//       email: user.email,
//       phone: user.phone,
//       productinfo: 'Services',
//       surl: 'http://localhost:3000/payment-success',
//       furl: 'http://localhost:3000/payment-failure',
//     };

//     console.log(data);

//     const response = await axios.post(
//       `${BASE_URL}/payment/initiate_payment`,
//       data,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       },
//     );

//     if (response.status === 200) {
//       console.log(response.data);
//       const key = response.data.key;
//       const access_key = response.data.access_key.data;

//       console.log('key', key);
//       console.log('access_key', access_key);

//       var easebuzzCheckout = new EasebuzzCheckout(key, 'test');

//       var options = {
//         access_key: access_key,
//         onResponse: (response) => {
//           console.log(response);
//         },
//         theme: '#4f46e5',
//       };

//       easebuzzCheckout.initiatePayment(options);
//     } else {
//       console.log(response.data);
//       alert('Something went wrong');
//     }
//   };

//   return (
//     <>
//       {(cartData && cartData.length > 0) || (cart && cart.length > 0) ? (
//         <div className="min-h-screen flex flex-col gap-5 my-10 w-11/12 m-auto ">
//           <div className="flex justify-between">
//             <h1 className="text-left text-4xl text-slate-900  font-semibold">
//               Cart
//             </h1>
//             <button
//               className="text-white px-4 py-2 rounded-md hover:bg-red-700 transition-all duration-300 bg-red-500 font-semibold"
//               onClick={() => {
//                 dispatch(resetCart());
//               }}
//             >
//               Reset Cart
//             </button>
//           </div>
//           {cartData &&
//             cartData.length > 0 &&
//             cartData.map((item) => {
//               return (
//                 <div
//                   key={item.id}
//                   className="flex p-5 items-center gap-5 bg-[#f0f0f1] rounded-lg"
//                 >
//                   <div className="w-1/5">
//                     <img src={item.imgPath} alt=""></img>
//                   </div>
//                   <div className="w-4/5">
//                     <h3 className="text-2xl font-semibold">
//                       {item.serviceName}
//                     </h3>
//                     <div className="mt-2">
//                       <MainLink href={`/register-startup/${item.id}`}>
//                         View
//                       </MainLink>
//                       <RemoveCartButton
//                         style={{ backgroundColor: 'white', marginLeft: '1rem' }}
//                         onClick={() => removeFromCart(item.id)}
//                       >
//                         Remove From Cart
//                       </RemoveCartButton>
//                     </div>
//                   </div>
//                   <div className=" justify-self-end max-w-[250px] w-full rounded ml-5 grid grid-cols-2 h-fit px-10 py-5">
//                     <span className="text-left py-2">Fees: </span>
//                     <span className="font-semibold text-right py-2">
//                       {item.price}
//                     </span>
//                     <span className="text-left py-2">GST (18%): </span>
//                     <span className="font-semibold text-right py-2">
//                       {(+item.price * (18 / 100)).toFixed('2')}
//                     </span>
//                     <span className="col-span-2 py-2 border-t-2 border-zinc-400 mt-3 text-right font-semibold text-2xl">
//                       {(+item.price).toFixed('2')}
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}

//           {cart &&
//             cart.length > 0 &&
//             cart.map((item) => {
//               return (
//                 <div
//                   key={item.title}
//                   className="flex p-5 items-center gap-5 bg-[#f0f0f1] rounded-lg"
//                 >
//                   <div className="w-1/5">
//                     <img src="/logo.svg" alt=""></img>
//                   </div>
//                   <div className="w-4/5">
//                     <h3 className="text-2xl font-semibold">{item.title}</h3>
//                     <div className="mt-2">
//                       <MainLink
//                         href={
//                           item?.link
//                             ? item.link
//                             : `/apis/docs/${item.title.replace(/ /g, '').toLowerCase()}`
//                         }
//                       >
//                         View
//                       </MainLink>
//                       <RemoveCartButton
//                         style={{ backgroundColor: 'white', marginLeft: '1rem' }}
//                         onClick={() => dispatch(removeFromCart(item))}
//                       >
//                         Remove From Cart
//                       </RemoveCartButton>
//                     </div>
//                     {/* <Para className="mt-3">
//                             {item.description}
//                         </Para> */}
//                   </div>
//                   <div className=" justify-self-end max-w-[250px] w-full rounded ml-5 grid grid-cols-2 h-fit px-10 py-5">
//                     <span className="text-left py-2">Price: </span>
//                     <span className="font-semibold text-right py-2">
//                       {formatINRCurrency(item.price)}
//                     </span>
//                     {/* <span className="text-left py-2">GST (18%): </span>
//                     <span className="font-semibold text-right py-2">
//                       {(+item.price * (18 / 100)).toFixed('2')}
//                     </span>
//                     <span className="col-span-2 py-2 border-t-2 border-zinc-400 mt-3 text-right font-semibold text-2xl">
//                       ₹ {(+item.price * (18 / 100) + +item.price).toFixed('2')}
//                     </span> */}
//                   </div>
//                 </div>
//               );
//             })}

//           <div className="flex py-5 px-3 sm:px-8 sm:py-8 bg-[#f0f0f1] rounded   justify-end">
//             <div className="space-y-4 md:space-y-8">
//               <div className=" justify-self-end max-w-[340px] w-full rounded grid grid-cols-2 h-fit  text-2xl">
//                 <span className="text-left py-2">Sub Total: </span>
//                 <span className="font-semibold text-right py-2">
//                   {formatINRCurrency(totalAmount)}
//                 </span>
//                 <span className="text-left py-2">GST (18%): </span>
//                 <span className="font-semibold text-right py-2">
//                   {formatINRCurrency(+totalAmount * (18 / 100))}
//                 </span>
//                 <span className="col-span-2 py-2 border-t-2 border-zinc-400 mt-3 text-right font-semibold text-2xl">
//                    {formatINRCurrency(+totalAmount * (18 / 100) + +totalAmount)}
//                 </span>
//               </div>

//               <div className="text-right">
//                 <MainLink
//                   onClick={handlePayment}
//                   className="text-xl"
//                   href={'#'}
//                 >
//                   Purchase Now
//                 </MainLink>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <NoData className="min-h-screen">
//           <Image
//             width={300}
//             height={300}
//             src={'/cart.svg'}
//             alt=""
//             className="xl:w-[300px] md:w-[200px]"
//           />
//           Your Cart is Empty...
//           <MainLink style={{ fontSize: '1rem' }} href="/apis">
//             Add Some Services
//           </MainLink>
//         </NoData>
//       )}
//     </>
//   );
// }
