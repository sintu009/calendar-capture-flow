
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CalendarWidget from '@/components/CalendarWidget';
import BookingForm from '@/components/BookingForm';
import DetailsModal from '@/components/DetailsModal';
import { Calendar, Book, Check } from 'lucide-react';

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

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleCheckDetails = () => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
    setIsDetailsOpen(true);
  };

  const handleBookingSubmit = (bookingData: {
    name: string;
    contactNo: string;
    date: Date;
    time: string;
    description: string;
  }) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: `Event for ${bookingData.name}`,
      date: bookingData.date,
      time: bookingData.time,
      description: bookingData.description,
      status: 'confirmed',
      clientName: bookingData.name,
      contactNo: bookingData.contactNo
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Event Booking Calendar
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Manage your events, schedule bookings, and track your calendar all in one place. 
            Select a date to view details or book a new event.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <CalendarWidget 
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Actions Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardContent className="space-y-6 p-0">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold mb-2">Quick Actions</h2>
                  <p className="text-muted-foreground text-sm">
                    {selectedDate 
                      ? `Selected: ${selectedDate.toLocaleDateString()}`
                      : 'Select a date to get started'
                    }
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={handleBookNow}
                    className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
                    size="lg"
                  >
                    <Book className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>

                  <Button 
                    onClick={handleCheckDetails}
                    variant="outline"
                    className="w-full h-12 text-lg font-medium border-2 hover:bg-muted transition-all duration-200 transform hover:scale-105"
                    size="lg"
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Check Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Summary */}
            <Card className="p-6">
              <CardContent className="p-0">
                <h3 className="font-semibold mb-4">Event Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Events</span>
                    <span className="font-medium">{events.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confirmed</span>
                    <span className="font-medium text-green-600">
                      {events.filter(e => e.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="font-medium text-yellow-600">
                      {events.filter(e => e.status === 'pending').length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <BookingForm 
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          selectedDate={selectedDate}
          onSubmit={handleBookingSubmit}
        />
        
        <DetailsModal 
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          selectedDate={selectedDate}
          events={events}
        />
      </div>
    </div>
  );
};

export default Index;
