import {  useLocation } from "react-router-dom";

/**
 * Returns URL search params.
 */
export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
