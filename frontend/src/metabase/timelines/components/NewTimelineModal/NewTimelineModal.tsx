import React, { useCallback, useMemo } from "react";
import { t } from "ttag";
import { getDefaultTimelineIcon } from "metabase/lib/timeline";
import Form from "metabase/containers/Form";
import forms from "metabase/entities/timelines/forms";
import { canonicalCollectionId } from "metabase/collections/utils";
import { Collection, Timeline } from "metabase-types/api";
import ModalHeader from "../ModalHeader";
import { ModalBody } from "./NewTimelineModal.styled";

export interface NewTimelineModalProps {
  collection: Collection;
  onSubmit: (values: Partial<Timeline>, collection: Collection) => void;
  onCancel: () => void;
  onClose?: () => void;
}

const NewTimelineModal = ({
  collection,
  onSubmit,
  onCancel,
  onClose,
}: NewTimelineModalProps): JSX.Element => {
  const initialValues = useMemo(
    () => ({
      collection_id: canonicalCollectionId(collection.id),
      icon: getDefaultTimelineIcon(),
    }),
    [collection],
  );

  const handleSubmit = useCallback(
    async (values: Partial<Timeline>) => {
      await onSubmit(values, collection);
    },
    [collection, onSubmit],
  );

  return (
    <div>
      <ModalHeader title={t`New event timeline`} onClose={onClose} />
      <ModalBody>
        <Form
          form={forms.collection}
          initialValues={initialValues}
          isModal={true}
          onSubmit={handleSubmit}
          onClose={onCancel}
        />
      </ModalBody>
    </div>
  );
};

export default NewTimelineModal;
