import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import React from "react"

export default function Dialog({
  trigger,
  title,
  description,
  children,
  className,
}: {
  trigger: string
  title: string
  description: string
  className: string
  children: React.ReactNode
}) {
  return (
    <ShadcnDialog>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          {children}
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  )
}
