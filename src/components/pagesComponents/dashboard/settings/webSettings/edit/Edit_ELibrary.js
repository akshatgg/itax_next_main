"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import Section from "@/components/pagesComponents/pageLayout/Section";
import { H5 } from "@/components/pagesComponents/pageLayout/Headings";
import Pagination from "@/components/navigation/Pagination";
import userbackAxios from "@/lib/userbackAxios";

// Modal component for editing library entries
function EditModal({ isOpen, onClose, libraryData, onUpdate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    defaultValues: libraryData || {},
  });
  
  // Watch for form changes
  const watchAllFields = watch();
  
  useEffect(() => {
    setHasChanges(isDirty);
  }, [watchAllFields, isDirty]);

  useEffect(() => {
    if (libraryData) {
      // Reset form with libraryData
      reset(libraryData);
      setHasChanges(false);
    }
  }, [libraryData, reset]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
    setHasChanges(true);
  };

  // Handle closing with unsaved changes
  const handleClose = () => {
    if (hasChanges) {
      if (window.confirm("You have unsaved changes. Are you sure you want to close?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      // Using getValues directly instead of data parameter
      console.log("Form values before submission:", getValues());
      const dataToSend = getValues();
      const { status, data: responseData } = await userbackAxios.put(`/library/update/${libraryData.id}`, dataToSend, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Update response:", responseData);

      if (status === 200) {
        toast.success("Library entry updated successfully");
        setHasChanges(false);
        onUpdate(); // Refresh data after update
        onClose(); // Close modal
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update library entry: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const formFields = [
    { name: "pan", label: "PAN" },
    { name: "section", label: "Section" },
    { name: "sub_section", label: "Sub-section" },
    { name: "subject", label: "Subject" },
    { name: "ao_order", label: "AO Order" },
    { name: "itat_no", label: "ITAT No." },
    { name: "rsa_no", label: "RSA No." },
    { name: "bench", label: "Bench" },
    { name: "appeal_no", label: "Appeal No." },
    { name: "appellant", label: "Appellant" },
    { name: "respondent", label: "Respondent" },
    { name: "appeal_type", label: "Appeal Type" },
    { name: "appeal_filed_by", label: "Appeal Filed By" },
    { name: "order_result", label: "Order Result" },
    { name: "tribunal_order_date", label: "Tribunal Order Date", type: "date" },
    { name: "assessment_year", label: "Assessment Year" },
    { name: "judgment", label: "Judgment" },
    { name: "conclusion", label: "Conclusion" },
    { name: "download", label: "Download Link" },
    { name: "upload", label: "Upload Link" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 h-5/6 overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h3 className="font-bold text-lg">Edit Library Entry</h3>
          <button onClick={handleClose} className="text-2xl">&times;</button>
        </div>
        
        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
          <form id="edit-form" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {formFields.map((field) => (
              <div key={field.name} className="col-span-1">
                <label className="text-txt font-semibold" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  id={field.name}
                  type={field.type || "text"}
                  placeholder={field.label}
                  {...register(field.name)}
                  onChange={handleInputChange}
                  className="mt-1 bg-bg_2/10 border border-txt/400 focus:border-primary text-txt text-sm block w-full p-2"
                />
                {errors[field.name] && (
                  <small className="text-red-500 italic">
                    {errors[field.name]?.message}
                  </small>
                )}
              </div>
            ))}
          </form>
        </div>
        
        <div className="p-4 bg-gray-100 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="edit-form"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Item_edit({ libraryData, onEdit, onDelete }) {
  // Format display data
  const title = `${libraryData.appellant} vs ${libraryData.respondent}`;
  const overview = libraryData.judgment?.substring(0, 150) + (libraryData.judgment?.length > 150 ? '...' : '');
  const date = new Date(libraryData.updatedAt).toLocaleDateString();
  
  // Extract key details for card display
  const keyDetails = [
    { label: "Appeal No", value: libraryData.appeal_no },
    { label: "Section", value: libraryData.section },
    { label: "Assessment Year", value: libraryData.assessment_year },
    { label: "Result", value: libraryData.order_result },
  ];

  return (
    <li className="shadow-md shadow-primary/20 rounded-md p-4 bg-bg_1/70">
      <div className="flex">
        <div className="flex-1">
          <div className="text-txt text-xl font-semibold self-center">{title}</div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 mb-2">
            {keyDetails.map((detail, idx) => (
              <div key={idx} className="text-sm">
                <span className="font-semibold">{detail.label}:</span> {detail.value}
              </div>
            ))}
          </div>
          
          <p className="text-txt/90">{overview}</p>
        </div>
        <div className="grid place-content-between gap-2">
          <div 
            className="border border-blue-600 rounded-md p-1 text-xl hover:text-blue-500 cursor-pointer" 
            title="edit"
            onClick={() => onEdit(libraryData)}
          >
            <Icon icon="material-symbols:edit-outline"/>
          </div>
          <div 
            className="border border-red-600 rounded-md p-1 text-xl hover:text-red-600 cursor-pointer" 
            title="delete"
            onClick={() => onDelete(libraryData.id)}
          >
            <Icon icon="material-symbols:delete-outline"/>
          </div>
        </div>
      </div>
      <div className="relative top-2 italic text-sm text-txt/40">{date}</div>
    </li>
  );
}

export default function Edit_ELibrary() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allLib, setAllLib] = useState({ allLibrary: [] });
  const [totalPages, setTotalPages] = useState(14);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState(null);

  const fetchAllLib = async () => {
    try {
      setIsLoading(true);
      const { data } = await userbackAxios.get(`/library/getAll`, {
        headers: { "Content-Type": "application/json" },
      });
      setAllLib(data);
      console.log("Fetched library data:", data);
    } catch (error) {
      console.error("Error fetching library data:", error);
      toast.error("Failed to fetch library data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLib();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      pan: "",
      section: "",
      sub_section: "",
      subject: "",
      ao_order: "",
      itat_no: "",
      rsa_no: "",
      bench: "",
      appeal_no: "",
      appellant: "",
      respondent: "",
      appeal_type: "",
      appeal_filed_by: "",
      order_result: "",
      tribunal_order_date: "",
      assessment_year: "",
      judgment: "",
      conclusion: "",
      download: "",
      upload: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { status } = await userbackAxios.post(`/library/create`, data, {
        headers: { "Content-Type": "application/json" },
      });

      if (status === 200 || status === 201) {
        console.log("Library entry created:", data);
        toast.success("Library entry created successfully");
        reset();
        fetchAllLib(); // Refresh the list
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to create library entry");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (libraryData) => {
    console.log("Editing library data:", libraryData);
    setSelectedLibrary(libraryData);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        const { status } = await userbackAxios.delete(`/library/delete/${id}`, {
          headers: { "Content-Type": "application/json" },
        });
        
        if (status === 200) {
          toast.success("Library entry deleted successfully");
          fetchAllLib(); // Refresh the list
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete library entry");
      }
    }
  };

  const formFields = [
    { name: "pan", label: "PAN" },
    { name: "section", label: "Section" },
    { name: "sub_section", label: "Sub-section" },
    { name: "subject", label: "Subject" },
    { name: "ao_order", label: "AO Order" },
    { name: "itat_no", label: "ITAT No." },
    { name: "rsa_no", label: "RSA No." },
    { name: "bench", label: "Bench" },
    { name: "appeal_no", label: "Appeal No." },
    { name: "appellant", label: "Appellant" },
    { name: "respondent", label: "Respondent" },
    { name: "appeal_type", label: "Appeal Type" },
    { name: "appeal_filed_by", label: "Appeal Filed By" },
    { name: "order_result", label: "Order Result" },
    { name: "tribunal_order_date", label: "Tribunal Order Date", type: "date" },
    { name: "assessment_year", label: "Assessment Year" },
    { name: "judgment", label: "Judgment" },
    { name: "conclusion", label: "Conclusion" },
    { name: "download", label: "Download Link" },
    { name: "upload", label: "Upload Link" },
  ];

  return (
    <>
      <H5 className="mt-12">Edit E-Library</H5>
      <Section>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-3 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {formFields.map((field) => (
            <div key={field.name} className="col-span-1">
              <label className="text-txt font-semibold" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.label}
                {...register(field.name, {
                  required: `${field.label} is required`,
                })}
                className="mt-1 bg-bg_2/10 border border-txt/400 focus:border-primary text-txt text-sm block w-full p-2"
              />
              {errors[field.name] && (
                <small className="text-red-500 italic">
                  {errors[field.name]?.message}
                </small>
              )}
            </div>
          ))}

          <div className="col-span-2">
            <button
              type="submit"
              className="px-6 py-2 mt-4 bg-primary text-white rounded hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>

        {isLoading ? (
          <div className="p-8 text-center">Loading library data...</div>
        ) : (
          <ul className="px-2 py-4 grid gap-4">
            {allLib.allLibrary?.map((lib, index) => (
              <Item_edit 
                key={index} 
                libraryData={lib} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
      </Section>
      
      <div className="flex p-6">
        <Pagination 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          totalPages={totalPages} 
        />
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <EditModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          libraryData={selectedLibrary} 
          onUpdate={fetchAllLib}
        />
      )}
    </>
  );
}