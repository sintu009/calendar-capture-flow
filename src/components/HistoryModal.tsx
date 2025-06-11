
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
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
            <History className="h-6 w-6 text-primary" />
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
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{pastEvents.length}</div>
                <div className="text-sm text-green-700">Past Events</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">{upcomingEvents.length}</div>
                <div className="text-sm text-purple-700">Upcoming Events</div>
              </CardContent>
            </Card>
          </div>

          {events.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="text-center py-12">
                <History className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium text-muted-foreground mb-2">
                  No events found
                </div>
                <p className="text-sm text-muted-foreground">
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
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Event Details</TableHead>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Client Info</TableHead>
                        <TableHead className="font-semibold">Hall Type</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((event) => (
                          <TableRow key={event.id} className="hover:bg-muted/30">
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-foreground">{event.title}</div>
                                {event.description && (
                                  <div className="text-xs text-muted-foreground flex items-center gap-1">
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
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  {format(event.date, 'MMM dd, yyyy')}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {event.time}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm font-medium">
                                  <User className="h-3 w-3 text-muted-foreground" />
                                  {event.clientName}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="h-3 w-3" />
                                  {event.contactNo}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
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
          
          <div className="flex justify-end pt-4 border-t">
            <Button onClick={onClose} variant="outline" className="min-w-[100px]">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryModal;
