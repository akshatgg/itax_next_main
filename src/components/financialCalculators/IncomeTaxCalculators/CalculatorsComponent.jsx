import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// The dynamic form component
export default function CalculatorsComponent({ formConfig, handleSubmit }) {
  // Dynamically generate initialValues from formConfig
  const initialValues = formConfig?.fields?.reduce((values, field) => {
    values[field.name] = ''; // Default value
    return values;
  }, {});

  // Dynamically generate validationSchema from formConfig
  const validationSchema = Yup.object(
    formConfig.fields.reduce((schema, field) => {
      schema[field.name] = Yup.number()
        .integer('Must be an integer')
        .typeError('Must be a number')
        .required('This field is required');
      return schema;
    }, {}),
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
    >
      {({ isSubmitting, resetForm }) => (
        <Form className="max-w-lg mx-auto p-6 bg-gradient-to-br rounded-xl ">
          <div className="space-y-6">
            {/* Dynamic Input Fields */}
            {formConfig.fields.map((input, index) => (
              <div key={index}>
                <label
                  htmlFor={input.name}
                  className="block text-sm font-medium  mb-2"
                >
                  {input.label}
                </label>
                <div className="relative">
                  <Field
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    className="w-full px-4 py-3 text-sm  border  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition-all"
                  />
                  {input.suffix && (
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 ">
                      {input.suffix}
                    </div>
                  )}
                </div>
                <ErrorMessage
                  name={input.name}
                  component="span"
                  className="text-red-400 text-xs mt-1"
                />
              </div>
            ))}

            {/* Dynamic Buttons */}
            <div className="grid gap-4 grid-cols-2">
              {formConfig.buttons?.map((button, index) => (
                <button
                  key={index}
                  type={button.type || 'button'}
                  onClick={button.action}
                  disabled={button.disabled || isSubmitting}
                  className={`w-full py-3 px-6 text-sm text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105
        ${
          button.disabled || isSubmitting
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
        }
        ${button.className}`}
                >
                  {isSubmitting ? (
                    <span className="spinner border-2 border-t-transparent border-white w-5 h-5 rounded-full animate-spin inline-block"></span>
                  ) : (
                    button.label
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Special Buttons */}
            {formConfig.specialButtons &&
              formConfig.specialButtons.length > 0 && (
                <div className="grid gap-4 grid-cols-2">
                  {formConfig.specialButtons.map((button, index) => {
                    if (!button.show) return null;

                    const handleButtonClick = (e) => {
                      if (button.type === 'reset') {
                        resetForm();
                      }
                      if (button.onClick) {
                        button.onClick({ resetForm });
                      }
                    };

                    return (
                      <button
                        key={index}
                        type={button.type || 'button'}
                        disabled={
                          (button.loading && isSubmitting) || isSubmitting
                        }
                        onClick={handleButtonClick}
                        className={`w-full py-3 px-6 text-sm text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105
            ${
              (button.loading && isSubmitting) || isSubmitting
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
            }
            ${button.className}`}
                      >
                        {(button.loading && isSubmitting) || isSubmitting ? (
                          <span className="spinner border-2 border-t-transparent border-white w-5 h-5 rounded-full animate-spin inline-block"></span>
                        ) : (
                          button.label
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
