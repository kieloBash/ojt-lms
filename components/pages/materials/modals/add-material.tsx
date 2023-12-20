"use client";

// UI
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  gradeLevel: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one gradeLevel.",
    }),
});

// BACKEND
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GRADE_LEVELS } from "@/utils/constants/data/gradeLevels";
import { createNewMaterial } from "@/lib/actions/materials.action";
import { AgeGroupType } from "@/lib/interfaces/class.interface";

export function AddMaterialModal() {
  const [uploadingFile, setUploadFile] = useState<File | null>();
  const [uploading, setUploading] = useState(false);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gradeLevel: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    uploadImageMutation.mutate(data.gradeLevel);
  }

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  const uploadImage = async (gradeLevel: string[]) => {
    if (!uploadingFile) return null;
    setUploading(true);
    const storageRef = ref(storage, `materials/${uploadingFile.name}`);
    const snapshot = await uploadBytes(storageRef, uploadingFile);
    const downloadURL = await getDownloadURL(storageRef);
    return { downloadURL, gradeLevel };
  };

  const uploadImageMutation = useMutation({
    mutationFn: (gradeLevel: string[]) => uploadImage(gradeLevel),
    onError: (err) => {
      console.log(err);
    },
    onSuccess: async (res) => {
      if (!res || !uploadingFile) return null;

      const result = await createNewMaterial({
        attendanceId: "",
        filename: uploadingFile.name,
        url: res.downloadURL,
        gradeLevel: res.gradeLevel,
        type: uploadingFile.type,
      });

      if (!result) return null;
      setUploading(false);
      setUploadFile(null);
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: [`materials`],
      });
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
          <DialogDescription>
            Upload a material of either image or files.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              File
            </Label>
            <Input
              onChange={handleFileChange}
              id="name"
              type="file"
              className="col-span-3"
            />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="gradeLevel"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Grade Level</FormLabel>
                    <FormDescription>
                      Select the grade levels which the materials will be
                      available to.
                    </FormDescription>
                  </div>
                  {GRADE_LEVELS.map((item) => (
                    <FormField
                      key={item.level}
                      control={form.control}
                      name="gradeLevel"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.level}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.level)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.level,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.level
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={!uploadingFile || uploading}
                type="submit"
                // onClick={() => uploadImageMutation.mutate()}
              >
                {uploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Upload</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
