import { Schema, model } from "mongoose";
import {
  StudentModel,
  TGurdian,
  TLocalGurdian,
  TStudent,
  TUserName,
} from "./student.interface";
import validator from "validator";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name can not be more than 20 characters"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not capitalized",
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const GurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father's name is required"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father's contact number is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father's occupation is required"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother's name is required"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother's contact number is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother's occupation is required"],
  },
});

const LocalGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian's name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local guardian's occupation is required"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local guardian's contact number is required"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Local guardian's address is required"],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Student name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not valid",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: "{VALUE} is not a valid email type",
      // },
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, "Contact number is required"],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, "Permanent address is required"],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, "Present address is required"],
    },
    gurdian: {
      type: GurdianSchema,
      required: [true, "Guardian information is required"],
    },
    localGurdian: {
      type: LocalGurdianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImg: {
      type: String,
      trim: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtuals
studentSchema.virtual("fullname").get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// Query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  // this.find({ isDeleted: { $ne: true } });
  console.log(this.pipeline());
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// create a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a model
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
