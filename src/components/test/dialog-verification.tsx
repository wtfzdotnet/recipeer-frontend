import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/atoms'

/**
 * Simple dialog verification component to test the z-index fix
 * This should work out-of-the-box with no custom overrides needed
 */
export const DialogVerification: React.FC = () => {
  return (
    <div className="space-y-6 p-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dialog Verification Test</h2>
        <p className="text-sm text-muted-foreground">
          Testing that dialogs appear correctly above all content with the design system fix.
        </p>
      </div>

      {/* Background content with various z-index levels */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border p-4 rounded-lg z-10 relative">
          <h3 className="font-semibold">Card with z-10</h3>
          <p className="text-sm text-muted-foreground">Background content</p>
        </div>
        <div className="bg-card border p-4 rounded-lg z-20 relative">
          <h3 className="font-semibold">Card with z-20</h3>
          <p className="text-sm text-muted-foreground">Background content</p>
        </div>
        <div className="bg-card border p-4 rounded-lg z-30 relative">
          <h3 className="font-semibold">Card with z-30</h3>
          <p className="text-sm text-muted-foreground">Background content</p>
        </div>
        <div className="bg-card border p-4 rounded-lg z-40 relative">
          <h3 className="font-semibold">Card with z-40</h3>
          <p className="text-sm text-muted-foreground">Highest background content</p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Standard Dialog Test */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Standard Dialog</DialogTitle>
              <DialogDescription>
                This dialog should appear above all background content including the z-40 card.
                The overlay should be visible and the dialog should be fully interactive.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm">
                ✅ If you can see this dialog clearly with a darkened background, 
                the z-index fix is working correctly!
              </p>
            </div>
          </DialogContent>
        </Dialog>

        {/* Alert Dialog Test */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Open Alert</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
              <AlertDialogDescription>
                This alert dialog should also appear above all content.
                Both the overlay and content should be properly stacked.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
