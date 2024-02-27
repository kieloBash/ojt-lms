import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { AgeGroupType } from "@/lib/interfaces/class.interface";
import { CLASSES_BY_LEVEL } from "@/utils/constants/ClassesByLevel";

export function MissedAlert({
  open,
  openChange,
  classLevel,
}: {
  open: boolean;
  openChange: (e: boolean) => void;
  classLevel: AgeGroupType;
}) {
  const info = CLASSES_BY_LEVEL[classLevel];
  return (
    <AlertDialog open={open} onOpenChange={openChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You have missed enrolling for a class this week.
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Please enroll for your next week's class schedule. End of scheduling a class is every Thursday of the week or if no more available classes are scheduled for the rest of the week`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col items-center justify-center gap-2 mt-6">
          <Label>{classLevel} Weekly Class Schedule</Label>
          <ul className="flex flex-col items-center justify-center">
            {info?.map((cl, index) => {
              return (
                <li
                  className="grid w-full grid-cols-2 gap-8 text-sm text-left"
                  key={index}
                >
                  <span className="font-bold text-left">{cl.day}</span>
                  <p className="text-right">{cl.time}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>OK</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
