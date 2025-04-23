import { Response } from "express";

// Success response utility function
export const sendSuccessResponse = (
  res: Response,
  data: any,
  message: string = "Success"
) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

// Error response utility function
export const sendErrorResponse = (
  res: Response,
  error: any,
  message: string = "Error"
) => {
  return res.status(400).json({
    success: false,
    message,
    error,
  });
};
