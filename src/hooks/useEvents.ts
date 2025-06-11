
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Event {
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

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchEvents = async () => {
    if (!user) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching events for user:', user.id);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load events from database",
          variant: "destructive"
        });
        return;
      }

      console.log('Fetched events:', data);
      const formattedEvents: Event[] = (data || []).map(event => ({
        id: event.id,
        title: event.title,
        date: new Date(event.date),
        time: event.time,
        description: event.description || '',
        status: event.status as 'confirmed' | 'pending' | 'cancelled',
        clientName: event.client_name,
        contactNo: event.contact_no,
        hallType: event.hall_type
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addEvent = async (eventData: {
    name: string;
    contactNo: string;
    date: Date;
    time: string;
    hallType: string;
    description: string;
  }) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create events",
        variant: "destructive"
      });
      return;
    }

    const hallTypeDisplayMap: Record<string, string> = {
      banquet: 'Banquet Hall',
      kitty: 'Kitty Party Hall',
      restaurant: 'Restaurant'
    };

    const title = `${hallTypeDisplayMap[eventData.hallType]} - ${eventData.name}`;

    try {
      console.log('Adding new event:', {
        user_id: user.id,
        title,
        client_name: eventData.name,
        contact_no: eventData.contactNo,
        date: eventData.date.toISOString().split('T')[0],
        time: eventData.time,
        hall_type: eventData.hallType,
        description: eventData.description,
        status: 'confirmed'
      });

      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: user.id,
          title,
          client_name: eventData.name,
          contact_no: eventData.contactNo,
          date: eventData.date.toISOString().split('T')[0],
          time: eventData.time,
          hall_type: eventData.hallType,
          description: eventData.description,
          status: 'confirmed'
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding event:', error);
        toast({
          title: "Error",
          description: "Failed to save event to database",
          variant: "destructive"
        });
        return;
      }

      console.log('Event added successfully:', data);
      
      // Add the new event to local state
      const newEvent: Event = {
        id: data.id,
        title: data.title,
        date: new Date(data.date),
        time: data.time,
        description: data.description || '',
        status: data.status as 'confirmed' | 'pending' | 'cancelled',
        clientName: data.client_name,
        contactNo: data.contact_no,
        hallType: data.hall_type
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);

      toast({
        title: "🎉 Booking Confirmed!",
        description: `Thank you ${eventData.name}! Your ${hallTypeDisplayMap[eventData.hallType]} booking for ${eventData.date.toLocaleDateString()} at ${eventData.time} has been successfully saved.`,
      });

    } catch (error) {
      console.error('Error adding event:', error);
      toast({
        title: "Error",
        description: "Failed to save event",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [user]);

  return {
    events,
    loading,
    addEvent,
    refetchEvents: fetchEvents
  };
};
