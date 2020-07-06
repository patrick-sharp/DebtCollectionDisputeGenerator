import { Box } from "@chakra-ui/core";
import { useFormikContext } from "formik";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";

const AutoSave = ({ debounceMs = 1000 }) => {
  const formik = useFormikContext();
  // const [isSaved, _setIsSaved] = useState<boolean>(null);

  // const setIsSaved = (_isSaved: boolean) => {
  // _setIsSaved(_isSaved);
  // };

  // const visible = !!formik.isSubmitting || isSaved;

  // const toaster = useToast();
  // const toast = (_title: string) =>
  //   toaster({
  //     title: _title,
  //     isClosable: true,
  //     // render: () => <ToastBox>{_title}</ToastBox>,
  //   });
  // useEffect(() => {
  //

  //   toast(title);
  // }, [isSaved, formik.values]);

  const debouncedSubmit = useCallback(
    _.debounce(() => {
      // toast("Saving...");
      return formik.submitForm().then(() => {
        // setIsSaved(true);
        // toast("Saved.");
      });
    }, debounceMs),
    [formik.submitForm, debounceMs]
  );

  useEffect(() => (debouncedSubmit as unknown) as () => void, [
    debouncedSubmit,
    formik.values,
  ]);

  // return <></>;
  const title = !!formik.isSubmitting
    ? "Saving..."
    : // : isSaved
      // ? "Your changes saved."
      undefined;
  return <ToastBox>{title}</ToastBox>;
};

const ToastBox = ({ children = "" }) => (
  <Box
    pos={"fixed"}
    bottom={0}
    right={0}
    color={"white"}
    backgroundColor={"gray.900"}
  >
    {/* {visible ? <Text m={3}>{title}</Text> : ""} */}
    {children}
  </Box>
);

export default AutoSave;
export { ToastBox };
