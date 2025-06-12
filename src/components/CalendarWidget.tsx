
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';
import { CalendarDays, Sparkles, Star } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  clientName: string;
  contactNo: string;
  hallType: string;
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
      backgroundColor: 'rgb(37 99 235)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
    },
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30 backdrop-blur-sm overflow-hidden">
      <CardContent className="p-4 lg:p-6 xl:p-8">
        <div className="relative">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl border-2 border-blue-200/50 p-4 lg:p-6 w-full bg-gradient-to-br from-white/80 to-blue-50/20 backdrop-blur-sm shadow-inner"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg lg:text-xl font-bold text-blue-800",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-8 w-8 lg:h-10 lg:w-10 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 p-0 opacity-80 hover:opacity-100 rounded-lg transition-all duration-200 border border-blue-200 hover:border-blue-300 text-blue-600"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-blue-600 rounded-md w-10 h-10 lg:w-12 lg:h-12 font-semibold text-sm flex items-center justify-center",
              row: "flex w-full mt-1",
              cell: "h-10 w-10 lg:h-12 lg:w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
              day: cn(
                "h-10 w-10 lg:h-12 lg:w-12 p-0 font-semibold aria-selected:opacity-100 hover:bg-gradient-to-br hover:from-blue-100 hover:to-blue-200 hover:text-blue-700 rounded-lg transition-all duration-200 relative border border-transparent hover:border-blue-200"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:from-blue-600 focus:to-blue-700 shadow-lg ring-2 ring-blue-300",
              day_today: "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700 font-bold ring-2 ring-blue-300 border-blue-300",
              day_outside: "day-outside text-blue-400 opacity-50 aria-selected:bg-blue-100 aria-selected:text-blue-500 aria-selected:opacity-30",
              day_disabled: "text-blue-400 opacity-50",
              day_range_middle: "aria-selected:bg-blue-100 aria-selected:text-blue-700",
              day_hidden: "invisible",
            }}
          />
        </div>
        
        {selectedDate && (
          <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-xl border border-blue-200/50 backdrop-blur-sm shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-lg lg:text-xl font-bold text-blue-800 flex items-center gap-2 mb-2">
                  <CalendarDays className="h-5 w-5 text-blue-500" />
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm lg:text-base text-blue-600 font-medium">
                  {hasEventsOnDate(selectedDate) 
                    ? `${getEventCountForDate(selectedDate)} event(s) scheduled for this day`
                    : 'No events scheduled - perfect day for booking!'
                  }
                </p>
              </div>
              {hasEventsOnDate(selectedDate) && (
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 px-3 lg:px-4 py-1 lg:py-2 text-sm font-semibold shadow-md self-start sm:self-center"
                >
                  {getEventCountForDate(selectedDate)} Events
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
