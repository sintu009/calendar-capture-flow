
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CalendarWidget from '@/components/CalendarWidget';
import BookingForm from '@/components/BookingForm';
import DetailsModal from '@/components/DetailsModal';
import { Calendar, Book, Check, Users, Clock, Star } from 'lucide-react';

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

  const confirmedEvents = events.filter(e => e.status === 'confirmed').length;
  const pendingEvents = events.filter(e => e.status === 'pending').length;
  const totalEvents = events.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto p-4 space-y-8 relative">
        {/* Header */}
        <div className="text-center space-y-6 py-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4 animate-fade-in">
            <Calendar className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
              Event Booking
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground/80">
              Calendar
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Seamlessly manage your events, schedule bookings, and track your calendar all in one elegant platform. 
            Select a date to view details or book a new event with ease.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold text-foreground">{totalEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-700">Confirmed</p>
                  <p className="text-2xl font-bold text-green-800">{confirmedEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border-yellow-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-yellow-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-800">{pendingEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-3">
            <CalendarWidget 
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Actions Section */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  {selectedDate 
                    ? `Selected: ${selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'short',
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}`
                    : 'Select a date to get started'
                  }
                </p>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <Button 
                  onClick={handleBookNow}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <Book className="mr-3 h-6 w-6" />
                  Book New Event
                </Button>

                <Button 
                  onClick={handleCheckDetails}
                  variant="outline"
                  className="w-full h-14 text-lg font-semibold border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  size="lg"
                >
                  <Check className="mr-3 h-6 w-6" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Event Summary */}
            <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Event Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-sm font-medium text-muted-foreground">Total Events</span>
                    <span className="font-bold text-lg text-foreground">{totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-green-700">Confirmed</span>
                    <span className="font-bold text-lg text-green-600">{confirmedEvents}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <span className="text-sm font-medium text-yellow-700">Pending</span>
                    <span className="font-bold text-lg text-yellow-600">{pendingEvents}</span>
                  </div>
                </div>
                
                {selectedDate && events.filter(event => 
                  event.date.toDateString() === selectedDate.toDateString()
                ).length > 0 && (
                  <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm font-medium text-primary mb-2">Selected Date Events</p>
                    <div className="space-y-2">
                      {events
                        .filter(event => event.date.toDateString() === selectedDate.toDateString())
                        .map(event => (
                          <div key={event.id} className="text-xs text-muted-foreground bg-background/50 p-2 rounded">
                            <div className="font-medium">{event.clientName}</div>
                            <div>{event.time}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                )}
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
