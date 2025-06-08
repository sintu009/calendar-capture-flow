
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CalendarWidget from '@/components/CalendarWidget';
import BookingForm from '@/components/BookingForm';
import DetailsModal from '@/components/DetailsModal';
import { Calendar, Book, Check } from 'lucide-react';

// Sample events data - in a real app, this would come from a backend
const sampleEvents = [
  {
    id: '1',
    title: 'Wedding Photography',
    date: new Date(2025, 5, 15), // June 15, 2025
    time: '14:00',
    description: 'Outdoor wedding ceremony and reception photography',
    status: 'confirmed' as const,
    clientName: 'John & Sarah',
    contactNo: '+1234567890'
  },
  {
    id: '2',
    title: 'Corporate Event',
    date: new Date(2025, 5, 20), // June 20, 2025
    time: '09:00',
    description: 'Annual company meeting and team building activities',
    status: 'pending' as const,
    clientName: 'Tech Corp',
    contactNo: '+1987654321'
  },
  {
    id: '3',
    title: 'Birthday Party',
    date: new Date(2025, 5, 25), // June 25, 2025
    time: '16:00',
    description: 'Kids birthday party with decorations and entertainment',
    status: 'confirmed' as const,
    clientName: 'Emily Johnson',
    contactNo: '+1122334455'
  }
];

const Index = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleCheckDetails = () => {
    if (!selectedDate) {
      // If no date is selected, select today
      setSelectedDate(new Date());
    }
    setIsDetailsOpen(true);
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
              events={sampleEvents}
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
                    <span className="font-medium">{sampleEvents.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confirmed</span>
                    <span className="font-medium text-green-600">
                      {sampleEvents.filter(e => e.status === 'confirmed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="font-medium text-yellow-600">
                      {sampleEvents.filter(e => e.status === 'pending').length}
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
        />
        
        <DetailsModal 
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          selectedDate={selectedDate}
          events={sampleEvents}
        />
      </div>
    </div>
  );
};

export default Index;
