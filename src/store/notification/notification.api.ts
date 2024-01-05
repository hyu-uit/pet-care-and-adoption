import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { HTTP_METHOD } from '../../utils/constants/http.constants';
import { NotificationREQ } from './request/notification.request';
import { CreateNotificationREQ } from './request/create-notification.request';

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://petcareapi.azurewebsites.net/api/DeviceToken/`,
  }),
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
  }),
});

export const { useAddDeviceTokenMutation } = notificationApi;
