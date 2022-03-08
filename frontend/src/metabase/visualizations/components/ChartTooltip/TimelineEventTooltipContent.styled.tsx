import styled from "@emotion/styled";
import DateTime from "metabase/components/DateTime";
import { color, darken } from "metabase/lib/colors";

export const TimelineEventsList = styled.ul`
  max-width: 300px;

  li:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

export const TimelineEventRow = styled.div`
  display: flex;
`;

export const TimelineEventIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0.25rem;
  padding-right: 0.875rem;
`;

export const TimelineEventInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TimelineEventName = styled.span`
  font-size: 0.875rem;
  font-weight: bold;
`;

export const TimelineEventDate = styled(DateTime)`
  font-size: 0.75rem;
  color: ${darken("white", 0.05)};
  margin-top: 0.0625rem;
`;
