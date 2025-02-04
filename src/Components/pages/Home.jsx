import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import logo from '../../assets/logoblood-removebg-preview.png';
const Home = () => {

  // Ramadan schedule data in JSON format
  const ramadanScheduleBangla = [
    { "day": "১", "date": "০২ মার্চ ", "sehri": "০৫:০৪ AM", "iftar": "৬:০২ PM" },
    { "day": "২", "date": "০৩ মার্চ ", "sehri": "০৫:০৩ AM", "iftar": "৬:০৩ PM" },
    { "day": "৩", "date": "০৪ মার্চ ", "sehri": "০৫:০২ AM", "iftar": "৬:০৩ PM" },
    { "day": "৪", "date": "০৫ মার্চ ", "sehri": "০৫:০১ AM", "iftar": "৬:০৪ PM" },
    { "day": "৫", "date": "০৬ মার্চ ", "sehri": "০৫:০০ AM", "iftar": "৬:০৪ PM" },
    { "day": "৬", "date": "০৭ মার্চ ", "sehri": "০৪:৫৯ AM", "iftar": "৬:০৫ PM" },
    { "day": "৭", "date": "০৮ মার্চ ", "sehri": "০৪:৫৮ AM", "iftar": "৬:০৫ PM" },
    { "day": "৮", "date": "০৯ মার্চ ", "sehri": "০৪:৫৭ AM", "iftar": "৬:০৬ PM" },
    { "day": "৯", "date": "১০ মার্চ ", "sehri": "০৪:৫৬ AM", "iftar": "৬:০৬ PM" },
    { "day": "১০", "date": "১১ মার্চ ", "sehri": "০৪:৫৫ AM", "iftar": "৬:০৬ PM" },
    { "day": "১১", "date": "১২ মার্চ ", "sehri": "০৪:৫৪ AM", "iftar": "৬:০৭ PM" },
    { "day": "১২", "date": "১৩ মার্চ ", "sehri": "০৪:৫৩ AM", "iftar": "৬:০৭ PM" },
    { "day": "১৩", "date": "১৪ মার্চ ", "sehri": "০৪:৫২ AM", "iftar": "৬:০৮ PM" },
    { "day": "১৪", "date": "১৫ মার্চ ", "sehri": "০৪:৫১ AM", "iftar": "৬:০৮ PM" },
    { "day": "১৫", "date": "১৬ মার্চ ", "sehri": "০৪:৫০ AM", "iftar": "৬:০৮ PM" },
    { "day": "১৬", "date": "১৭ মার্চ ", "sehri": "০৪:৪৯ AM", "iftar": "৬:০৯ PM" },
    { "day": "১৭", "date": "১৮ মার্চ ", "sehri": "০৪:৪৮ AM", "iftar": "৬:০৯ PM" },
    { "day": "১৮", "date": "১৯ মার্চ ", "sehri": "০৪:৪৭ AM", "iftar": "৬:১০ PM" },
    { "day": "১৯", "date": "২০ মার্চ ", "sehri": "০৪:৪৬ AM", "iftar": "৬:১০ PM" },
    { "day": "২০", "date": "২১ মার্চ ", "sehri": "০৪:৪৫ AM", "iftar": "৬:১০ PM" },
    { "day": "২১", "date": "২২ মার্চ ", "sehri": "০৪:৪৪ AM", "iftar": "৬:১১ PM" },
    { "day": "২২", "date": "২৩ মার্চ ", "sehri": "০৪:৪৩ AM", "iftar": "৬:১১ PM" },
    { "day": "২৩", "date": "২৪ মার্চ ", "sehri": "০৪:৪২ AM", "iftar": "৬:১১ PM" },
    { "day": "২৪", "date": "২৫ মার্চ ", "sehri": "০৪:৪১ AM", "iftar": "৬:১২ PM" },
    { "day": "২৫", "date": "২৬ মার্চ ", "sehri": "০৪:৪০ AM", "iftar": "৬:১২ PM" },
    { "day": "২৬", "date": "২৭ মার্চ ", "sehri": "০৪:৩৯ AM", "iftar": "৬:১৩ PM" },
    { "day": "২৭", "date": "২৮ মার্চ ", "sehri": "০৪:৩৮ AM", "iftar": "৬:১৩ PM" },
    { "day": "২৮", "date": "২৯ মার্চ ", "sehri": "০৪:৩৬ AM", "iftar": "৬:১৪ PM" },
    { "day": "২৯", "date": "৩০ মার্চ ", "sehri": "০৪:৩৫ AM", "iftar": "৬:১৪ PM" },
    { "day": "৩০", "date": "৩১ মার্চ ", "sehri": "০৪:৩৪ AM", "iftar": "৬:১৫ PM" }
  ];

  const pdfRef = useRef();
  // Function to generate PDF
  const handleDownloadPDF = async () => {
const element =pdfRef.current;
// console.log(element)
if(!element){
  return;
}
const canvas =await html2canvas(element,{scale:2

});
const data =canvas.toDataURL('image/png');
const pdf = new jsPDF({
  orientation: "portrait",
  unit: "px",
  format: "a4"
});
const imagProperties =pdf.getImageProperties(data);
const pdfWidth= pdf.internal.pageSize.getWidth(); 
const pdfHeight = (imagProperties.height*pdfWidth)/ imagProperties.width;

pdf.addImage(data,'PNG',0,0,pdfWidth,pdfHeight)
pdf.save('ramdanpdf.pdf')
  };



  return (
    <div>
      <div className="flex justify-end items-end p-5">
        <button
          className="text-sm font-medium bg-green-600 text-white px-4 py-1 rounded-md"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>

      <div  className="bg-gray-100 text-gray-800 min-h-screen px-6">
        <div  ref={pdfRef} className="container mx-auto ">
          <div className="text-center bg-gradient-to-r from-[#000001] to-[#3533CA] p-5 shadow-md">
            <div className="flex justify-between items-center">
              <div>
              <img className="w-28" src={logo} alt="" />
              </div>
              <div>
              <h1 className="text-4xl font-semibold text-white text-center">
                Blood Bank Bangladesh
              </h1>
              <h1 className="text-2xl font-semibold text-white text-center">
                ( জীবনের প্রয়োজনে রক্ত )
              </h1>
              <h2 className="text-xl text-white font-semibold">
              সেহেরি ও ইফতারের সময়সূচি
            </h2>

            <p className="text-base font-medium text-white px-4 rounded-md inline-block">
              ( শুধু ঢাকা জেলার জন্য )
            </p>
            </div>
            <div>
              {/* no content */}
            </div>

       
            </div>
        
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg">
              <thead className="bg-white text-black">
                <tr>
                  <th className="border font-bold text-xl border-gray-300 p-3 w-48">১৪৪৬ হিজরী <br />রমজান </th>
                  <th className="border text-xl  border-gray-300 font-bold p-3 w-96">তারিখ</th>
                  <th className="border font-bold text-xl border-gray-300 p-3 w-96">সেহেরি</th>
                  <th className="border font-bold text-xl border-gray-300 p-3 w-96">ইফতার</th>
                </tr>
              </thead>
              <tbody>
                {ramadanScheduleBangla.map((item, index) => (
                  <tr
                    key={item.day}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="border border-gray-300 p-3 text-center w-48">{item.day}</td>
                    <td className="border border-gray-300 p-3 text-center w-96">{item.date}</td>
                    <td className="border border-gray-300 p-3 w-96 text-center">{item.sehri}</td>
                    <td className="border border-gray-300 p-3 w-96 text-center">{item.iftar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center bg-gradient-to-r from-[#000001] to-[#3533CA] p-5 shadow-md">
            <h1 className="text-lg font-semibold text-white">Donate Blood, Save Life</h1>
            <h1 className="text-lg font-semibold text-white">ESTD-2020</h1>
          </div>

        <div className="flex justify-between items-center">
        <p className="text-start p-2 text-2xl text-gray-600 ">
            <strong>বি.দ্রঃ</strong> ১ম রমজান চাঁদ দেখার উপর নির্ভরশীল।
          </p>
          <p className="text-end text-black p-5 font-bold">
          Design by Amir Hossain
          <p className="text-en text-black">01904722779
          </p>
          </p>
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
