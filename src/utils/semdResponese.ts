import { Response } from "express";

type TRespone<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
};

const sendRsponse = <T>(res: Response, data: TRespone<T>) => {
  res.status(data?.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
  });
};

export default sendRsponse;
