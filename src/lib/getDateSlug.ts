export const getDateSlug = (date: Date) => {
  let dateSlug = '';

  const year = date.getFullYear();
  const month = ('00' + (date.getMonth() + 1)).slice(-2);
  const day = ('00' + date.getDate()).slice(-2);
  dateSlug = year + '-' + month + '-' + day;

  return dateSlug;
};
