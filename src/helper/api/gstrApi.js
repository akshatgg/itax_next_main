import userbackAxios from '@/lib/userbackAxios';

export const getTrackGstReturn = async ({ gstin, financialYear }) => {
  const resp = await userbackAxios.post(`/gst/return/track`, {
    gstin,
    financialYear,
  });
  return resp.data.data;
};
