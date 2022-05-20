import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// define a service using a base URL

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000'
    }),
    endpoints: (builder) => ({
        // Creating the user 
        signupUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            })
        }),

        // Login the user
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/users/login',
                method: 'POST',
                body: user,
            })
        }),

        // Logout the user
        logoutUser: builder.mutation({
            query: (payload) => ({
                url: '/logout',
                method: 'DELETE',
                body: payload,
            })
        })
    })
})


export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;

export default appApi;