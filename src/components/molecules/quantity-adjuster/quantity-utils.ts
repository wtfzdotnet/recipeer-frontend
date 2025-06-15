/**
 * Utility functions for quantity calculations and scaling
 */

/**
 * Scales a quantity based on serving size changes with smart rounding
 * for practical cooking measurements.
 * 
 * @param originalQuantity - The original ingredient quantity
 * @param originalServings - Original recipe serving size
 * @param currentServings - Target serving size
 * @returns Scaled quantity with smart rounding for practical measurements
 */
export const scaleQuantity = (
  originalQuantity: number,
  originalServings: number,
  currentServings: number
): number => {
  const scalingFactor = currentServings / originalServings;
  const scaledQuantity = originalQuantity * scalingFactor;
  
  // Smart rounding for practical measurements
  if (scaledQuantity < 0.125) {
    return Number((scaledQuantity).toFixed(3));
  } else if (scaledQuantity < 1) {
    // Round to nearest 1/8 for fractions
    return Math.round(scaledQuantity * 8) / 8;
  } else if (scaledQuantity < 10) {
    // Round to nearest 1/4 for small quantities
    return Math.round(scaledQuantity * 4) / 4;
  } else {
    // Round to nearest 0.5 for larger quantities
    return Math.round(scaledQuantity * 2) / 2;
  }
};