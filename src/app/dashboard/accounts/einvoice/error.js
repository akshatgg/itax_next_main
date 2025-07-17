'use client';

import ErrorComponent from '@/components/partials/error/ErrorComponent';

export default function error(props) {
  return (
    <ErrorComponent
      type={''}
      info={'Something went wrong'}
      message={props.error.message}
    />
  );
}
