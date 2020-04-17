/**
 * Get user by id
 * @param req
 * @param res
 * @param next
 * @returns {any | Promise<any>}
 */
function getUser(req, res, next) {
  const { id } = req.params;

  return res.json({ id: 1, email: 'test@test.test', firstName: 'first_name', lastName: 'last_name' });
}

module.exports = {
  getUser
};