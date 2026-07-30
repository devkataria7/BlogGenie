const errorHandler = (err, req, res, next) => {
  // Log every error for debugging
  if (err.originalError) {
    console.error(
      `Original Error: [${req.method}] ${req.originalUrl}`,
      err.originalError,
    );
  } else {
    console.error(err);
  }

  // Expected (operational) errors
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

  // Unexpected (programming) errors
  return res.status(500).json({
    success: false,
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};

export default errorHandler;
