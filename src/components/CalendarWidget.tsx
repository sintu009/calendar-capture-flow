
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  clientName?: string;
  contactNo?: string;
}

interface CalendarWidgetProps {
  events: Event[];
  selectedDate?: Date;
  onDateSelect: (date: Date | undefined) => void;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ events, selectedDate, onDateSelect }) => {
  const hasEventsOnDate = (date: Date) => {
    return events.some(event => isSameDay(event.date, date));
  };

  const getEventCountForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date)).length;
  };

  const modifiers = {
    hasEvents: (date: Date) => hasEventsOnDate(date),
  };

  const modifiersStyles = {
    hasEvents: {
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
      fontWeight: 'bold',
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          className="rounded-md border p-3 pointer-events-auto w-full"
          components={{
            Day: ({ date, ...props }) => {
              const eventCount = getEventCountForDate(date);
              return (
                <div className="relative">
                  <button {...props} />
                  {eventCount > 0 && (
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
                    >
                      {eventCount}
                    </Badge>
                  )}
                </div>
              );
            },
          }}
        />
        
        {selectedDate && (
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              Selected: {format(selectedDate, 'MMMM d, yyyy')}
            </p>
            <p className="text-xs text-muted-foreground">
              {hasEventsOnDate(selectedDate) 
                ? `${getEventCountForDate(selectedDate)} event(s) scheduled`
                : 'No events scheduled'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
