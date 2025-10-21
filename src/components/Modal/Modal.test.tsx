import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal component', () => {
  it('should not render when isOpen is false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Content</div>
      </Modal>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should render children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );
    
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('should call onClose when overlay is clicked', () => {
    const handleClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Modal>
    );
    
    const overlay = container.firstChild as HTMLElement;
    fireEvent.click(overlay);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when modal content is clicked', () => {
    const handleClose = jest.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );
    
    fireEvent.click(screen.getByText('Modal Content'));
    
    expect(handleClose).not.toHaveBeenCalled();
  });
});