/* eslint-disable @typescript-eslint/no-explicit-any */
interface ApiError {
  errors?: { message: string; context: Record<string, any> }[];
  message: string;
}

export function errorMessageFormatter(error: any): string {
  if (error.response?.data) {
    const apiError: ApiError = error.response.data;
    return (
      apiError.errors?.map((err) => err.message).join(', ') || apiError.message
    );
  }
  return error.message || 'An unknown error occurred';
}
