'use client'

import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventDropArg } from '@fullcalendar/core'
import type { EventResizeDoneArg } from '@fullcalendar/interaction'
import { mockCalendar } from '@/lib/mockCalendar'

// Flexible event shape (drop/resize can yield undefined start/end)
type CalEvent = {
  id: string
  title: string
  start?: string
  end?: string
  extendedProps?: {
    client: string
    staff: string
    location: string
  }
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalEvent[]>(mockCalendar as CalEvent[])

  const handleEventDrop = (info: EventDropArg) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === info.event.id
          ? {
              ...ev,
              start: info.event.start ? info.event.start.toISOString() : ev.start,
              end: info.event.end ? info.event.end.toISOString() : ev.end,
            }
          : ev
      )
    )
  }

  const handleEventResize = (info: EventResizeDoneArg) => {
    setEvents(prev =>
      prev.map(ev =>
        ev.id === info.event.id
          ? {
              ...ev,
              start: info.event.start ? info.event.start.toISOString() : ev.start,
              end: info.event.end ? info.event.end.toISOString() : ev.end,
            }
          : ev
      )
    )
  }

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable
        selectable
        allDaySlot={false}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        events={events}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={(info) => {
          alert(`Session: ${info.event.title}\nLocation: ${info.event.extendedProps?.location ?? 'N/A'}`)
        }}
      />
    </div>
  )
}
