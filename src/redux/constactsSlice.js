import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi ',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63a8a4f3f4962215b586468f.mockapi.io',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contacts'],
    }),
    addContact: builder.mutation({
      query: (name, phone) => ({
        url: `/contacts`,
        method: 'POST',
        body: {
          name,
          phone,
        },
      }),
      invalidatesTags: ['Contacts'],
    }),
    deleteContact: builder.mutation({
      query: contactId => ({
        url: `/contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
