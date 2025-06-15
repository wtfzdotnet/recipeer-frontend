import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/atoms/separator';
import { QuantityAdjuster } from '@/components/molecules/quantity-adjuster';
import { DifficultyIndicator } from '@/components/molecules/difficulty-indicator';
import { cn } from '@/lib/utils';

export interface RecipeFormData {
  title: string;
  description: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tags: string[];
  ingredients: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  instructions: string[];
  isPublic: boolean;
  allowComments: boolean;
  featuredImage?: string;
}

export interface RecipeFormProps {
  /** Initial form data */
  initialData?: Partial<RecipeFormData>;
  /** Form submission handler */
  onSubmit: (data: RecipeFormData) => void | Promise<void>;
  /** Whether the form is in loading state */
  loading?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * RecipeForm - Comprehensive form example using React Hook Form
 * Demonstrates integration patterns with existing atomic design components
 */
export const RecipeForm: React.FC<RecipeFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
  className,
}) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<RecipeFormData>({
    defaultValues: {
      servings: 4,
      difficulty: 'medium',
      category: '',
      tags: [],
      ingredients: [{ name: '', quantity: 1, unit: 'cup' }],
      instructions: [''],
      isPublic: true,
      allowComments: true,
      ...initialData,
    },
    mode: 'onChange',
  });

  const watchedServings = watch('servings');
  const watchedDifficulty = watch('difficulty');

  const categories = [
    'Breakfast',
    'Lunch', 
    'Dinner',
    'Dessert',
    'Snack',
    'Appetizer',
    'Beverage',
  ];

  const units = [
    'cup', 'tbsp', 'tsp', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 'piece', 'clove', 'pinch'
  ];

  const addIngredient = () => {
    const currentIngredients = watch('ingredients');
    setValue('ingredients', [...currentIngredients, { name: '', quantity: 1, unit: 'cup' }]);
  };

  const removeIngredient = (index: number) => {
    const currentIngredients = watch('ingredients');
    setValue('ingredients', currentIngredients.filter((_, i) => i !== index));
  };

  const addInstruction = () => {
    const currentInstructions = watch('instructions');
    setValue('instructions', [...currentInstructions, '']);
  };

  const removeInstruction = (index: number) => {
    const currentInstructions = watch('instructions');
    setValue('instructions', currentInstructions.filter((_, i) => i !== index));
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className={cn('max-w-2xl mx-auto space-y-8 p-6', className)}
    >
      {/* Basic Information Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recipe Information</h2>
          <p className="text-muted-foreground">
            Basic details about your recipe
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Recipe Title *</Label>
            <Input
              id="title"
              {...register('title', { 
                required: 'Recipe title is required',
                minLength: { value: 3, message: 'Title must be at least 3 characters' }
              })}
              placeholder="Enter recipe name"
              className={errors.title ? 'border-destructive' : ''}
            />
            {errors.title && (
              <p className="text-sm text-destructive mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Brief description of your recipe"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="prepTime">Prep Time (minutes) *</Label>
              <Input
                id="prepTime"
                type="number"
                min="1"
                {...register('prepTime', { 
                  required: 'Prep time is required',
                  min: { value: 1, message: 'Prep time must be at least 1 minute' }
                })}
                className={errors.prepTime ? 'border-destructive' : ''}
              />
              {errors.prepTime && (
                <p className="text-sm text-destructive mt-1">{errors.prepTime.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cookTime">Cook Time (minutes) *</Label>
              <Input
                id="cookTime"
                type="number"
                min="1"
                {...register('cookTime', { 
                  required: 'Cook time is required',
                  min: { value: 1, message: 'Cook time must be at least 1 minute' }
                })}
                className={errors.cookTime ? 'border-destructive' : ''}
              />
              {errors.cookTime && (
                <p className="text-sm text-destructive mt-1">{errors.cookTime.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="servings">Servings</Label>
              <Controller
                name="servings"
                control={control}
                render={({ field }) => (
                  <QuantityAdjuster
                    originalServings={4}
                    currentServings={field.value}
                    onServingsChange={field.onChange}
                    minServings={1}
                    maxServings={20}
                  />
                )}
              />
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <DifficultyIndicator 
                      difficulty={watchedDifficulty} 
                      showLabel={false}
                      size="sm"
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Please select a category' }}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
            )}
          </div>
        </div>
      </section>

      <Separator />

      {/* Ingredients Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <p className="text-muted-foreground">
            List all ingredients with quantities (serves {watchedServings})
          </p>
        </div>

        <div className="space-y-3">
          {watch('ingredients').map((_, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-1">
                <Input
                  {...register(`ingredients.${index}.name` as const, {
                    required: index === 0 ? 'At least one ingredient is required' : false
                  })}
                  placeholder="Ingredient name"
                />
              </div>
              <div className="w-24">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  {...register(`ingredients.${index}.quantity` as const, {
                    valueAsNumber: true,
                    min: { value: 0.1, message: 'Quantity must be positive' }
                  })}
                  placeholder="1"
                />
              </div>
              <div className="w-20">
                <Controller
                  name={`ingredients.${index}.unit` as const}
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {units.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {watch('ingredients').length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addIngredient}
            className="w-full"
          >
            Add Ingredient
          </Button>
        </div>
      </section>

      <Separator />

      {/* Instructions Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="text-muted-foreground">
            Step-by-step cooking instructions
          </p>
        </div>

        <div className="space-y-3">
          {watch('instructions').map((_, index) => (
            <div key={index} className="flex gap-2 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <Textarea
                  {...register(`instructions.${index}` as const, {
                    required: index === 0 ? 'At least one instruction is required' : false
                  })}
                  placeholder="Describe this step..."
                  rows={2}
                />
              </div>
              {watch('instructions').length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeInstruction(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addInstruction}
            className="w-full"
          >
            Add Step
          </Button>
        </div>
      </section>

      <Separator />

      {/* Settings Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Privacy & Settings</h2>
          <p className="text-muted-foreground">
            Control how your recipe is shared
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="isPublic"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isPublic"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="isPublic">Make recipe public</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Controller
              name="allowComments"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="allowComments"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="allowComments">Allow comments and ratings</Label>
          </div>
        </div>
      </section>

      <Separator />

      {/* Submit Section */}
      <div className="flex gap-4 pt-4">
        <Button 
          type="submit" 
          disabled={!isValid || loading}
          className="flex-1"
        >
          {loading ? 'Saving Recipe...' : 'Save Recipe'}
        </Button>
        <Button type="button" variant="outline">
          Preview
        </Button>
      </div>
    </form>
  );
};

export default RecipeForm;