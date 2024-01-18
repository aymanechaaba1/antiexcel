import { caller } from '@/server';

export type Student = Awaited<ReturnType<(typeof caller)['getStudent']>>;
export type Students = Awaited<ReturnType<(typeof caller)['getStudents']>>;
