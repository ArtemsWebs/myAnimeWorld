export const getAllUser = async () => {
  return await fetch(`${process.env.BACKEND_BASE_URL}/roles/allRoles`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(async (response) => await response.json())
    .catch((er) => er);
};
