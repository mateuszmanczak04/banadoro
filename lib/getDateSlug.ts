export const getDateSlug = (date: Date) => {
  let dateSlug = '';
  dateSlug += date.getFullYear().toString();
  dateSlug += '-' + (date.getMonth() + 1).toString();
  dateSlug += '-' + date.getDate().toString();
  return dateSlug;
};
