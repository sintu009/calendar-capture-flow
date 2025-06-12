
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format, isPast } from 'date-fns';
import { History, Calendar, Clock, User, Phone, FileText, MapPin } from 'lucide-react';

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

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, events }) => {
  const pastEvents = events.filter(event => isPast(event.date));
  const upcomingEvents = events.filter(event => !isPast(event.date));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'cancelled': return 'bg-white text-blue-500 border-blue-200';
      default: return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  const getHallTypeDisplay = (hallType: string) => {
    const hallTypeMap: Record<string, string> = {
      banquet: 'Banquet Hall',
      kitty: 'Kitty Party Hall',
      restaurant: 'Restaurant'
    };
    return hallTypeMap[hallType] || hallType;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <History className="h-6 w-6 text-blue-600" />
            Event History
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                <div className="text-sm text-blue-700">Total Events</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-700">{pastEvents.length}</div>
                <div className="text-sm text-blue-800">Past Events</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-150 border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{upcomingEvents.length}</div>
                <div className="text-sm text-blue-700">Upcoming Events</div>
              </CardContent>
            </Card>
          </div>

          {events.length === 0 ? (
            <Card className="border-dashed border-blue-200">
              <CardContent className="text-center py-12">
                <History className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                <div className="text-lg font-medium text-blue-600 mb-2">
                  No events found
                </div>
                <p className="text-sm text-blue-500">
                  Start booking events to see your history here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Events Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="font-semibold text-blue-700">Event Details</TableHead>
                        <TableHead className="font-semibold text-blue-700">Date & Time</TableHead>
                        <TableHead className="font-semibold text-blue-700">Client Info</TableHead>
                        <TableHead className="font-semibold text-blue-700">Hall Type</TableHead>
                        <TableHead className="font-semibold text-blue-700">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((event) => (
                          <TableRow key={event.id} className="hover:bg-blue-50">
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-blue-800">{event.title}</div>
                                {event.description && (
                                  <div className="text-xs text-blue-600 flex items-center gap-1">
                                    <FileText className="h-3 w-3" />
                                    {event.description.length > 50 
                                      ? `${event.description.substring(0, 50)}...` 
                                      : event.description
                                    }
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Calendar className="h-3 w-3 text-blue-600" />
                                  {format(event.date, 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-blue-600">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm font-medium">
                                  <User className="h-3 w-3 text-blue-600" />
                                  {event.clientName}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-blue-600">
                                  <Phone className="h-3 w-3" />
                                  {event.contactNo}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-blue-600" />
                                {getHallTypeDisplay(event.hallType)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${getStatusColor(event.status)} border text-xs`}>
                                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
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

export default HistoryModal;
