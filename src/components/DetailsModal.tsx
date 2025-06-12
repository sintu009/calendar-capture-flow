
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { Calendar, Clock, User, Phone, FileText } from 'lucide-react';

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

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  events: Event[];
}

const DetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, selectedDate, events }) => {
  const selectedDateEvents = events.filter(event => 
    selectedDate && format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'cancelled': return 'bg-white text-blue-500 border-blue-200';
      default: return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Event Details - {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {selectedDateEvents.length === 0 ? (
            <Card className="border-dashed border-blue-200">
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <div className="text-lg font-medium text-blue-600 mb-2">
                  No events scheduled for this date
                </div>
                <p className="text-sm text-blue-500">
                  This day is available for new bookings. Click "Book Now" to schedule an event.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-blue-600">
                  {selectedDateEvents.length} event(s) scheduled for this day
                </div>
                <Badge variant="outline" className="text-xs border-blue-200 text-blue-600">
                  Total Events: {selectedDateEvents.length}
                </Badge>
              </div>
              
              {selectedDateEvents.map((event, index) => (
                <Card key={event.id} className="border-l-4 border-l-blue-600">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header with title and status */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-blue-800 mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-blue-600">
                            Event #{index + 1}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(event.status)} border`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </Badge>
                      </div>

                      <Separator className="bg-blue-200" />

                      {/* Event details grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <Clock className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-800">Time</p>
                            <p className="text-sm text-blue-600">{event.time}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-800">Client Name</p>
                            <p className="text-sm text-blue-600">{event.clientName}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <Phone className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-800">Contact Number</p>
                            <p className="text-sm text-blue-600">{event.contactNo}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <Calendar className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-blue-800">Date</p>
                            <p className="text-sm text-blue-600">
                              {format(event.date, 'PPP')}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Description section */}
                      {event.description && (
                        <>
                          <Separator className="bg-blue-200" />
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-blue-600" />
                              <p className="text-sm font-medium text-blue-800">Event Description</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4">
                              <p className="text-sm text-blue-700 leading-relaxed">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="flex justify-end pt-4 border-t border-blue-200">
            <Button onClick={onClose} variant="outline" className="min-w-[100px] border-blue-300 text-blue-600 hover:bg-blue-50">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
