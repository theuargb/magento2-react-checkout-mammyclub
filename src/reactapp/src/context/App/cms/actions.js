import { fetchCmsPagesRequest } from '../../../api';

export async function fetchCmsPagesAction(dispatch, cmsPagesIds) {
  try {
    const response = await fetchCmsPagesRequest(dispatch, cmsPagesIds);
    return response;
  } catch (error) {
    console.error(error);
  }
  return {};
}
