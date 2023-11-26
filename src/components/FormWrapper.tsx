/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import {
  DeepPartial,
  FormProvider,
  SubmitHandler,
  useForm,
  ValidationMode,
} from "react-hook-form";

export type TFormWrapper<T> = {
  onSubmit?: SubmitHandler<T>;
  width?: string;
  method?: keyof ValidationMode;
  initialValues?: T;
  id: string;
  children: any;
  noValidate?: boolean;
};
const FormWrapper = <T extends unknown>({
  onSubmit,
  id,
  initialValues,
  children,
  method = "onSubmit",
  width = "100%",
  noValidate = true,
}: TFormWrapper<T>) => {
  const methods = useForm<T>({
    // @ts-ignore
    defaultValues: initialValues as DeepPartial<T>,
    mode: method,
  });

  useEffect(() => {
    if (initialValues) {
      for (const [key, value] of Object.entries(initialValues)) {
        methods.setValue(key as any, value);
      }
    }
  }, [initialValues]);

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        style={{ width: width }}
        onSubmit={methods.handleSubmit(onSubmit)}
        onChange={
          method === "onChange" ? methods.handleSubmit(onSubmit) : undefined
        }
        noValidate={noValidate}
      >
        {typeof children === "function" ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
