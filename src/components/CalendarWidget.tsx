
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format, isSameDay } from 'date-fns';
import { CalendarDays, Sparkles } from 'lucide-react';

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
      borderRadius: '8px',
      position: 'relative',
    },
  };

  return (
    <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-card via-card/95 to-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader className="text-center pb-4 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>
          <Sparkles className="h-5 w-5 text-primary/60" />
        </div>
        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          Event Calendar
        </CardTitle>
        <p className="text-muted-foreground text-sm font-medium">Select a date to view or book events</p>
      </CardHeader>
      <CardContent className="p-8">
        <div className="relative">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateSelect}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-xl border-2 border-border/30 p-6 w-full bg-gradient-to-br from-background/50 to-muted/20 backdrop-blur-sm shadow-inner"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-xl font-bold text-foreground",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                "h-10 w-10 bg-muted/50 hover:bg-primary/10 p-0 opacity-70 hover:opacity-100 rounded-lg transition-all duration-200 border border-border/30 hover:border-primary/30"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex mb-2",
              head_cell: "text-muted-foreground rounded-md w-12 h-12 font-semibold text-sm flex items-center justify-center",
              row: "flex w-full mt-1",
              cell: "h-12 w-12 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: cn(
                "h-12 w-12 p-0 font-semibold aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 relative border border-transparent hover:border-primary/20"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground shadow-lg ring-2 ring-primary/20",
              day_today: "bg-accent text-accent-foreground font-bold ring-2 ring-primary/30",
              day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </div>
        
        {selectedDate && (
          <div className="mt-8 p-6 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 rounded-xl border border-border/30 backdrop-blur-sm shadow-inner">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-foreground flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                </p>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {hasEventsOnDate(selectedDate) 
                    ? `${getEventCountForDate(selectedDate)} event(s) scheduled for this day`
                    : 'No events scheduled - perfect day for booking!'
                  }
                </p>
              </div>
              {hasEventsOnDate(selectedDate) && (
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-semibold shadow-sm"
                >
                  {getEventCountForDate(selectedDate)} Events
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Enhanced Legend */}
        <div className="mt-8 flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="w-4 h-4 rounded-md bg-primary shadow-sm"></div>
            <span className="text-muted-foreground font-medium">Has Events</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg border border-accent">
            <div className="w-4 h-4 rounded-md bg-accent shadow-sm"></div>
            <span className="text-muted-foreground font-medium">Today</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
            <div className="w-4 h-4 rounded-md bg-primary/20 border-2 border-primary/40"></div>
            <span className="text-muted-foreground font-medium">Selected</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarWidget;
