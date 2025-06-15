import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/atoms'

const meta: Meta = {
  title: 'Test/Nuclear Dialog Test',
  parameters: {
    docs: {
      description: {
        component: 'Nuclear approach test for dialog z-index in Storybook.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const NuclearTest: Story = {
  name: 'Nuclear Z-Index Test',
  render: () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-card border p-4 rounded-lg z-10 relative">
            <h3 className="font-semibold">Background Content z-10</h3>
            <p className="text-sm text-muted-foreground">This should be behind dialog</p>
          </div>
          <div className="bg-card border p-4 rounded-lg z-50 relative">
            <h3 className="font-semibold">Background Content z-50</h3>
            <p className="text-sm text-muted-foreground">This should be behind dialog</p>
          </div>
          <div className="bg-card border p-4 rounded-lg z-[100] relative">
            <h3 className="font-semibold">Background Content z-100</h3>
            <p className="text-sm text-muted-foreground">This should be behind dialog</p>
          </div>
          <div className="bg-card border p-4 rounded-lg z-[999] relative">
            <h3 className="font-semibold">Background Content z-999</h3>
            <p className="text-sm text-muted-foreground">This should be behind dialog</p>
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>🚀 Test Nuclear Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuclear Z-Index Test</DialogTitle>
              <DialogDescription>
                This dialog should appear above ALL background content using maximum z-index values.
                If you can see this clearly with darkened overlay, the nuclear fix worked! 🎉
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 p-3 rounded">
                <p className="text-sm text-green-800 dark:text-green-200">
                  ✅ SUCCESS: Dialog is visible above all content!
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tests dialog with background content at various z-index levels using nuclear z-index approach.',
      },
    },
  },
}
