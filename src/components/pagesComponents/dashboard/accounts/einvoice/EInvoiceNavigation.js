'use client';

import { Icon } from '@iconify/react';

export default function EInvoiceNavigation({ currentStep, onStepChange, steps }) {
  return (
    <div className="flex items-center justify-between mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepChange(step.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentStep === step.id
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600'
            }`}
          >
            <Icon icon={step.icon} className="w-4 h-4" />
            <span>{step.label}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">
          Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
        </span>
      </div>
    </div>
  );
}


