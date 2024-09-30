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
  tagTypes: ["auth", "facilities", "bookings"],
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
      query: (data) => (
      // console.log({ data }),  
      {
        method: "GET",
        url: `/auth/profile/${data?.id}`, 
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
      query: ({ id, data }) => (
        console.log({ id, data }),
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

    getAllFacilities: builder.query({
      query: (data) => (
        console.log( data ),
      {
        url: "/facility",
        method: "GET",
      }),
      providesTags: ["facilities"],
    }),
    // Get all facilities with pagination
    getAllFacilitiesPage: builder.query({
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
    // Create a booking
    addBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["bookings"],
    }),

    // Check facility availability
    checkAvailability: builder.query({
      query: (date) => ({
        url: `/bookings/check-availability?date=${date}`,
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),

    // Get all bookings (admin only)
    getAllBookings: builder.query({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),

    // Get user-specific bookings
    getUserBookings: builder.query({
      query: () => ({
        url: "/bookings/user",
        method: "GET",
      }),
      providesTags: ["bookings"],
    }),

    // Cancel a booking
    cancelBooking: builder.mutation({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings"],
    }),

  }),
});


export const {
  useAddUsersSignupMutation,
  useAddUsersLoginMutation,
  useGetUserProfileQuery,
  useAddUserLogoutMutation,
  useUpdateUserProfileMutation,
  useAddFacilityMutation,
  useGetAllFacilitiesQuery,
  useGetAllFacilitiesPageQuery,
  useGetSingleFacilityQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useAddBookingMutation,
  useCheckAvailabilityQuery,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
} = baseApi;
