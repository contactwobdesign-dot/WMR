import { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'

// ============================================
// BUTTON COMPONENT
// ============================================
export const Button = forwardRef(({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  children, 
  className = '',
  ...props 
}, ref) => {
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  }

  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
  const disabledStyles = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
      {...props}
    >
      {loading && <Spinner size="sm" className="!text-current" />}
      {children}
    </button>
  )
})

Button.displayName = 'Button'

// ============================================
// INPUT COMPONENT
// ============================================
export const Input = forwardRef(({ 
  label, 
  error, 
  helper, 
  className = '',
  ...inputProps 
}, ref) => {
  const inputId = inputProps.id || inputProps.name || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <input
        ref={ref}
        id={inputId}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300'
        }`}
        {...inputProps}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {!error && helper && (
        <p className="mt-1 text-sm text-gray-500">
          {helper}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

// ============================================
// SELECT COMPONENT
// ============================================
export const Select = forwardRef(({ 
  label, 
  options = [], 
  error, 
  className = '',
  ...selectProps 
}, ref) => {
  const selectId = selectProps.id || selectProps.name || `select-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      
      <select
        ref={ref}
        id={selectId}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors ${
          error 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300'
        }`}
        {...selectProps}
      >
        {options.map((option, index) => (
          <option key={option.value || index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

// ============================================
// CARD COMPONENT
// ============================================
export const Card = ({ 
  children, 
  className = '', 
  padding = 'md' 
}) => {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${paddingStyles[padding]} ${className}`}>
      {children}
    </div>
  )
}

// ============================================
// BADGE COMPONENT
// ============================================
export const Badge = ({ 
  variant = 'info', 
  children, 
  className = '' 
}) => {
  const variantStyles = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    pro: 'bg-gradient-to-r from-amber-400 to-orange-500 text-white',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}

// ============================================
// SPINNER COMPONENT
// ============================================
export const Spinner = ({ 
  size = 'md', 
  className = '' 
}) => {
  const { t } = useTranslation()
  const sizeStyles = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
  }

  return (
    <div 
      className={`border-primary-600 border-t-transparent rounded-full animate-spin ${sizeStyles[size]} ${className}`}
      role="status"
      aria-label={t('common.loading')}
    >
      <span className="sr-only">{t('common.loading')}</span>
    </div>
  )
}

// ============================================
// EXPORTS
// ============================================
export { Tooltip } from './Tooltip'

export default {
  Button,
  Input,
  Select,
  Card,
  Badge,
  Spinner,
}
