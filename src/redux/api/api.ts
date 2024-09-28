/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API for the sports facility booking platform
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sports-facility-booking-system.vercel.app/api",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    // Sign up mutation
    addUsersSignup: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/signup",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
    // Login mutation
    addUsersLogin: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["auth"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth/profile",
      }),
      providesTags: ["auth"],
    })
  }),


});

// Exporting the hooks for mutations
export const { useAddUsersSignupMutation, useAddUsersLoginMutation ,  useGetUserProfileQuery} = baseApi;
