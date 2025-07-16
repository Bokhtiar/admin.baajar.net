import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NetworkServices } from "../../network";
import { networkErrorHandeller } from "../../utils/helpers";


const VendorDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [vendor, setVendor] = useState(null);



 const fetchVendor = async () => {
    setLoading(true);
    try {
      const response = await NetworkServices.Vendor.show(id);
      if (response?.status === 200) {
        setVendor(response?.data?.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      fetchVendor();
    }
  }, [id]);
  return (
<div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Personal Information */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Personal Contact Information</h2>
        <p><span className="font-semibold text-gray-600">Phone:</span> {vendor?.phone_number}</p>
        <p><span className="font-semibold text-gray-600">Email:</span> {vendor?.email}</p>
        <p><span className="font-semibold text-gray-600">Date of Birth:</span> {new Date(vendor?.date_of_birth).toLocaleDateString()}</p>
        <p><span className="font-semibold text-gray-600">NID:</span> {vendor?.nid}</p>
      </div>

      {/* Company / Vendor Info */}
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-700 border-b pb-2">Vendor Information</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <img
            src={`${import.meta.env.VITE_API_SERVER}${vendor?.logo}`}
            alt="Logo"
            className="w-20 h-20 rounded object-cover "
          />
          <div>
            <p className="text-lg font-semibold">{vendor?.company_name}</p>
            <p className="text-sm text-gray-600">{vendor?.company_location}</p>
          </div>
        </div>
        <div>
          <p>
            <span className="font-semibold text-gray-600">Trade License:</span>
            <a
              href={`${import.meta.env.VITE_API_SERVER}${vendor?.tread_licence}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 underline"
            >
              View Document
            </a>
          </p>
          <p>
            <span className="font-semibold text-gray-600">Role:</span> {vendor?.role}
          </p>
          <p>
            <span className="font-semibold text-gray-600">Account Active:</span> {vendor?.is_active ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorDetails;
