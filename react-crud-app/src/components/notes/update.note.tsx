import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import Zod from "zod";

import { updateOne } from "../../api/noteApi";
import { INote } from "../../api/types";
import { LoadingButton } from "../LoadingButton";

type IUpdateNoteProps = {
  note: INote;
  setOpenNoteModal: (open: boolean) => void;
};

const updateNoteSchema = Zod.object({
  title: Zod.string().min(1, "Title is required"),
  content: Zod.string().min(1, "Content is required"),
});

export type UpdateNoteInput = Zod.TypeOf<typeof updateNoteSchema>;

const UpdateNote: React.FC<IUpdateNoteProps> = ({ note, setOpenNoteModal }) => {
  const methods = useForm<UpdateNoteInput>({
    resolver: zodResolver(updateNoteSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  React.useEffect(() => {
    if (note) {
      methods.reset(note);
    }
  }, []);
  const queryClient = useQueryClient();
  const { mutate: updateNote } = useMutation({
    mutationFn: ({ noteId, note }: { noteId: string; note: UpdateNoteInput }) =>
      updateOne(noteId, note),
    onSuccess(data) {
      queryClient.invalidateQueries(["getNotes"]);
      setOpenNoteModal(false);
      toast("Note updated successfully", {
        type: "success",
        position: "top-right",
      });
    },
    onError(error: any) {
      setOpenNoteModal(false);
      const responseMsg =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(responseMsg, {
        type: "error",
        position: "top-right",
      });
    },
  });
  const onSubmitHandler: SubmitHandler<UpdateNoteInput> = async (data) => {
    updateOne(note.id, data);
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl text-ct-dark-600 font-semibold">Update Note</h2>
        <div
          onClick={() => setOpenNoteModal(false)}
          className="text-2xl text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 ml-auto inline-flex items-center cursor-pointer"
        >
          <i className="bx bx-x"></i>
        </div>
      </div>{" "}
      <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Title
          </label>
          <input
            className={twMerge(
              `appearance-none border border-gray-400 rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors["title"] && "border-red-500"}`
            )}
            {...methods.register("title")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2 invisible`,
              `${errors["title"] && "visible"}`
            )}
          >
            {errors["title"]?.message as string}
          </p>
        </div>
        <div className="mb-2">
          <label className="block text-gray-700 text-lg mb-2" htmlFor="title">
            Content
          </label>
          <textarea
            className={twMerge(
              `appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-2 leading-tight focus:outline-none`,
              `${errors.content ? "border-red-500" : "border-gray-400"}`
            )}
            rows={6}
            {...register("content")}
          />
          <p
            className={twMerge(
              `text-red-500 text-xs italic mb-2`,
              `${errors.content ? "visible" : "invisible"}`
            )}
          >
            {errors.content && errors.content.message}
          </p>
        </div>
        <LoadingButton loading={false}>Update Note</LoadingButton>
      </form>
    </section>
  );
};

export default UpdateNote;
