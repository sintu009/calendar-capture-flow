
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { CalendarIcon, User, Phone, Clock, FileText, Send, X, Sparkles, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date;
  onSubmit: (bookingData: {
    name: string;
    contactNo: string;
    date: Date;
    time: string;
    hallType: string;
    description: string;
  }) => Promise<void>;
}

const BookingForm: React.FC<BookingFormProps> = ({ isOpen, onClose, selectedDate, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactNo: '',
    date: selectedDate || new Date(),
    time: '',
    hallType: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomTime, setShowCustomTime] = useState(false);

  const predefinedTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log('Submitting booking data:', formData);
      await onSubmit(formData);
      
      // Reset form after successful submission
      setFormData({
        name: '',
        contactNo: '',
        date: new Date(),
        time: '',
        hallType: '',
        description: ''
      });
      setShowCustomTime(false);
      
      onClose();
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | Date) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimeSelect = (value: string) => {
    if (value === 'custom') {
      setShowCustomTime(true);
      setFormData(prev => ({ ...prev, time: '' }));
    } else {
      setShowCustomTime(false);
      setFormData(prev => ({ ...prev, time: value }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50/30 to-blue-100/30 border-0 shadow-2xl mx-4">
        <DialogHeader className="text-center space-y-4 pb-4 lg:pb-6">
          <div className="mx-auto w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg">
            <CalendarIcon className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
            <Sparkles className="h-4 w-4 text-white/80 ml-1" />
          </div>
          <DialogTitle className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight">
            Book Your Event
          </DialogTitle>
          <p className="text-blue-600 text-sm lg:text-base">Fill in the details below to schedule your event</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6 mt-4 lg:mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2 text-blue-700">
                <User className="h-4 w-4 text-blue-500" />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="h-10 lg:h-12 border-2 border-blue-200 focus:border-blue-400 rounded-lg transition-all duration-200 bg-white/80"
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <Label htmlFor="contact" className="text-sm font-semibold flex items-center gap-2 text-blue-700">
                <Phone className="h-4 w-4 text-blue-500" />
                Contact Number
              </Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Enter your contact number"
                value={formData.contactNo}
                onChange={(e) => handleInputChange('contactNo', e.target.value)}
                required
                className="h-10 lg:h-12 border-2 border-blue-200 focus:border-blue-400 rounded-lg transition-all duration-200 bg-white/80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div className="space-y-2 lg:space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2 text-blue-700">
                <CalendarIcon className="h-4 w-4 text-blue-500" />
                Select Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 lg:h-12 justify-start text-left font-normal border-2 border-blue-200 hover:border-blue-400 transition-all duration-200 bg-white/80",
                      !formData.date && "text-blue-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 lg:mr-3 h-4 w-4" />
                    {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border-2 border-blue-200 shadow-xl" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && handleInputChange('date', date)}
                    initialFocus
                    className="p-3 lg:p-4 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2 lg:space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2 text-blue-700">
                <Clock className="h-4 w-4 text-blue-500" />
                Preferred Time
              </Label>
              <Select value={showCustomTime ? 'custom' : formData.time} onValueChange={handleTimeSelect} required>
                <SelectTrigger className="h-10 lg:h-12 border-2 border-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/80">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-blue-200 shadow-xl max-h-60">
                  {predefinedTimes.map((time) => (
                    <SelectItem key={time} value={time} className="focus:bg-blue-50 cursor-pointer">
                      {time}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom" className="focus:bg-blue-50 cursor-pointer font-medium text-blue-600">
                    Custom Time
                  </SelectItem>
                </SelectContent>
              </Select>
              
              {showCustomTime && (
                <Input
                  type="time"
                  placeholder="Enter custom time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  required
                  className="h-10 lg:h-12 border-2 border-blue-200 focus:border-blue-400 rounded-lg transition-all duration-200 bg-white/80 mt-2"
                />
              )}
            </div>
          </div>

          <div className="space-y-2 lg:space-y-3">
            <Label className="text-sm font-semibold flex items-center gap-2 text-blue-700">
              <MapPin className="h-4 w-4 text-blue-500" />
              Hall Type
            </Label>
            <Select value={formData.hallType} onValueChange={(value) => handleInputChange('hallType', value)} required>
              <SelectTrigger className="h-10 lg:h-12 border-2 border-blue-200 focus:border-blue-400 transition-all duration-200 bg-white/80">
                <SelectValue placeholder="Select hall type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-blue-200 shadow-xl">
                <SelectItem value="banquet" className="focus:bg-blue-50 cursor-pointer">
                  Banquet Hall
                </SelectItem>
                <SelectItem value="kitty" className="focus:bg-blue-50 cursor-pointer">
                  Kitty Party Hall
                </SelectItem>
                <SelectItem value="restaurant" className="focus:bg-blue-50 cursor-pointer">
                  Restaurant
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 lg:space-y-3">
            <Label htmlFor="description" className="text-sm font-semibold flex items-center gap-2 text-blue-700">
              <FileText className="h-4 w-4 text-blue-500" />
              Event Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your event details, requirements, or special requests..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="min-h-[100px] lg:min-h-[120px] border-2 border-blue-200 focus:border-blue-400 rounded-lg transition-all duration-200 resize-none bg-white/80"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6 border-t border-blue-200/50">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose} 
              disabled={isSubmitting}
              className="flex-1 h-10 lg:h-12 border-2 border-blue-300 hover:bg-blue-50 transition-all duration-200 text-blue-600"
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 h-10 lg:h-12 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl text-white border-0 disabled:opacity-50"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Submit Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
