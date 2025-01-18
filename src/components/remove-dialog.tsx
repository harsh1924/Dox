"use client"

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from 'sonner'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { AlertDescription } from "./ui/alert";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel"

interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
    const router = useRouter();
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are You Sure?
                    </AlertDialogTitle>
                    <AlertDescription>
                        This action cannot be undone. This will permanently delete your document.
                    </AlertDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            remove({ id: documentId })
                                .then(() => {
                                    toast.success("Document Removed Successfully");
                                    router.push("/");
                                })
                                .catch(() => toast.error('Something went wrong'))
                                .finally(() => {
                                    setIsRemoving(false);
                                    // router.push("/");
                                });
                        }} >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}