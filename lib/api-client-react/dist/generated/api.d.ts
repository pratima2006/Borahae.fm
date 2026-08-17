import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Dashboard, HealthStatus, HistoryEntry, HistoryResponse, ListHistoryParams, ListVideosParams, Profile, ProfileInput, StreamInput, Video, VideoInput } from './api.schemas';
import { customFetch } from '../custom-fetch';
import type { ErrorType, BodyType } from '../custom-fetch';
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
export declare const getHealthCheckUrl: () => string;
/**
 * Returns server health status
 * @summary Health check
 */
export declare const healthCheck: (options?: Parameters<typeof customFetch>[1]) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getGetProfileUrl: () => string;
/**
 * @summary Get the signed-in user's profile
 */
export declare const getProfile: (options?: Parameters<typeof customFetch>[1]) => Promise<Profile>;
export declare const getGetProfileQueryKey: () => readonly ["/api/profile"];
export declare const getGetProfileQueryOptions: <TData = Awaited<ReturnType<typeof getProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetProfileQueryResult = NonNullable<Awaited<ReturnType<typeof getProfile>>>;
export type GetProfileQueryError = ErrorType<unknown>;
/**
 * @summary Get the signed-in user's profile
 */
export declare function useGetProfile<TData = Awaited<ReturnType<typeof getProfile>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getProfile>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getSaveProfileUrl: () => string;
/**
 * @summary Save the signed-in user's profile
 */
export declare const saveProfile: (profileInput: ProfileInput, options?: Parameters<typeof customFetch>[1]) => Promise<Profile>;
export declare const getSaveProfileMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof saveProfile>>, TError, {
        data: BodyType<ProfileInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof saveProfile>>, TError, {
    data: BodyType<ProfileInput>;
}, TContext>;
export type SaveProfileMutationResult = NonNullable<Awaited<ReturnType<typeof saveProfile>>>;
export type SaveProfileMutationBody = BodyType<ProfileInput>;
export type SaveProfileMutationError = ErrorType<unknown>;
/**
* @summary Save the signed-in user's profile
*/
export declare const useSaveProfile: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof saveProfile>>, TError, {
        data: BodyType<ProfileInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof saveProfile>>, TError, {
    data: BodyType<ProfileInput>;
}, TContext>;
export declare const getGetDashboardUrl: () => string;
/**
 * @summary Get home dashboard data
 */
export declare const getDashboard: (options?: Parameters<typeof customFetch>[1]) => Promise<Dashboard>;
export declare const getGetDashboardQueryKey: () => readonly ["/api/dashboard"];
export declare const getGetDashboardQueryOptions: <TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboard>>>;
export type GetDashboardQueryError = ErrorType<unknown>;
/**
 * @summary Get home dashboard data
 */
export declare function useGetDashboard<TData = Awaited<ReturnType<typeof getDashboard>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboard>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListMissionsUrl: () => string;
/**
 * @summary List starter missions
 */
export declare const listMissions: (options?: Parameters<typeof customFetch>[1]) => Promise<Video[]>;
export declare const getListMissionsQueryKey: () => readonly ["/api/missions"];
export declare const getListMissionsQueryOptions: <TData = Awaited<ReturnType<typeof listMissions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMissions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMissions>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMissionsQueryResult = NonNullable<Awaited<ReturnType<typeof listMissions>>>;
export type ListMissionsQueryError = ErrorType<unknown>;
/**
 * @summary List starter missions
 */
export declare function useListMissions<TData = Awaited<ReturnType<typeof listMissions>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMissions>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getListVideosUrl: (params?: ListVideosParams) => string;
/**
 * @summary Search and list videos
 */
export declare const listVideos: (params?: ListVideosParams, options?: Parameters<typeof customFetch>[1]) => Promise<Video[]>;
export declare const getListVideosQueryKey: (params?: ListVideosParams) => readonly ["/api/videos", ...ListVideosParams[]];
export declare const getListVideosQueryOptions: <TData = Awaited<ReturnType<typeof listVideos>>, TError = ErrorType<unknown>>(params?: ListVideosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listVideos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listVideos>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListVideosQueryResult = NonNullable<Awaited<ReturnType<typeof listVideos>>>;
export type ListVideosQueryError = ErrorType<unknown>;
/**
 * @summary Search and list videos
 */
export declare function useListVideos<TData = Awaited<ReturnType<typeof listVideos>>, TError = ErrorType<unknown>>(params?: ListVideosParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listVideos>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getAddVideoUrl: () => string;
/**
 * @summary Fetch YouTube metadata and add a video
 */
export declare const addVideo: (videoInput: VideoInput, options?: Parameters<typeof customFetch>[1]) => Promise<Video>;
export declare const getAddVideoMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addVideo>>, TError, {
        data: BodyType<VideoInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof addVideo>>, TError, {
    data: BodyType<VideoInput>;
}, TContext>;
export type AddVideoMutationResult = NonNullable<Awaited<ReturnType<typeof addVideo>>>;
export type AddVideoMutationBody = BodyType<VideoInput>;
export type AddVideoMutationError = ErrorType<unknown>;
/**
* @summary Fetch YouTube metadata and add a video
*/
export declare const useAddVideo: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof addVideo>>, TError, {
        data: BodyType<VideoInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof addVideo>>, TError, {
    data: BodyType<VideoInput>;
}, TContext>;
export declare const getListHistoryUrl: (params?: ListHistoryParams) => string;
/**
 * @summary List watch history and leaderboard
 */
export declare const listHistory: (params?: ListHistoryParams, options?: Parameters<typeof customFetch>[1]) => Promise<HistoryResponse>;
export declare const getListHistoryQueryKey: (params?: ListHistoryParams) => readonly ["/api/history", ...ListHistoryParams[]];
export declare const getListHistoryQueryOptions: <TData = Awaited<ReturnType<typeof listHistory>>, TError = ErrorType<unknown>>(params?: ListHistoryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listHistory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listHistory>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListHistoryQueryResult = NonNullable<Awaited<ReturnType<typeof listHistory>>>;
export type ListHistoryQueryError = ErrorType<unknown>;
/**
 * @summary List watch history and leaderboard
 */
export declare function useListHistory<TData = Awaited<ReturnType<typeof listHistory>>, TError = ErrorType<unknown>>(params?: ListHistoryParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listHistory>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export declare const getRecordStreamUrl: () => string;
/**
 * @summary Record a completed YouTube stream
 */
export declare const recordStream: (streamInput: StreamInput, options?: Parameters<typeof customFetch>[1]) => Promise<HistoryEntry>;
export declare const getRecordStreamMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof recordStream>>, TError, {
        data: BodyType<StreamInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof recordStream>>, TError, {
    data: BodyType<StreamInput>;
}, TContext>;
export type RecordStreamMutationResult = NonNullable<Awaited<ReturnType<typeof recordStream>>>;
export type RecordStreamMutationBody = BodyType<StreamInput>;
export type RecordStreamMutationError = ErrorType<unknown>;
/**
* @summary Record a completed YouTube stream
*/
export declare const useRecordStream: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof recordStream>>, TError, {
        data: BodyType<StreamInput>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof recordStream>>, TError, {
    data: BodyType<StreamInput>;
}, TContext>;
export declare const getDeleteHistoryUrl: (videoId: string) => string;
/**
 * @summary Remove a video from recent history
 */
export declare const deleteHistory: (videoId: string, options?: Parameters<typeof customFetch>[1]) => Promise<void>;
export declare const getDeleteHistoryMutationOptions: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteHistory>>, TError, {
        videoId: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteHistory>>, TError, {
    videoId: string;
}, TContext>;
export type DeleteHistoryMutationResult = NonNullable<Awaited<ReturnType<typeof deleteHistory>>>;
export type DeleteHistoryMutationError = ErrorType<unknown>;
/**
* @summary Remove a video from recent history
*/
export declare const useDeleteHistory: <TError = ErrorType<unknown>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteHistory>>, TError, {
        videoId: string;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteHistory>>, TError, {
    videoId: string;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map
