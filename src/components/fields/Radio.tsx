import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";
import { Radio as $Radio, type RadioProps as $RadioProps } from "@mantine/core";

export type RadioProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$RadioProps, "value" | "defaultValue">;

export function RadioCustom<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: RadioProps<T>) {
  const {
    field: { value, onChange: fieldOnChange, ...field },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <$Radio
      value={value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
