import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { NotificationREQ } from './request/notification.request';
import { CreateNotificationREQ } from './request/create-notification.request';
import { NotificationRESP } from './response/get-notification.response';
import { DeviceTokenByUserIdRESP } from './response/get-device-token.response';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/DeviceToken/`,
  }),
  tagTypes: ['NOTIFICATION'],
  endpoints: (build) => ({
    addDeviceToken: build.mutation<void, NotificationREQ>({
      query: (body) => ({
        url: `UpdateToken?userID=${body.userID}&token=${body.token}`,
        method: HTTP_METHOD.POST,
        body,
        responseHandler: 'text',
      }),
    }),

    createNotification: build.mutation<void, CreateNotificationREQ>({
      query: (body) => ({
        url: `CreateNotification`,
        method: HTTP_METHOD.POST,
        body,
        responseHandler: 'text',
      }),
    }),

    markAsRead: build.mutation<void, string>({
      query: (id) => ({
        url: `NotiRead?notiID=${id}`,
        method: HTTP_METHOD.POST,
        responseHandler: 'text',
      }),
      invalidatesTags: () => {
        return [{ type: 'NOTIFICATION', id: 'LIST' }];
      },
    }),

    getNotification: build.query<NotificationRESP, string>({
      query: (id) => ({
        url: `GetNotifications/${id}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: NotificationRESP) => {
        return response;
      },
      providesTags: () => {
        return [{ type: 'NOTIFICATION', id: 'LIST' }];
      },
    }),

    getDeviceTokensByUserId: build.query<DeviceTokenByUserIdRESP, string>({
      query: (id) => ({
        url: `GetTokenByUser?userID=${id}`,
        method: HTTP_METHOD.GET,
      }),
      transformResponse: (response: DeviceTokenByUserIdRESP) => {
        return response;
      },
    }),

    removeToken: build.mutation<void, { userID: string; token: string }>({
      query: (body) => ({
        url: `RemoveToken?userID=${body.userID}&token=${body.token}`,
        method: HTTP_METHOD.POST,
        responseHandler: 'text',
      }),
    }),
  }),
});

export const {
  useAddDeviceTokenMutation,
  useGetNotificationQuery,
  useLazyGetNotificationQuery,
  useMarkAsReadMutation,
  useLazyGetDeviceTokensByUserIdQuery,
  useGetDeviceTokensByUserIdQuery,
  useCreateNotificationMutation,
  useRemoveTokenMutation,
} = notificationApi;
