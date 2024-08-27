import { StudentServices } from "./student.service";
import sendRsponse from "../../utils/semdResponese";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
  const result = StudentServices.getAllStudentsFromDB;

  sendRsponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student is featched successfully",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.getSingleStudentFromDB(studentId);

  sendRsponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Get the single student successfully",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendRsponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delete the student successfully",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
