"use client";

import * as React from "react";

// UI
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronsUpDown, Loader2, PlusCircle } from "lucide-react";
import { StudentType } from "@/lib/interfaces/student.interface";
import { toast } from "@/components/ui/use-toast";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface ChildSwitcherProps extends PopoverTriggerProps {
  students: StudentType[];
  selectedChild: StudentType;
  parent: ParentType;
  handleSelectChild: (sel: StudentType) => void;
}

// FORM
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { calculateAge } from "@/utils/helpers/calculateAge";
import { ParentType } from "@/lib/interfaces/parent.interface";
import { createNewStudent } from "@/lib/actions/parent.action";
import { useQueryClient } from "@tanstack/react-query";
import { GRADE_LEVEL, getGradeLevel } from "@/utils/constants/data/gradeLevels";
import { AgeGroupType } from "@/lib/interfaces/class.interface";

const validation = z.object({
  child_name: z.string().min(1),
  gradeLevel: z.string().min(1),
});

export default function ChildSwitcher({
  students,
  selectedChild,
  handleSelectChild,
  className,
  parent,
}: ChildSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [child_bday, setchild_bday] = React.useState<string | undefined>();
  const [isLoading, setisLoading] = React.useState(false);
  const queryClient = useQueryClient();

  //FORM
  const form = useForm<z.infer<typeof validation>>({
    resolver: zodResolver(validation),
  });
  async function onSubmit(values: z.infer<typeof validation>) {
    setisLoading(true);
    const { child_name, gradeLevel } = values;
    const child_age = calculateAge(new Date(child_bday || ""));
    const newDataStudent: StudentType = {
      name: child_name,
      age: child_age,
      gradeLevel: gradeLevel as AgeGroupType,
      parent,
      status: "Enrolling",
      classSchedule: [],
    };
    const res = await createNewStudent({
      newDataStudent,
      parentId: parent?._id as string,
    });
    if (res.success) {
      toast({
        // variant: "success",
        title: "Successfully Added New Student",
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: [`classes:for-you`],
      });
      setShowNewTeamDialog(false);
      setisLoading(false);
    } else {
      toast({
        variant: "destructive",
        title: "Error in Adding New Student",
      });
      setisLoading(false);
    }
  }

  const [gradeOption, setGradeOption] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (child_bday) {
      const child_age = calculateAge(new Date(child_bday));
      const temp = getGradeLevel(child_age as number);
      setGradeOption(temp);
    }
  }, [child_bday]);

  if (students.length === 0) return null;

  // return null;

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "lg:w-[250px] xl:w-[250px] md:w-[250px] w-[80px] justify-between",
              className
            )}
          >
            <Avatar className="w-5 h-5 mr-2">
              <AvatarImage
                src={selectedChild?.profileURL || ""}
                alt={selectedChild?.name}
              />
              <AvatarFallback>{selectedChild?.name[0]}</AvatarFallback>
            </Avatar>
            <span className="hidden lg:flex xl:flex md:flex">
              {selectedChild.name}
            </span>
            <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          <Command>
            <CommandList>
              {students.map((single) => (
                <CommandItem
                  key={single._id}
                  onSelect={() => {
                    handleSelectChild(single);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <Avatar className="w-5 h-5 mr-2">
                    <AvatarImage
                      src={single?.profileURL || ""}
                      alt={single.name}
                      className="grayscale"
                    />
                    <AvatarFallback>{single?.name[0]}</AvatarFallback>
                  </Avatar>
                  {single.name} - {single.age}yrs. old
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedChild._id === single._id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandGroup>
                <DialogTrigger asChild>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      setShowNewTeamDialog(true);
                    }}
                  >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Add Student
                  </CommandItem>
                </DialogTrigger>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new student</DialogTitle>
          <DialogDescription>
            Add a new student to enroll in the Umonics.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="child_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="space-y-2">
                        <Label htmlFor="name">{`Child's full name`}</Label>
                        <Input id="name" placeholder="John Doe" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label htmlFor="plan">{`Child's date of birth`}</Label>
                <Input
                  id="dob"
                  type="date"
                  value={child_bday}
                  onChange={(e) => setchild_bday(e.target.value)}
                />
              </div>
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <div className="space-y-2">
                          <Label htmlFor="name">{`Child's Grade Level`}</Label>
                          <SelectTrigger className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-none shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-main-600 focus:border-transparent">
                            <SelectValue placeholder="Select a grade level for your child" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        {gradeOption.length === 0 ? (
                          <div className="w-full text-sm text-center">
                            No Options
                          </div>
                        ) : (
                          <>
                            {gradeOption.map((d: string) => {
                              const label =
                                GRADE_LEVEL[d as keyof typeof GRADE_LEVEL];
                              return (
                                <SelectItem key={d} value={d}>
                                  {label}
                                </SelectItem>
                              );
                            })}
                          </>
                        )}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowNewTeamDialog(false)}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} type="submit">
                  Continue
                  {isLoading && (
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
