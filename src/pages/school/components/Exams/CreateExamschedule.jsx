import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../../../styles/school/exams/createexamschedule.scss";
import Button from "../../../../components/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useClass } from "../../../../CustomHooks/useClass";
import { useSubject } from "../../../../CustomHooks/useSubject";
import { useSchedule } from "../../../../CustomHooks/useSchedule";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateExamschedule = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { classes, loading: classLoading, error: classError, fetch: fetchClasses } = useClass();
  const { subject, loading: subjectLoading, error: subjectError, fetch: fetchSubjects } = useSubject();
  const { add: addSchedule } = useSchedule();

  useEffect(() => {
    fetchClasses().unwrap();
    fetchSubjects().unwrap();
  }, [fetchClasses, fetchSubjects]);

  useEffect(() => {
    if (classError) toast.error(`Class Error: ${classError}`);
    if (subjectError) toast.error(`Subject Error: ${subjectError}`);
  }, [classError, subjectError]);

  const uniqueClasses = Array.from(new Map(classes.map(item => [item.class_num, item])).values());
  const uniqueSubjects = Array.from(new Map(subject.map(item => [item.subject_name, item])).values());

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        start_time: data.startTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        end_time: data.endTime?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      await addSchedule(formattedData).unwrap();
      toast.success(" Exam schedule created successfully!");
      reset();
    } catch (err) {
      toast.error(`Failed to create schedule: ${err?.message || "Unknown error"}`);
    }
  };

  return (
    <div className="create-exam-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="font-bold mb-6 text-center">📅 Create Exam Schedule</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-sm shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Class */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">Class</label>
            <select
              {...register("class_id", { required: "Class is required" })}
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            >
              <option value="">Select Class</option>
              {uniqueClasses.map(item => (
                <option key={item._id} value={item._id}>
                  {item.class_num}
                </option>
              ))}
            </select>
            {errors.class_name && <span className="text-red-500 text-sm">{errors.class_name.message}</span>}
          </div>

          {/* Section */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">Section</label>
            <select
              {...register("section", { required: "Section is required" })}
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            >
              <option value="">Select Section</option>
              {classes.map(item => (
                <option key={item._id} value={item.class_text}>
                  {item.class_text}
                </option>
              ))}
            </select>
            {errors.section && <span className="text-red-500 text-sm">{errors.section.message}</span>}
          </div>

          {/* Subject */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">Subject</label>
            <select
              {...register("subject_id", { required: "Subject is required" })}
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            >
              <option value="">Select Subject</option>
              {uniqueSubjects.map(item => (
                <option key={item._id} value={item._id}>
                  {item.subject_name}
                </option>
              ))}
            </select>
            {errors.subject && <span className="text-red-500 text-sm">{errors.subject.message}</span>}
          </div>

          {/* Exam Date */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">Exam Date</label>
            <input
              type="date"
              {...register("exam_date", { required: "Exam Date is required" })}
              className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
            />
            {errors.exam_date && <span className="text-red-500 text-sm">{errors.exam_date.message}</span>}
          </div>

          {/* Start Time */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">Start Time</label>
            <Controller
              name="startTime"
              control={control}
              rules={{ required: "Start Time is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select start time"
                  className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
                />
              )}
            />
            {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime.message}</span>}
          </div>

          {/* End Time */}
          <div>
            <label className="form-label block text-gray-700 font-medium mb-3">End Time</label>
            <Controller
              name="endTime"
              control={control}
              rules={{ required: "End Time is required" }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={1}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select end time"
                  className="form-input w-full border border-gray-300 px-2 py-1 rounded-sm"
                />
              )}
            />
            {errors.endTime && <span className="text-red-500 text-sm">{errors.endTime.message}</span>}
          </div>
        </div>

        <div className="text-center mt-6">
          <Button type="submit" className="schedule-create-btn">
            {classLoading || subjectLoading ? "Loading..." : "Create Schedule"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateExamschedule;
