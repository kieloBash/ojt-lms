import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function MissedAlert({
  open,
  openChange,
}: {
  open: boolean;
  openChange: (e: boolean) => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={openChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            You have missed enrolling for a class this week.
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Please enroll for your next week's class schedule. End of scheduling a class is on every Wednesday of the week`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>OK</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
