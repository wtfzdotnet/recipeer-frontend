import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DifficultyIndicator from './DifficultyIndicator';

describe('DifficultyIndicator', () => {
  it('renders beginner level correctly', () => {
    render(<DifficultyIndicator level="beginner" />);
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe difficulty: Beginner/)).toBeInTheDocument();
  });

  it('renders intermediate level correctly', () => {
    render(<DifficultyIndicator level="intermediate" />);
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe difficulty: Intermediate/)).toBeInTheDocument();
  });

  it('renders advanced level correctly', () => {
    render(<DifficultyIndicator level="advanced" />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByLabelText(/Recipe difficulty: Advanced/)).toBeInTheDocument();
  });

  it('renders icon-only variant', () => {
    render(<DifficultyIndicator level="beginner" variant="icon-only" />);
    const element = screen.getByLabelText(/Recipe difficulty: Beginner/);
    expect(element).toBeInTheDocument();
    expect(screen.queryByText('Beginner')).not.toBeInTheDocument();
  });

  it('renders detailed variant with skill breakdown', () => {
    const factors = { prep: 3, technique: 2, time: 4 };
    render(
      <DifficultyIndicator 
        level="intermediate" 
        variant="detailed" 
        showDetails={true}
        factors={factors}
      />
    );
    
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Skill Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Prep Complexity:')).toBeInTheDocument();
    expect(screen.getByText('Technique:')).toBeInTheDocument();
    expect(screen.getByText('Time Investment:')).toBeInTheDocument();
  });

  it('renders compact variant with factors when showDetails is true', () => {
    const factors = { prep: 3, technique: 2, time: 4 };
    render(
      <DifficultyIndicator 
        level="beginner" 
        variant="compact" 
        showDetails={true}
        factors={factors}
      />
    );
    
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.getByText('Prep Complexity:')).toBeInTheDocument();
  });

  it('does not render factors when showDetails is false', () => {
    const factors = { prep: 3, technique: 2, time: 4 };
    render(
      <DifficultyIndicator 
        level="beginner" 
        variant="compact" 
        showDetails={false}
        factors={factors}
      />
    );
    
    expect(screen.getByText('Beginner')).toBeInTheDocument();
    expect(screen.queryByText('Prep Complexity:')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DifficultyIndicator level="beginner" className="custom-class" />);
    const element = screen.getByLabelText(/Recipe difficulty: Beginner/);
    expect(element).toHaveClass('custom-class');
  });
});