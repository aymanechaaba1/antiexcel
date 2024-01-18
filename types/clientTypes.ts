import { type UseTRPCQueryResult } from '@trpc/react-query/shared';
import { RouterOutput } from '@/server/trpc';
import { AppRouter } from '@/server';
import { type TRPCClientErrorLike } from '@trpc/react-query';

export type Student = UseTRPCQueryResult<
  RouterOutput['getStudent'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type Students = UseTRPCQueryResult<
  RouterOutput['getStudents'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type Teacher = UseTRPCQueryResult<
  RouterOutput['getTeacher'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type Teachers = UseTRPCQueryResult<
  RouterOutput['getTeachers'],
  TRPCClientErrorLike<AppRouter>
>['data'];

export type User = UseTRPCQueryResult<
  RouterOutput['getUser'],
  TRPCClientErrorLike<AppRouter>
>['data'];
