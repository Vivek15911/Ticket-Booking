-- Add INSERT policy for tickets table
-- Users can create tickets through the booking system
CREATE POLICY "Users can create tickets for their bookings"
ON public.tickets
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.bookings
    WHERE bookings.id = tickets.booking_id
    AND bookings.user_id = auth.uid()
  )
);