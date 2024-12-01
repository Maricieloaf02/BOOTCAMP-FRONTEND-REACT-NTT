import { render, screen } from '@testing-library/react';
import OrderProgress from '@/app/components/OrderProgress';

describe('OrderProgress Component', () => {
  const steps = ['Step 1', 'Step 2', 'Step 3'];

  it('should render all steps', () => {
    render(<OrderProgress currentStep={2} steps={steps} />);
    steps.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('should apply "active" class to the current step', () => {
    render(<OrderProgress currentStep={2} steps={steps} />);
    const activeStep = screen.getByText('Step 2').closest('div');
    expect(activeStep).toHaveClass('active');
  });

  it('should apply "completed" class to steps before the current step', () => {
    render(<OrderProgress currentStep={2} steps={steps} />);
    const completedStep = screen.getByText('Step 1').closest('div');
    expect(completedStep).toHaveClass('completed');
  });

  it('should not apply "completed" or "active" classes to steps after the current step', () => {
    render(<OrderProgress currentStep={2} steps={steps} />);
    const futureStep = screen.getByText('Step 3').closest('div');
    expect(futureStep).not.toHaveClass('completed');
    expect(futureStep).not.toHaveClass('active');
  });
});
