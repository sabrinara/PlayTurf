import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base API for the sports facility booking platform
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sports-facility-booking-system.vercel.app/api",
    prepareHeaders: (headers) => {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      
      if (token) {
        // Set the Authorization header with the token
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ["auth", "facilities"],
  endpoints: (builder) => ({
    addUsersSignup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["auth"],
    }),
    addUsersLogin: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["auth"],
    }),
    getUserProfile: builder.query({
      query: () => ({
        method: "GET",
        url: "/auth/profile",
      }),
      providesTags: ["auth"],
    }),
    addUserLogout: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/auth/logout",
      }),
      invalidatesTags: ["auth"],
    }),
    updateUserProfile: builder.mutation({
      query: ({id, data}) => (
        console.log({id, data}),
        {
        method: "PATCH",
        url: `/auth/${id}`,
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        }),
      invalidatesTags: ["auth"],
    }),
    addFacility: builder.mutation({
      query: (data) => ({
        url: "/facilities",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["facilities"],
    }),

    // Get all facilities with pagination
    getAllFacilities: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/facilities?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["facilities"],
    }),

    // Get a single facility by ID
    getSingleFacility: builder.query({
      query: (id) => ({
        url: `/facilities/${id}`,
        method: "GET",
      }),
      providesTags: ["facilities"],
    }),

    // Update a facility by ID (Admin only)
    updateFacility: builder.mutation({
      query: ({ id, data }) => ({
        url: `/facilities/${id}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["facilities"],
    }),

    // Soft delete a facility by ID (Admin only)
    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `/facilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facilities"],
    }),

  }),
});

// Exporting the hooks for mutations
export const {
  useAddUsersSignupMutation,
  useAddUsersLoginMutation,
  useGetUserProfileQuery,
  useAddUserLogoutMutation,
  useUpdateUserProfileMutation,
  useAddFacilityMutation,
  useGetAllFacilitiesQuery,
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
} = baseApi;
