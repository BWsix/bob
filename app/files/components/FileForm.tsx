import { Form, FormProps } from "app/core/components/Form";
import { LabeledTextField } from "app/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "app/core/components/Form";

export function FileForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="標題" />
      <LabeledTextField name="description" label="簡述" />
      <LabeledTextField name="externalUrl" label="外部連結" />
    </Form>
  );
}
