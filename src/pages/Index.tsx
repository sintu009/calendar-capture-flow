
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CalendarWidget from '@/components/CalendarWidget';
import BookingForm from '@/components/BookingForm';
import DetailsModal from '@/components/DetailsModal';
import HistoryModal from '@/components/HistoryModal';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useEvents } from '@/hooks/useEvents';
import { Book, Check, Users, Star, History } from 'lucide-react';

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { events, loading: eventsLoading, addEvent } = useEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || eventsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth page
  }

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

  const handleViewHistory = () => {
    setIsHistoryOpen(true);
  };

  const handleBookingSubmit = async (bookingData: {
    name: string;
    contactNo: string;
    date: Date;
    time: string;
    hallType: string;
    description: string;
  }) => {
    await addEvent(bookingData);
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
        <Navigation />

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
{/*                 <CardTitle className="text-xl lg:text-2xl font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  <Star className="h-5 w-5 text-purple-500" />
                  Quick Actions
                </CardTitle> */}
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

                <Button 
                  onClick={handleViewHistory}
                  variant="outline"
                  className="w-full h-12 lg:h-14 text-base lg:text-lg font-semibold border-2 border-blue-200 hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg text-blue-600"
                  size="lg"
                >
                  <History className="mr-2 lg:mr-3 h-5 w-5 lg:h-6 lg:w-6" />
                  View History
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

        <HistoryModal 
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          events={events}
        />
      </div>
    </div>
  );
};

export default Index;
