import React from "react";
import Icon from "metabase/components/Icon";
import { HoveredTimelineEvent } from "./types";
import {
  TimelineEventsList,
  TimelineEventRow,
  TimelineEventIconContainer,
  TimelineEventInfoContainer,
  TimelineEventName,
  TimelineEventDate,
} from "./TimelineEventTooltipContent.styled";

export interface TimelineEventTooltipContentProps {
  hovered: HoveredTimelineEvent;
}

function TimelineEventTooltipContent({
  hovered,
}: TimelineEventTooltipContentProps) {
  const { timelineEvents } = hovered;

  return (
    <TimelineEventsList>
      {timelineEvents.map((timelineEvent, i) => (
        <li key={i}>
          <TimelineEventRow>
            <TimelineEventIconContainer>
              <Icon name={timelineEvent.icon} />
            </TimelineEventIconContainer>
            <TimelineEventInfoContainer>
              <TimelineEventName>{timelineEvent.name}</TimelineEventName>
              <TimelineEventDate
                value={timelineEvent.timestamp}
                unit={timelineEvent.time_matters ? "default" : "day"}
              />
            </TimelineEventInfoContainer>
          </TimelineEventRow>
        </li>
      ))}
    </TimelineEventsList>
  );
}

export default TimelineEventTooltipContent;
