import { Suspense } from "react";
import EditPrompt from "@/components/EditPrompt";
import SpinnerButton from "@/components/SpinnerButton";

const EditPromptPage = () => {
  return (
    <Suspense fallback={<div><SpinnerButton title="Loading"/></div>}>
      <EditPrompt />
    </Suspense>
  );
};

export default EditPromptPage;
