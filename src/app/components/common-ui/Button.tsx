import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

export const ButtonStyle = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: transparent;
    border-radius: 0.25rem;
    margin: 0;
    user-select: none;
    font-size: 0.85rem;
    font-weight: 500;
    line-height: 1;
    padding: 0.6rem 0.8rem;
    color: #000;
    white-space: nowrap;
    border: 1px solid transparent;

    &.primary {
        color: #fff;
        background-color: var(--light-primary-origin);
        
        &:hover, &.active {
            background-color: var(--light-primary-dark);
        }

        &.disabled {
            background-color: var(--light-primary-a12);
            color: var(--black-a32);
        }
    }

    &.secondary {
        color: #fff;
        background-color: var(--light-secondary-origin);
        
        &:hover, &.active {
            background-color: var(--light-secondary-dark);
        }

        &.disabled {
            background-color: var(--light-secondary-a12);
            color: var(--black-a32);
        }
    }

    &.info {
        color: #fff;
        background-color: var(--light-semantic-info-origin);
    }

    &.success {
        color: #fff;
        background-color: var(--light-semantic-success-origin);
    }

    &.warning {
        color: #fff;
        background-color: var(--light-semantic-warning-origin);
    }

    &.error {
        color: #fff;
        background-color: var(--light-semantic-error-origin);
    }

    &.dark {
        color: #fff;
        background-color: var(--dark-surface-level-2);
    }

    &.light {
        color: var(--light-text-primary);
        background-color: var(--light-surface-level-4);
    }
    
    &.outlined {
        background-color: transparent;
        
        &.primary {
            color: var(--light-primary-origin);
            border: 1px solid var(--light-primary-origin);
            
            &:hover, &.active {
                background-color: var(--light-primary-a12);
            }
        }
        
        &.secondary {
            color: var(--light-secondary-origin);
            border: 1px solid var(--light-secondary-origin);

            &:hover, &.active {
                background-color: var(--light-secondary-a12);
            }
        }
        
        &.info {
            color: var(--light-semantic-info-origin);
            border: 1px solid var(--light-semantic-info-origin);
        }
        
        &.success {
            color: var(--light-semantic-success-origin);
            border: 1px solid var(--light-semantic-success-origin);
        }

        &.warning {
            color: var(--light-semantic-warning-origin);
            border: 1px solid var(--light-semantic-warning-origin);
        }

        &.error {
            color: var(--light-semantic-error-origin);
            border: 1px solid var(--light-semantic-error-origin);
        }

        &.dark {
            color: var(--dark-surface-level-2);
            border: 1px solid var(--dark-surface-level-2);
        }

        &.light {
            color: var(--light-surface-level-4);
            border: 1px solid var(--light-surface-level-4);
        }
    }
    
    &.rounded {
        border-radius: 1.4rem;
    }
    
    &.xs {
        font-size: 0.75rem;
        padding: 0.4rem 0.6rem;
    }
    
    &.sm {
        font-size: 0.8rem;
        padding: 0.5rem 0.7rem;
    }
    
    &.lg {
        font-size: 0.9rem;
        padding: 0.7rem 0.9rem;
    }
    
    &.xl {
        font-size: 1rem;
        padding: 0.75rem 1.2rem;
    }
`;

type ButtonVariant = 'contained' | 'outlined';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' | 'dark' | 'light';

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  rounded?: boolean;
  disabled?: boolean;
  children?: string;
  onClick?: MouseEventHandler;
}

export const Button = (props: ButtonStyleProps) => {
  const classes = [];
  const { variant, size, children, color, rounded, disabled } = props;
  if (variant) classes.push(variant);
  if (size) classes.push(size);
  if (color) classes.push(color);
  if (rounded) classes.push('rounded');
  if (disabled) classes.push('disabled');

  return (
    <ButtonStyle className={classes.join(' ')} onClick={props.onClick}>
      {children}
    </ButtonStyle>
  );
};