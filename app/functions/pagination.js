
function formPaginated(data, page, limit) {

  const pages = Math.ceil(data.count / limit);

  return {
    total: +data.count,
    pages: pages ? +pages : 1,
    perPage: +limit,
    data: data.rows || []
  };
}

function getOffset(page, limit) {
  return Math.abs(page - 1) * limit;
}

module.exports = {
  formPaginated,
  getOffset,
};