
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

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
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Event Details - {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-4">
          {selectedDateEvents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-muted-foreground text-lg">No events scheduled for this date</div>
              <p className="text-sm text-muted-foreground mt-2">
                This day is available for new bookings
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {selectedDateEvents.length} event(s) scheduled
              </div>
              
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge className={getStatusColor(event.status)}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Time:</span> {event.time}
                    </div>
                    {event.clientName && (
                      <div>
                        <span className="font-medium">Client:</span> {event.clientName}
                      </div>
                    )}
                    {event.contactNo && (
                      <div className="col-span-2">
                        <span className="font-medium">Contact:</span> {event.contactNo}
                      </div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <div className="font-medium text-sm mb-2">Description:</div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
