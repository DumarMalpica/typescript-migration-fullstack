import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'premium' | 'outline';
  icon?: React.ElementType;
  isLoading?: boolean;
}

const PremiumButton = ({
  children,
  variant = 'premium',
  icon: Icon,
  isLoading = false,
  className = '',
  ...props
}: Props) => {
  const baseClass = variant === 'premium' ? 'btn-premium' : 'btn-outline';

  return (
    <button className={`${baseClass} ${className}`} disabled={isLoading} {...props}>
      {isLoading ? <Loader2 className="animate-spin" size={20} /> : Icon && <Icon size={20} />}
      <span>{children}</span>
    </button>
  );
};

export default PremiumButton;
