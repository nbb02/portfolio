import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogClose } from "@radix-ui/react-dialog"
import { Button } from "./ui/button"
import React from "react"

export default function Dialog({
  trigger,
  title,
  description,
  children,
  className,
  open,
  close,
  onOpenChange,
}: {
  trigger: string | React.ReactNode
  title: string
  description: string
  className?: string
  children: React.ReactNode
  open?: boolean
  close?: () => void
  onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger className={className}>{trigger}</DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={close}>
              Close
            </Button>
          </DialogClose>
          {children}
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  )
}
