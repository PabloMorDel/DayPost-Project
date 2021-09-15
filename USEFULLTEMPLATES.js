const error = new Error('');
error.httpStatus = 401;
throw error;

if (Number(idUser) !== idReqUser && idReqUser !== 1) {
  const error = new Error(`You have no permissions to modify that user`);
  error.httpStatus = 403;
  throw error;
}
