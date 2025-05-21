// components/ConfirmDeleteModal.tsx
"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDeleteModal({
  open,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent className=" w-[90vw] sm:max-w-sm sm:w-full rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col px-8 sm:px-0 sm:flex-row gap-2 mt-4 items-center">
          <AlertDialogCancel asChild>
            <Button variant="outline" className="w-full sm:w-auto" onClick={onCancel}>
              No, Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" className="w-full bg-red-500   sm:w-auto" onClick={onConfirm}>
              Yes, Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
