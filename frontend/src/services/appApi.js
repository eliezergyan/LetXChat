import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// define a service using a base URL

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://letxchatapp.herokuapp.com/'
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
        }),

        // Edit the user profile
        editUser: builder.mutation({
            query: ({id, ...payload}) => ({
                url: `/users/profile/${id}`,
                method: 'PUT',
                body: payload,
            })
        }),

    })
})


export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useEditUserMutation } = appApi;

export default appApi;