import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function AskAlert({
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
            You have not enrolled yet for a class this week
          </AlertDialogTitle>
          <AlertDialogDescription>
            {`Please enroll now for you may miss enrolling for this week. End of scheduling a class is on every Wednesday of the week`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
