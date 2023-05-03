/* eslint-disable */
export type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export const handleAsync =
  <T>(fn: AsyncFunction<T>): AsyncFunction<T> =>
  async (...args: any[]): Promise<T> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      throw error;
    }
  };
