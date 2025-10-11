import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('Modal Component', () => {
    it('does not render when isOpen is false', () => {
        render(<Modal isOpen={true} onClose={() => { }}>...</Modal>);
        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders children and overlay when open', () => {
        render(
            <Modal isOpen={true} onClose={() => { }}>
                <div>Modal Content</div>
            </Modal>
        );
        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('calls onClose when clicking on overlay', () => {
        const onClose = jest.fn();
        render(
            <Modal isOpen={true} onClose={onClose}>
                <div>Modal Content</div>
            </Modal>
        );
        const overlay = screen.getByTestId('modal-overlay');
        fireEvent.click(overlay);
        expect(onClose).toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside modal content', () => {
        const onClose = jest.fn();
        render(
            <Modal isOpen={true} onClose={onClose}>
                <div>Modal Content</div>
            </Modal>
        );
        fireEvent.click(screen.getByText('Modal Content'));
        expect(onClose).not.toHaveBeenCalled();
    });
});
