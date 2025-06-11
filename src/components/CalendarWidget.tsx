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
      backgroundColor: 'rgb(147 51 234)',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
    },
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm overflow-hidden">
{/*       <CardHeader className="text-center pb-4 lg:pb-6 bg-gradient-to-r from-purple-100/50 via-pink-100/50 to-blue-100/50 border-b border-purple-200/50"> */}
{/*         <div className="flex items-center justify-center gap-3 mb-3 lg:mb-4">
          <div className="p-2 lg:p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg">
            <CalendarDays className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
          </div>
          <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-purple-500 animate-pulse" />
          <Star className="h-4 w-4 lg:h-5 lg:w-5 text-pink-500 animate-pulse delay-500" />
        </div> */}
{/*         <CardTitle className="text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">
          Event Calendar
        </CardTitle> */}
{/*         <p className="text-gray-600 text-sm lg:text-base font-medium px-4">Select a date to view or book events</p>
      </CardHeader> */}
      <CardContent className="p-4 lg:p-6 xl:p-8">
        <div className="relative">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl border-2 border-purple-200/50 p-4 lg:p-6 w-full bg-gradient-to-br from-white/80 to-purple-50/20 backdrop-blur-sm shadow-inner"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-lg lg:text-xl font-bold text-gray-800",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-8 w-8 lg:h-10 lg:w-10 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 p-0 opacity-80 hover:opacity-100 rounded-lg transition-all duration-200 border border-purple-200 hover:border-purple-300 text-purple-600"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-gray-600 rounded-md w-10 h-10 lg:w-12 lg:h-12 font-semibold text-sm flex items-center justify-center",
              row: "flex w-full mt-1",
              cell: "h-10 w-10 lg:h-12 lg:w-12 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
              day: cn(
                "h-10 w-10 lg:h-12 lg:w-12 p-0 font-semibold aria-selected:opacity-100 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-100 hover:text-purple-700 rounded-lg transition-all duration-200 relative border border-transparent hover:border-purple-200"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 focus:from-purple-600 focus:to-pink-600 shadow-lg ring-2 ring-purple-300",
              day_today: "bg-gradient-to-br from-blue-100 to-purple-100 text-blue-700 font-bold ring-2 ring-blue-300 border-blue-300",
              day_outside: "day-outside text-gray-400 opacity-50 aria-selected:bg-purple-100 aria-selected:text-gray-500 aria-selected:opacity-30",
              day_disabled: "text-gray-400 opacity-50",
              day_range_middle: "aria-selected:bg-purple-100 aria-selected:text-purple-700",
              day_hidden: "invisible",
            }}
          />
        </div>
        
        {selectedDate && (
          <div className="mt-6 lg:mt-8 p-4 lg:p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 rounded-xl border border-purple-200/50 backdrop-blur-sm shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-lg lg:text-xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                  <CalendarDays className="h-5 w-5 text-purple-500" />
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm lg:text-base text-gray-600 font-medium">
                  {hasEventsOnDate(selectedDate) 
                    ? `${getEventCountForDate(selectedDate)} event(s) scheduled for this day`
                    : 'No events scheduled - perfect day for booking!'
                  }
                </p>
              </div>
              {hasEventsOnDate(selectedDate) && (
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 lg:px-4 py-1 lg:py-2 text-sm font-semibold shadow-md self-start sm:self-center"
                >
                  {getEventCountForDate(selectedDate)} Events
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Legend */}
        <div className="mt-6 lg:mt-8 flex flex-wrap items-center justify-center gap-4 lg:gap-8 text-sm">
          <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 shadow-sm"></div>
            <span className="text-purple-700 font-medium text-xs lg:text-sm">Has Events</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border border-blue-200">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-blue-100 to-purple-100 shadow-sm border-2 border-blue-300"></div>
            <span className="text-blue-700 font-medium text-xs lg:text-sm">Today</span>
          </div>
          <div className="flex items-center gap-2 lg:gap-3 p-2 lg:p-3 bg-gradient-to-r from-gray-100 to-purple-50 rounded-lg border border-gray-200">
            <div className="w-4 h-4 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-white shadow-sm"></div>
            <span className="text-gray-700 font-medium text-xs lg:text-sm">Selected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
