import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '/api' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Schedule', 'Goal', 'Suggestion'],
  endpoints: (builder) => ({}),
});
