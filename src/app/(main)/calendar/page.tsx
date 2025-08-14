'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventDropArg, EventResizeDoneArg } from '@fullcalendar/core'
import { mockCalendar } from '@/lib/mockCalendar'

export default function CalendarPage() {
  const [events, setEvents] = useState(mockCalendar)

  const handleEventDrop = (info: EventDropArg) => {
    const updatedEvents = events.map(event =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.start?.toISOString(),
            end: info.event.end?.toISOString(),
          }
        : event
    )
    setEvents(updatedEvents)
  }

  const handleEventResize = (info: EventResizeDoneArg) => {
    const updatedEvents = events.map(event =>
      event.id === info.event.id
        ? {
            ...event,
            start: info.event.start?.toISOString(),
            end: info.event.end?.toISOString(),
          }
        : event
    )
    setEvents(updatedEvents)
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        allDaySlot={false}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        events={events}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={(info) => {
          alert(`Session: ${info.event.title}\nLocation: ${info.event.extendedProps.location}`)
        }}
      />
    </div>
  )
}
