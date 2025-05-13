"use client"

import React, { use, useEffect } from 'react';
import ReactTable from '@/components/ui/ReactTable';
import { contactsTableHeaders } from './staticData';
import { nodeAxios } from '@/lib/axios';
import userbackAxios from '@/lib/userbackAxios';

export const AllContacts = () => {
  const [contacts, setContacts] = React.useState([]);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userbackAxios.get('/contactUs/getAll');
        setContacts(response.data.allContactUs || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="h-34 grid place-content-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ReactTable
        columns={contactsTableHeaders}
        data={contacts}
      />
    </div>
  );
};
