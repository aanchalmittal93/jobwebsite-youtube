import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Company_API_END_POINT } from "../../utils/constant.js";
import { setSingleCompany } from "../../redux/companySlice.js";

const useGetCompanyById = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(
          `${Company_API_END_POINT}/get/${companyId}`,
          { withCredentials: true }
        );
        console.log(res.data.company)
        if (res.data.success) {
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, []);
};

export default useGetCompanyById;
