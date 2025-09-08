"use client";

import { Booking } from "@prisma/client";

interface BookingListProps {
  booking: Booking;
}

const BookingList = ({ booking }: BookingListProps) => {
  return <h2></h2>;
};

export default BookingList;
