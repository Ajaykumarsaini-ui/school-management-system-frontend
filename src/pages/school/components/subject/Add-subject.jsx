import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import "../../../../styles/school/subjects/addsubjects.scss";
import Button from "../../../../components/Button";
import { useSubject } from "../../../../CustomHooks/useSubject";
import { useTeachers } from "../../../../CustomHooks/useTeachers";
import { useClass } from "../../../../CustomHooks/useClass";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubjectForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    teacher,
    loading: loadingTeachers,
    error: errorTeachers,
    fetch: fetchTeachers,
  } = useTeachers();

  const {
    classes,
    loading: loadingClasses,
    error: errorClasses,
    fetch: fetchClasses,
  } = useClass();

  const {
    add: addSubject,
    loading: loadingSubject,
    error: errorSubject,
  } = useSubject();

  useEffect(() => {
    fetchTeachers();
    fetchClasses();
  }, [fetchTeachers, fetchClasses]);

  useEffect(() => {
    if (loadingTeachers || loadingClasses) {
      toast.dismiss();
      toast.info("Loading data...");
    }
  }, [loadingTeachers, loadingClasses]);

  useEffect(() => {
    if (errorTeachers) {
      toast.dismiss();
      toast.error(`Teacher error: ${errorTeachers}`);
    }
    if (errorClasses) {
      toast.dismiss();
      toast.error(`Class error: ${errorClasses}`);
    }
  }, [errorTeachers, errorClasses]);

  useEffect(() => {
    if (errorSubject) {
      toast.dismiss();
      toast.error(`Subject error: ${errorSubject}`);
    }
  }, [errorSubject]);

  const uniqueClasses = Array.from(
    new Map(classes.map((item) => [item.class_num , item])).values()
  );

  const uniqueTeachers = Array.from(
    new Map(teacher.map((item) => [item.teacher_name, item])).values()
  );

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("subject_name", data.subject_name);
    formData.append("subject_code", data.subject_code);
    formData.append("addclass", data.addclass);
    formData.append("teacher", data.teacher);
    formData.append("subjectType", data.subjectType);
    formData.append("syllabusFile", data.syllabusFile[0]);

    try {
      await addSubject(formData).unwrap();
      toast.dismiss();
      toast.success("Subject added successfully!");
      reset();
    } catch (err) {
      toast.dismiss();
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className="form-wrapper max-w-xl mx-auto p-6 bg-white rounded-md shadow-md mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Add Subject</h2>
      {/* <ToastContainer autoClose={3000} position="top-right" /> */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Subject Name
          </label>
          <input
            type="text"
            placeholder="Enter subject name"
            {...register("subject_name", { required: "Name is required" })}
            className="input w-full px-3 py-1 border rounded-sm"
          />
          {errors.subject_name && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.subject_name.message}
            </p>
          )}
        </div>

        <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Subject Code
          </label>
          <input
            type="text"
            placeholder="Enter code (e.g., CMP401)"
            {...register("subject_code", { required: "Code is required" })}
            className="input w-full px-3 py-1 border rounded-sm"
          />
          {errors.subject_code && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.subject_code.message}
            </p>
          )}
        </div>

        <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Class
          </label>
          <select
            {...register("addclass", { required: "Class is required" })}
            className="input w-full px-3 py-1 border rounded-sm"
          >
            <option value="">Select a class</option>
            {uniqueClasses.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {classItem.class_num}
              </option>
            ))}
          </select>
          {errors.addclass && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.addclass.message}
            </p>
          )}
        </div>

        {/* <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Teacher
          </label>
          <select
            {...register("teacher", { required: "Teacher is required" })}
            className="input w-full px-3 py-1 border rounded-sm"
          >
            <option value="">Select a teacher</option>
            {uniqueTeachers.map((teacherdata) => (
              <option key={teacherdata._id} value={teacherdata._id}>
                {teacherdata.teacher_name}
              </option>
            ))}
          </select>
          {errors.teacher && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.teacher.message}
            </p>
          )}
        </div> */}

        <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Subject Type
          </label>
          <select
            {...register("subjectType", { required: "Subject type is required" })}
            className="input w-full px-3 py-1 border rounded-sm"
          >
            <option value="">Select type</option>
            <option value="Core">Core</option>
            <option value="Elective">Elective</option>
          </select>
          {errors.subjectType && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.subjectType.message}
            </p>
          )}
        </div>

        <div>
          <label className="label block text-gray-700 pb-2 font-medium">
            Syllabus File
          </label>
          <input
            type="file"
            {...register("syllabusFile", { required: "Syllabus file is required" })}
            className="input cursor-pointer w-full px-3 py-1 border rounded-sm"
          />
          {errors.syllabusFile && (
            <p className="error text-red-500 text-sm mt-1">
              {errors.syllabusFile.message}
            </p>
          )}
        </div>

        <div className="text-center py-3">
          <Button type="submit" className="schedule-create-btn cursor-pointer">
            {loadingSubject ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddSubjectForm;
