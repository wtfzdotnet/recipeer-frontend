import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog } from './dialog';
import { Button } from '../../atoms/button';
import { Input } from '../../atoms/input';
import { Alert } from '../../molecules/alert';
import { Trash2, Save, Upload, Settings } from 'lucide-react';

const meta = {
  title: 'Organisms/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dialog organism for modal interactions. Combines atoms and molecules to create complete dialog experiences with business logic and user interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Dialog title',
    },
    description: {
      control: 'text',
      description: 'Dialog description',
    },
    confirmText: {
      control: 'text',
      description: 'Confirmation button text',
    },
    cancelText: {
      control: 'text',
      description: 'Cancel button text',
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show footer buttons',
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    title: 'Confirm Action',
    description: 'Are you sure you want to continue?',
    onConfirm: () => console.log('Confirmed'),
    onCancel: () => console.log('Cancelled'),
  },
};

export const DeleteRecipe: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <Dialog
        trigger={
          <Button variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Recipe
          </Button>
        }
        title="Delete Recipe"
        description="This action cannot be undone. This will permanently delete your recipe and remove it from your collection."
        confirmText="Delete Recipe"
        cancelText="Keep Recipe"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Recipe deleted');
          setOpen(false);
        }}
        onCancel={() => {
          console.log('Delete cancelled');
          setOpen(false);
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Destructive dialog for deleting a recipe with proper warning messaging.',
      },
    },
  },
};

export const SaveRecipe: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [recipeName, setRecipeName] = useState('');
    
    return (
      <Dialog
        trigger={
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Recipe
          </Button>
        }
        title="Save Recipe"
        description="Choose a name for your recipe to save it to your collection."
        confirmText="Save Recipe"
        cancelText="Cancel"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Recipe saved:', recipeName);
          setOpen(false);
          setRecipeName('');
        }}
        onCancel={() => {
          console.log('Save cancelled');
          setOpen(false);
          setRecipeName('');
        }}
      >
        <div className="space-y-4">
          <Input
            label="Recipe Name"
            placeholder="Enter recipe name..."
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            required
          />
        </div>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Dialog with form content for saving a recipe with user input.',
      },
    },
  },
};

export const RecipeUpload: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    
    const handleUpload = () => {
      setUploadStatus('uploading');
      // Simulate upload process
      setTimeout(() => {
        setUploadStatus(Math.random() > 0.3 ? 'success' : 'error');
      }, 2000);
    };
    
    return (
      <Dialog
        trigger={
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Recipe
          </Button>
        }
        title="Upload Recipe Image"
        description="Add a photo to make your recipe more appealing to other cooks."
        open={open}
        onOpenChange={setOpen}
        showFooter={false}
      >
        <div className="space-y-4">
          {uploadStatus === 'idle' && (
            <>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-sm text-gray-600">
                  Drag and drop an image, or click to select
                </p>
                <Button variant="outline" className="mt-4" onClick={handleUpload}>
                  Select Image
                </Button>
              </div>
            </>
          )}
          
          {uploadStatus === 'uploading' && (
            <div className="text-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Uploading your image...</p>
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <>
              <Alert variant="success" title="Upload Complete!" description="Your recipe image has been uploaded successfully." />
              <div className="flex justify-end space-x-2">
                <Button 
                  onClick={() => {
                    setOpen(false);
                    setUploadStatus('idle');
                  }}
                >
                  Done
                </Button>
              </div>
            </>
          )}
          
          {uploadStatus === 'error' && (
            <>
              <Alert variant="destructive" title="Upload Failed" description="There was an error uploading your image. Please try again." />
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => setUploadStatus('idle')}
                >
                  Try Again
                </Button>
                <Button 
                  onClick={() => {
                    setOpen(false);
                    setUploadStatus('idle');
                  }}
                >
                  Skip
                </Button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Complex dialog with multiple states for recipe image upload workflow.',
      },
    },
  },
};

export const RecipeSettings: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState({
      isPublic: true,
      allowComments: true,
      difficulty: 'medium',
      servings: 4,
    });
    
    return (
      <Dialog
        trigger={
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Recipe Settings
          </Button>
        }
        title="Recipe Settings"
        description="Configure how your recipe is shared and displayed."
        confirmText="Save Settings"
        cancelText="Cancel"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('Settings saved:', settings);
          setOpen(false);
        }}
      >
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Make Recipe Public</h4>
                <p className="text-sm text-muted-foreground">
                  Allow other users to discover and save your recipe
                </p>
              </div>
              <Button
                variant={settings.isPublic ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings(prev => ({ ...prev, isPublic: !prev.isPublic }))}
              >
                {settings.isPublic ? 'Public' : 'Private'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Allow Comments</h4>
                <p className="text-sm text-muted-foreground">
                  Let users comment on your recipe
                </p>
              </div>
              <Button
                variant={settings.allowComments ? "default" : "outline"}
                size="sm"
                onClick={() => setSettings(prev => ({ ...prev, allowComments: !prev.allowComments }))}
              >
                {settings.allowComments ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Difficulty Level</label>
              <div className="flex space-x-2">
                {['easy', 'medium', 'hard'].map((level) => (
                  <Button
                    key={level}
                    variant={settings.difficulty === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSettings(prev => ({ ...prev, difficulty: level }))}
                  >
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-medium">Servings</label>
              <Input
                type="number"
                min="1"
                max="20"
                value={settings.servings}
                onChange={(e) => setSettings(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
              />
            </div>
          </div>
        </div>
      </Dialog>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dialog with complex form controls for configuring recipe properties.',
      },
    },
  },
};

export const WithoutFooter: Story = {
  args: {
    trigger: <Button variant="outline">Custom Dialog</Button>,
    title: 'Custom Content',
    description: 'This dialog has custom content without default footer buttons.',
    showFooter: false,
    children: (
      <div className="space-y-4">
        <p>Custom dialog content goes here.</p>
        <div className="flex justify-center">
          <Button>Custom Action</Button>
        </div>
      </div>
    ),
  },
};

export const OnlyTitle: Story = {
  args: {
    trigger: <Button variant="outline">Simple Dialog</Button>,
    title: 'Simple Title',
    children: <p>Dialog content without description.</p>,
    confirmText: 'Got it',
    onConfirm: () => console.log('Acknowledged'),
  },
};