'use client';

import { Icon } from '@iconify/react';

export default function EInvoiceNavigation({ currentStep, onStepChange, steps }) {
  return (
    <div className="mb-4 sm:mb-6">
      {/* Single responsive navigation with horizontal scroll */}
      <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
        <div className="flex items-center justify-between">
          {/* Steps - Horizontal scroll when needed */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 overflow-x-auto flex-1 mr-4">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => onStepChange(step.id)}
                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                  currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon icon={step.icon} className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{step.label}</span>
                <span className="sm:hidden">{step.shortLabel || step.label}</span>
              </button>
            ))}
          </div>
          
          {/* Step Indicator */}
          <div className="flex-shrink-0">
            <span className="text-xs sm:text-sm text-gray-500">
              {steps.findIndex(s => s.id === currentStep) + 1}/{steps.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


