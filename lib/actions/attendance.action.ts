"use server";

import dayjs, { Dayjs } from "dayjs";
import { AttendanceType } from "../interfaces/attendance.interface";
import { AgeGroupType } from "../interfaces/class.interface";
import { StudentType } from "../interfaces/student.interface";
import Attendance from "../models/attendance.model";
import Classes from "../models/class.model";
import Material from "../models/material.model";
import Student from "../models/student.model";
import connectDB from "../mongodb";
import { authOptions } from "@/utils/authOptions";
// import { getServerSession } from "next-auth";
import { ParentType } from "../interfaces/parent.interface";
import { revalidatePath } from "next/cache";
import { authUserClerk } from "./parent.action";

export async function fetchAttendances({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const startDate = new Date(year, month - 1, 1); // Note: Month is 0-indexed
    const endDate = new Date(year, month + 1, 1); // This gives the first day of the next month
    endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Subtract one millisecond to get the last millisecond of the last day

    console.log(startDate, endDate);

    const query = Attendance.find({
      date: { $gte: startDate, $lte: endDate }, // Filter by date within the specified month
    })
      .sort({ date: "asc" })
      // .limit(pageSize)
      .lean()
      .select(
        "_id date ageGroup startTime endTime link studentsPresent studentsNotPresent"
      )
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        select: "_id class",
        model: Classes,
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data: any[] = await query;

    console.log(data);

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: AttendanceType) => {
      return {
        ...d,
        _id: d._id?.toString(),
        classParticipants: d?.classParticipants?.map((single) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        class: {
          ...d.class,
          _id: d.class._id?.toString(),
        },
      };
    });

    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchSingleAttendanceById({
  attendanceId,
}: {
  attendanceId: string;
}) {
  try {
    connectDB();
    const query = Attendance.findById(attendanceId)
      .lean()
      .select(
        "_id date ageGroup startTime endTime link studentsPresent studentsNotPresent materials"
      )
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        select: "_id class zoomLink",
        model: Classes,
      })
      .populate({
        path: "materials",
        select: "_id filename url available",
        model: Material,
      })
      .exec();

    const d: any = await query;

    // Convert _id to string in the results
    const arrToIdString: AttendanceType = {
      ...d,
      _id: d._id?.toString(),
      classParticipants: d?.classParticipants?.map((single: any) => {
        return {
          ...single,
          _id: single._id?.toString(),
        };
      }),
      class: {
        ...d.class,
        _id: d.class._id?.toString(),
      },
      // materials: d.materials
      //   ? d.materials?.map((sing: any) => {
      //       return {
      //         ...d.materials,
      //         _id: d.materials._id?.toString(),
      //       };
      //     })
      //   : undefined,
    };

    return { attendances: arrToIdString };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchTeacherAttendances({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const startDate = new Date(year, month - 1, 1); // Note: Month is 0-indexed
    const endDate = new Date(year, month + 2, 1); // This gives the first day of the next month
    endDate.setMilliseconds(endDate.getMilliseconds() - 1); // Subtract one millisecond to get the last millisecond of the last day

    const query = Attendance.find({
      date: { $gte: startDate, $lte: endDate }, // Filter by date within the specified month
      classParticipants: { $exists: true, $not: { $size: 0 } },
    })
      .sort({ date: "asc", startTime: "asc" })
      // .limit(pageSize)
      .lean()
      .select(
        "_id date ageGroup startTime endTime link studentsPresent studentsNotPresent"
      )
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        select: "_id class",
        model: Classes,
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data: any[] = await query;

    console.log(data);

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: AttendanceType) => {
      return {
        ...d,
        _id: d._id?.toString(),
        classParticipants: d?.classParticipants?.map((single) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        class: {
          ...d.class,
          _id: d.class._id?.toString(),
        },
      };
    });

    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchUpcomingAttendances({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // Set the start date to the beginning of today

    const query = Attendance.find({
      date: { $gte: startDate },
      classParticipants: { $exists: true, $not: { $size: 0 } }, // Filter by date within the specified month and ensure classParticipants array exists and is not empty
    })
      .sort({ date: "asc", startTime: "asc" })
      .limit(10)
      .lean()
      .select("_id date ageGroup startTime endTime link")
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "studentsPresent",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        select: "_id class day zoomLink",
        model: Classes,
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data: any[] = await query;

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: AttendanceType) => {
      return {
        ...d,
        _id: d._id?.toString(),
        classParticipants: d?.classParticipants?.map((single) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        class: {
          ...d.class,
          _id: d.class._id?.toString(),
        },
      };
    });

    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchWeeklyAttendances({
  StartOfWeek,
  EndOfWeek,
  ageGroup,
}: {
  StartOfWeek: string;
  EndOfWeek: string;
  ageGroup: AgeGroupType;
}) {
  try {
    connectDB();

    const userInfo = (await authUserClerk()) as ParentType;

    if (!userInfo) {
      throw new Error("Unauthorized");
    }

    const startDate = new Date(StartOfWeek); // Note: Month is 0-indexed
    // Adjust the endDate to represent the last millisecond of Friday
    const endDate = dayjs(EndOfWeek).endOf("day").toDate(); // Adjusted to include the full day of the end date
    endDate.setHours(23, 59, 59, 999);

    console.log(StartOfWeek);
    console.log(endDate.toDateString());

    const query = Attendance.find({
      ageGroup,
      date: { $gte: startDate, $lte: endDate },
    })
      .sort({ date: "asc", startTime: "asc" })
      .lean()
      .select(
        "_id date ageGroup startTime endTime link studentsPresent studentsNotPresent"
      )
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        select: "_id class",
        model: Classes,
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data: any[] = await query;

    console.log(data);

    const arrToIdString: AttendanceType[] = data.map((d: AttendanceType) => {
      return {
        ...d,
        _id: d._id?.toString(),
        classParticipants: d?.classParticipants?.map((single) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        class: {
          ...d.class,
          _id: d.class._id?.toString(),
        },
      };
    });

    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchStudentAttendances({
  studentId,
}: {
  studentId: string;
}) {
  try {
    connectDB();

    const query = Student.findById(studentId)
      .lean()
      .select("_id classSchedule")
      .exec();

    const data: any = await query;
    console.log("object");
    console.log(data);

    const attendancePromises: any[] = data.classSchedule.map(
      (attendanceId: string) => {
        return Attendance.findById(attendanceId)
          .sort({ date: "asc", startTime: "asc" })
          .select("_id date ageGroup startTime endTime link studentsPresent")
          .populate({
            path: "classParticipants",
            select: "_id name",
            model: Student,
          })
          .populate({
            path: "studentsPresent",
            select: "_id name",
            model: Student,
          })
          .populate({
            path: "class",
            select: "_id class",
            model: Classes,
          })
          .populate({
            path: "materials",
            select: "_id filename url available type",
            model: Material,
          })
          .lean()
          .exec();
      }
    );

    const attendanceData: any[] = await Promise.all(attendancePromises);
    attendanceData.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      if (a.startTime < b.startTime) return -1;
      if (a.startTime > b.startTime) return 1;
      return 0;
    });

    console.log(attendanceData);

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = attendanceData.map(
      (d: AttendanceType) => {
        return {
          ...d,
          _id: d._id?.toString(),
          classParticipants: d?.classParticipants?.map((single) => {
            return {
              ...single,
              _id: single._id?.toString(),
            };
          }),
          studentsPresent: d?.studentsPresent?.map((single) => {
            return {
              ...single,
              _id: single._id?.toString(),
            };
          }),
          class: {
            ...d.class,
            _id: d.class._id?.toString(),
          },
        };
      }
    );

    console.log(arrToIdString);
    // const arrToIdString: any[] = [];

    return arrToIdString;
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchForYouAttendances({
  year,
  month,
  ageGroup,
}: {
  year: number;
  month: number;
  ageGroup: AgeGroupType;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const startDate = new Date(year, month, 1); // Note: Month is 0-indexed
    const endDate = new Date(year, month + 2, 0);
    endDate.setHours(23, 59, 59, 999);

    console.log(startDate, endDate);

    const query = Attendance.find({
      ageGroup,
      date: { $gte: startDate, $lte: endDate }, // Filter by date within the specified month
    })
      .sort({ date: "asc", startTime: "asc" })
      .lean()
      .select("_id date startTime endTime ageGroup zoomLink")
      .populate({
        path: "class",
        model: Classes,
        select: "_id class",
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data = await query;

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: {
        ...d.class,
        _id: d.class._id.toString(),
      },
    }));
    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchConnectionAttendances({
  year,
  month,
  ageGroup,
}: {
  year: number;
  month: number;
  ageGroup: AgeGroupType;
}) {
  try {
    connectDB();

    // const skipAmount = (pageNumber - 1) * pageSize;

    const startDate = new Date(year, month, 1); // Note: Month is 0-indexed
    const endDate = new Date(year, month + 1, 0);
    endDate.setHours(23, 59, 59, 999);

    // console.log(startDate, endDate);

    const query = Attendance.find({
      ageGroup,
      date: { $gte: startDate, $lte: endDate }, // Filter by date within the specified month
    })
      .sort({ date: "asc", startTime: "asc" })
      .lean()
      .select("_id date startTime endTime ageGroup zoomLink")
      .populate({
        path: "classParticipants",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "studentsPresent",
        select: "_id name",
        model: Student,
      })
      .populate({
        path: "class",
        model: Classes,
        select: "_id class",
      })
      .exec();

    const totalCount = await Attendance.countDocuments({});
    const data = await query;

    // Convert _id to string in the results
    const arrToIdString: AttendanceType[] = data.map((d: any) => {
      return {
        ...d,
        _id: d._id?.toString(),
        classParticipants: d?.classParticipants?.map((single: any) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        studentsPresent: d?.studentsPresent?.map((single: any) => {
          return {
            ...single,
            _id: single._id?.toString(),
          };
        }),
        class: {
          ...d.class,
          _id: d.class._id?.toString(),
        },
      };
    });
    console.log(arrToIdString);
    return { attendances: arrToIdString, totalCount };
  } catch (error: any) {
    throw new Error("Error in fetching attendances", error.message);
  }
}

export async function fetchFilterAttendances({
  pageNumber,
  pageSize,
  filter,
}: {
  pageNumber: number;
  pageSize: number;
  filter: string;
}) {
  try {
    connectDB();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const skipAmount = (pageNumber - 1) * pageSize;

    let dateFilter = {};

    if (filter === "today") {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);

      filter = "ongoing";
      dateFilter = { date: { $gte: now, $lt: tomorrow } };
    } else if (filter === "upcoming") {
      filter = "ongoing";
      const today = new Date();
      dateFilter = { date: { $gt: today } };
    } else if (filter === "past") {
      filter = "ongoing";
      dateFilter = { date: { $lt: now } };
    }

    const query = Attendance.find({
      classAttendanceStatus: filter,
      ...dateFilter,
    })
      .sort({ date: "asc" })
      .skip(skipAmount)
      .limit(pageSize)
      .lean()
      .select(
        "_id startTime endTime date isClassCancelled classAttendanceType classAttendanceStatus"
      )
      .populate({
        path: "class",
        model: Classes,
        select: "_id class zoomLink ageGroup",
        populate: {
          path: "participants",
          model: Student,
          select: "_id name",
        },
      })
      .populate({ path: "studentsPresent", model: Student, select: "_id name" })
      .populate({
        path: "studentsNotPresent",
        model: Student,
        select: "_id name",
      })
      .populate({
        path: "specialClassParticipants",
        model: Student,
        select: "_id name",
      })
      .populate({
        path: "materials",
        model: Material,
        select: "_id",
      })
      .exec();

    const data = await query;
    const arrToIdString: AttendanceType[] = data.map((d: any) => ({
      ...d,
      _id: d._id.toString(),
      class: {
        ...d.class,
        _id: d._id.toString(),
      },
    }));

    return { attendances: arrToIdString };
  } catch (error: any) {
    throw new Error("Error in fetching pending attendances", error.message);
  }
}

export async function fetchMateriaByAttendanceId(attendance: AttendanceType) {
  try {
    connectDB();

    const query = Material.find({ attendance: attendance })
      .sort({ addedDate: "desc" })
      .lean()
      .select("_id filename materials classDate addedDate type")
      .exec();

    const materials = await query;

    return materials;
  } catch (error) {
    throw new Error(`Error in fetching materials by attendance ID`);
  }
}

export async function fetchParticipants(students: StudentType[]) {
  try {
    connectDB();

    const studentss = await Student.find(
      { _id: { $in: students } },
      "_id name age participants"
    ).exec();

    return studentss;
  } catch (error) {
    throw new Error("Error in fetching participants by attendance ID");
  }
}

export async function updateStudentYes({
  studentId,
  attendanceId,
}: {
  studentId: string;
  attendanceId: string;
}) {
  try {
    connectDB();

    const newData = await Attendance.findByIdAndUpdate(attendanceId, {
      $push: { studentsPresent: studentId },
    });

    if (!newData) {
      console.log("No Attendance Found");
      throw new Error("No Attendance Found");
    }

    console.log(newData);

    revalidatePath("/calendar");

    return { message: "Student Confirmed Successfully" };
  } catch (error: any) {
    throw new Error("Error in updating student attendance", error.message);
  }
}

export async function updateStudentNo({
  studentId,
  attendanceId,
}: {
  studentId: string;
  attendanceId: string;
}) {
  try {
    connectDB();

    const newData = await Attendance.findByIdAndUpdate(attendanceId, {
      $pull: { studentsPresent: studentId },
    });

    if (!newData) {
      console.log("No Attendance Found");
      throw new Error("No Attendance Found");
    }

    return { message: "Student Confirmed Successfully" };
  } catch (error: any) {
    throw new Error("Error in updating student attendance", error.message);
  }
}

export async function updateClassSchedule({
  childId,
  newAttendanceId,
}: {
  childId: string;
  newAttendanceId: string;
}) {
  try {
    connectDB();

    const userInfo = (await authUserClerk()) as ParentType;

    if (!userInfo) {
      throw new Error("Unauthorized");
    }

    const student = await Student.findById(childId)
      .select("_id classSchedule")
      .exec();

    if (!student) {
      throw new Error("No Student");
    }

    const classSchedule = [...student.classSchedule, newAttendanceId];

    await Student.findByIdAndUpdate(childId, {
      classSchedule,
    });
    const newData = await Attendance.findByIdAndUpdate(newAttendanceId, {
      $push: { classParticipants: childId },
    });

    return { message: "Student updated schedule" };
  } catch (error: any) {
    throw new Error("Error in updating student schedule", error.message);
  }
}

export async function updateRemoveClass({
  childId,
  oldAttendance,
}: {
  childId: string;
  oldAttendance: string;
}) {
  try {
    connectDB();

    const userInfo = (await authUserClerk()) as ParentType;

    if (!userInfo) {
      throw new Error("Unauthorized");
    }

    const student = await Student.findById(childId)
      .select("_id classSchedule")
      .exec();

    if (!student) {
      throw new Error("No Student");
    }

    const classSchedule = student.classSchedule.filter((d: any) => {
      return d.toString() !== oldAttendance;
    });
    console.log(classSchedule);

    await Student.findByIdAndUpdate(childId, {
      classSchedule,
    });
    const newData = await Attendance.findByIdAndUpdate(oldAttendance, {
      $pull: { classParticipants: childId },
    });

    return { message: "Student updated schedule" };
  } catch (error: any) {
    throw new Error("Error in updating student schedule", error.message);
  }
}

export async function updateClassScheduleIndex({
  childId,
  newAttendanceId,
  pastAttendanceId,
}: {
  childId: string;
  newAttendanceId: string;
  pastAttendanceId: string;
}) {
  try {
    connectDB();

    const userInfo = (await authUserClerk()) as ParentType;

    if (!userInfo) {
      throw new Error("Unauthorized");
    }

    const student: any = await Student.findById(childId)
      .select("_id classSchedule")
      .lean()
      .exec();

    if (!student) {
      throw new Error("No Student");
    }

    const temp = student.classSchedule.filter((a: AttendanceType) => {
      return a._id?.toString() !== pastAttendanceId;
    });
    const classSchedule = [...temp, newAttendanceId];

    await Student.findByIdAndUpdate(childId, {
      classSchedule,
    });

    // PAST ATTENCANCE
    const pastAttendance: any = await Attendance.findById(pastAttendanceId)
      .select("_id date")
      .populate({ path: "class", model: Classes, select: "class" })
      .populate({ path: "classParticipants", model: Student, select: "name" })
      .lean()
      .exec();

    const newPastParticipants = pastAttendance?.classParticipants?.filter(
      (d: any) => {
        if (d._id?.toString() !== childId) return d;
      }
    );
    await Attendance.findByIdAndUpdate(pastAttendanceId, {
      classParticipants: newPastParticipants,
    });

    // NEW ATTENDANCE
    const newAttendance: any = await Attendance.findById(newAttendanceId)
      .select("_id date")
      .populate({ path: "class", model: Classes, select: "class" })
      .populate({ path: "classParticipants", model: Student, select: "name" })
      .lean()
      .exec();
    // console.log(newAttendance);

    const newNextParticipants = [...newAttendance.classParticipants, childId];
    await Attendance.findByIdAndUpdate(newAttendanceId, {
      classParticipants: newNextParticipants,
    });

    return { message: "Student updated schedule" };
  } catch (error: any) {
    throw new Error("Error in updating student schedule", error.message);
  }
}
