
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CalendarWidget from '@/components/CalendarWidget';
import BookingForm from '@/components/BookingForm';
import DetailsModal from '@/components/DetailsModal';
import { Calendar, Book, Check, Users, Clock, Star, Sparkles } from 'lucide-react';

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
    hallType: string;
    description: string;
  }) => {
    const hallTypeDisplayMap: Record<string, string> = {
      banquet: 'Banquet Hall',
      kitty: 'Kitty Party Hall',
      restaurant: 'Restaurant'
    };

    const newEvent: Event = {
      id: Date.now().toString(),
      title: `${hallTypeDisplayMap[bookingData.hallType]} - ${bookingData.name}`,
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-pink-400/15 to-orange-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-10 w-28 h-28 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6 lg:space-y-8 relative">
        {/* Header */}
        <div className="text-center space-y-4 lg:space-y-6 py-8 lg:py-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4 animate-bounce">
            <Calendar className="h-8 w-8 text-purple-600" />
            <Sparkles className="h-6 w-6 text-pink-500 ml-2" />
          </div>
          <div className="space-y-3 lg:space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight">
              Event Booking
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calendar
            </h2>
          </div>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Seamlessly manage your events, schedule bookings, and track your calendar all in one elegant platform. 
            Select a date to view details or book a new event with ease.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Calendar className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-100">Total Events</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{totalEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Check className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-100">Confirmed</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{confirmedEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-yellow-500 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white sm:col-span-2 lg:col-span-1">
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="p-2 lg:p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <Clock className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-100">Pending</p>
                  <p className="text-xl lg:text-2xl font-bold text-white">{pendingEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <CalendarWidget 
              events={events}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Actions Section */}
          <div className="space-y-4 lg:space-y-6 order-1 lg:order-2">
            <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg backdrop-blur-sm">
              <CardHeader className="text-center pb-3 lg:pb-4">
                <CardTitle className="text-xl lg:text-2xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  <Star className="h-5 w-5 text-purple-500" />
                  Quick Actions
                </CardTitle>
                <p className="text-gray-600 text-xs lg:text-sm">
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
              <CardContent className="space-y-3 lg:space-y-4 p-4 lg:p-6">
                <Button 
                  onClick={handleBookNow}
                  className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-white border-0"
                  size="lg"
                >
                  <Book className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                  Book New Event
                </Button>

                <Button 
                  onClick={handleCheckDetails}
                  variant="outline"
                  className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold border-2 border-purple-200 hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-purple-600"
                  size="lg"
                >
                  <Check className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                  View Details
                </Button>
              </CardContent>
            </Card>

            {/* Event Summary */}
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <Users className="h-5 w-5 text-blue-500" />
                  Event Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 lg:space-y-4">
                <div className="space-y-2 lg:space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                    <span className="text-sm font-medium text-purple-700">Total Events</span>
                    <span className="font-bold text-lg text-purple-600">{totalEvents}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">
                    <span className="text-sm font-medium text-green-700">Confirmed</span>
                    <span className="font-bold text-lg text-green-600">{confirmedEvents}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg border border-orange-200">
                    <span className="text-sm font-medium text-orange-700">Pending</span>
                    <span className="font-bold text-lg text-orange-600">{pendingEvents}</span>
                  </div>
                </div>
                
                {selectedDate && events.filter(event => 
                  event.date.toDateString() === selectedDate.toDateString()
                ).length > 0 && (
                  <div className="mt-4 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-blue-700 mb-2">Selected Date Events</p>
                    <div className="space-y-2">
                      {events
                        .filter(event => event.date.toDateString() === selectedDate.toDateString())
                        .map(event => (
                          <div key={event.id} className="text-xs text-blue-600 bg-white/70 p-2 rounded border border-blue-100">
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
