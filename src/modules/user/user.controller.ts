import { UserServices } from "./user.service";
import sendRsponse from "../../utils/semdResponese";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  // creating a schema vaidation using zod
  const { password, student: studentData } = req.body;

  // will call service function to send validate data
  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendRsponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is created successfully",
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
