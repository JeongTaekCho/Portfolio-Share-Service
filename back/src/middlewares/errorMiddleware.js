function errorMiddleware(error, req, res, next) {
  res.status(400).send(error.message);
}

export { errorMiddleware };
