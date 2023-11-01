import type { ReactElement } from 'react';

type SubmitFn<T> = (data: FormData | string) => Promise<T>;

export type UseFormRender<T = unknown> = (data: T, onSubmit: SubmitFn<T>) => UseFormRenderResult;

export type UseFormRenderResult = {
    /** Indicates if the current change(s) can be saved. */
    canSave?: boolean;
    /** The function that is called upon submitting. */
    onSubmit: () => void;
    /** The function that resets the current value. */
    reset?: () => void;

    component: ReactElement;
};

