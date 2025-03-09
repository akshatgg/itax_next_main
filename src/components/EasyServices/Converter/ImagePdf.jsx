// "use client";
// import React, { useContext, useEffect } from "react";
// import { StoreContext } from "@/store/store-context";
// import Image from "next/image";
// import {useRouter} from "next/navigation"

// // // import {
// // //   Image,
// // //   Document,
// // //   Page,
// // //   StyleSheet,
// // //   PDFViewer,
// // // } from "@react-pdf/renderer";

// // // const styles = StyleSheet.create({
// // //   page: {
// // //     backgroundColor: "white",
// // //     color: "black",
// // //     marginTop: "70",
// // //   },
// // //   image: {
// // //     position: "absolute",
// // //     left: "26%",
// // //     top: "28%",
// // //     transform: "translate(-50%,-50%)",
// // //     width: 400,
// // //     height: 300,
// // //     zIndex: -100,
// // //     margin: "auto",
// // //   },
// // //   viewer: {
// // //     width: window.innerWidth, //the pdf viewer will take up all of the width and height
// // //     height: window.innerHeight,
// // //   },
// // // });

// // // const PdfViewer = () => {
// // //   const [state, dispatch] = useContext(StoreContext);
// // //   const router = useRouter();

// // //   useEffect(() => {
// // //     if (!state.imagePDF) {
// // //       router.replace("/");
// // //     }
// // //   }, []);

// // //   return (
// // //     <>
// // //       <PDFViewer style={styles.viewer}>
// // //         <Document styles={styles.page}>
// // //           {state.imagePDF.map((item, i) => (
// // //             <Page key={i} size="A4" style={styles.page}>
// // //               <Image style={styles.image} src={item.imageUrl} />
// // //             </Page>
// // //           ))}
// // //         </Document>
// // //       </PDFViewer>
// // //     </>
// // //   );
// // // };

// import { jsPDF,HTMLOptionImage } from "jspdf";
// import { toPng,toCanvas } from "html-to-image";

// const PdfViewer = ({ html }) => {
//   const generatePdf = () => {
//       const doc = new jsPDF();

//       let split=doc.splitTextToSize(document.getElementById("text").innerText,200);
//       let image = document.getElementById("image").getAttribute('src');
//       doc.text(document.querySelector(".content > h1").innerHTML,75,5);
//       doc.addImage(image,70,7,60,60);
//       doc.text(split,5,75);
//       doc.output("dataurlnewwindow");  

//   };

//   const generateImage=async ()=>{
//     const image = await toPng(html.current,{quality:0.95});
//     const doc = new jsPDF();

//       doc.addImage(image,'JPEG',5,22,200,160);
//       doc.save();


//   }
//   return (

//     <div className="text-center">
//         <button className="button-blue" onClick={generateImage}>
//         download PDF
//       </button>
//     </div>

//   );
// };

// const app =()=>{
//     const ref = React.useRef();
//       const router = useRouter();
//     const [state, dispatch] = useContext(StoreContext);
//     const {imagePDF:images} = state
//       useEffect(() => {
//         if (!state.imagePDF) {
//           router.push("../");
//         }
//       }, []);
//     return(<div className="main">
//     <div ref={ref}>
//         {images?.map((image,i)=>(
//             <img className="w-full min-h-screen shadow-sm" key={i} src={image.imageUrl} alt="" />
//         ))}
//     </div>
//     <PdfViewer html={ref}/>
//     </div>);
// }

// export default app;


export default function ImagePdf() {
    return (
        <div>
            <h1>ImagePdf</h1>
        </div>
    );
}