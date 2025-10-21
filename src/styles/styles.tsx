import { CSSProperties } from "react";

export const styles: Record<string, CSSProperties> = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
    padding: '24px'
  },
  maxWidth: {
    maxWidth: '896px',
    margin: '0 auto'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '32px',
    marginBottom: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  subtitle: {
    color: '#6b7280'
  },
  addButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
    fontSize: '14px'
  },
  addButtonHover: {
    backgroundColor: '#4f46e5'
  },
  totalCard: {
    background: 'linear-gradient(to right, #6366f1, #9333ea)',
    borderRadius: '12px',
    padding: '24px',
    color: 'white'
  },
  totalLabel: {
    fontSize: '14px',
    opacity: 0.9,
    marginBottom: '4px'
  },
  totalAmount: {
    fontSize: '36px',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '16px'
  },
  emptyState: {
    color: '#6b7280',
    textAlign: 'center',
    padding: '32px 0'
  },
  expenseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  expenseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    transition: 'background-color 0.2s'
  },
  expenseItemHover: {
    backgroundColor: '#f3f4f6'
  },
  expenseContent: {
    flex: 1
  },
  expenseTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  expenseTitle: {
    fontWeight: '600',
    color: '#1f2937'
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  },
  expenseDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: '#6b7280'
  },
  expenseRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  expenseAmount: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  actionButtons: {
    display: 'flex',
    gap: '8px'
  },
  editButton: {
    padding: '8px',
    color: '#2563eb',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  editButtonHover: {
    backgroundColor: '#dbeafe'
  },
  deleteButton: {
    padding: '8px',
    color: '#dc2626',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  deleteButtonHover: {
    backgroundColor: '#fee2e2'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    maxWidth: '500px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937'
  },
  closeButton: {
    padding: '8px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    color: '#6b7280',
    transition: 'background-color 0.2s'
  },
  closeButtonHover: {
    backgroundColor: '#f3f4f6'
  },
  formGroup: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  },
  input: {
    width: '100%',
    padding: '10px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  primaryButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  primaryButtonHover: {
    backgroundColor: '#4f46e5'
  },
  secondaryButton: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    fontSize: '14px'
  },
  secondaryButtonHover: {
    backgroundColor: '#f9fafb'
  }
};