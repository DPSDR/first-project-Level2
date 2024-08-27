import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGurdian = {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
};

export type TLocalGurdian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  permanentAddress: string;
  presentAddress: string;
  gurdian: TGurdian;
  localGurdian: TLocalGurdian;
  profileImg?: string;
  isDeleted: boolean;
};

// for creating static method
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// for creating instance method
// export type StudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
