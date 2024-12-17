// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import Switch from "../../elements/Switch/Switch";

// const SubDataPemumpang = ({ title_card }) => {
//   const [showNamaKeluarga, setShowNamaKeluarga] = useState(false);

//   const handleSwitchChange = () => {
//     setShowNamaKeluarga(!showNamaKeluarga);
//   };

//   return (
//     <div className="rounded-lg mb-10">
//       <div className="head-card p-4 rounded-t-lg bg-neutral-700 text-white">
//         <h1 className="text-base">{title_card}</h1>
//       </div>
//       <div className="body-card px-5">
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Tittle
//           </label>
//           <div className="relative">
//             <select className="border-2 py-3 px-4 text-base rounded-[8px] w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ease-in-out">
//               <option value="mr">Mr</option>
//               <option value="mrs">Mrs</option>
//             </select>
//           </div>
//         </div>
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Nama Lengkap
//           </label>
//           <input
//             type="text"
//             className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//           />
//         </div>
//         <div className="flex justify-between">
//           <p>Punya Nama Keluarga?</p>
//           <Switch onChange={handleSwitchChange} />
//         </div>
//         {showNamaKeluarga && (
//           <div className="flex flex-col my-6">
//             <label
//               htmlFor=""
//               className="font-semibold text-purple-800 mb-2 text-sm"
//             >
//               Nama Keluarga
//             </label>
//             <input
//               type="text"
//               className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//             />
//           </div>
//         )}

//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Tanggal Lahir
//           </label>
//           <input
//             type="date"
//             className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//           />
//         </div>
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Kewarganegaraan
//           </label>
//           <input
//             type="text"
//             className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//           />
//         </div>
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Ktp/Paspor
//           </label>
//           <input
//             type="text"
//             className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//           />
//         </div>
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Negara Penerbit
//           </label>
//           <select className="border-2 py-3 px-4 text-sm rounded-[4px] w-full">
//             <option value=""></option>
//             <option value="Indonesia">Indonesia</option>
//           </select>
//         </div>
//         <div className="flex flex-col my-6">
//           <label
//             htmlFor=""
//             className="font-semibold text-purple-800 mb-2 text-sm"
//           >
//             Berlaku Sampai
//           </label>
//           <input
//             type="date"
//             className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubDataPemumpang;

import React, { useState, useEffect } from "react";
import Switch from "../../elements/Switch/Switch";

const SubDataPenumpang = ({ title_card, onValidate }) => {
  const [showNamaKeluarga, setShowNamaKeluarga] = useState(false);
  const [formData, setFormData] = useState({
    tittle: "",
    fullName: "",
    familyName: "",
    dateOfBirth: "",
    nationality: "",
    idOrPassport: "",
    countryOfIssue: "",
    validUntil: "",
  });

  const handleSwitchChange = () => {
    setShowNamaKeluarga(!showNamaKeluarga);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const isValid = validateForm();
    onValidate(isValid);
  }, [formData]);

  const validateForm = () => {
    const { fullName, dateOfBirth, nationality, idOrPassport } = formData;
    return fullName && dateOfBirth && nationality && idOrPassport;
  };

  return (
    <div className="rounded-lg mb-10">
      <div className="head-card p-4 rounded-t-lg bg-neutral-700 text-white">
        <h1 className="text-base">{title_card}</h1>
      </div>
      <div className="body-card px-5">
        {/* Tittle */}
        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Tittle
          </label>
          <div className="relative">
            <select
              name="tittle"
              value={formData.tittle}
              onChange={handleInputChange}
              className="border-2 py-3 px-4 text-base rounded-[8px] w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ease-in-out"
            >
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>

        <div className="flex justify-between">
          <p>Punya Nama Keluarga?</p>
          <Switch onChange={handleSwitchChange} />
        </div>

        {showNamaKeluarga && (
          <div className="flex flex-col my-6">
            <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
              Nama Keluarga
            </label>
            <input
              type="text"
              name="familyName"
              value={formData.familyName}
              onChange={handleInputChange}
              className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
            />
          </div>
        )}

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Tanggal Lahir
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Kewarganegaraan
          </label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Nomor ID atau Paspor
          </label>
          <input
            type="text"
            name="idOrPassport"
            value={formData.idOrPassport}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Negara Penerbit ID
          </label>
          <input
            type="text"
            name="countryOfIssue"
            value={formData.countryOfIssue}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>

        <div className="flex flex-col my-6">
          <label htmlFor="" className="font-semibold text-purple-800 mb-2 text-sm">
            Berlaku Hingga
          </label>
          <input
            type="date"
            name="validUntil"
            value={formData.validUntil}
            onChange={handleInputChange}
            className="border-2 py-3 px-4 text-sm rounded-[4px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SubDataPenumpang;


