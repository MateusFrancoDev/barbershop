"use client";
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hour, setHour] = useState<string | undefined>();

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleBookingCLick = () => {
    if (!isAuthenticated) {
      return signIn("google");
    }
  };

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex gap-4 items-center w-full">
          <div className="relative min-h-[110px] min-w-[110px] max-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "contain" }}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="font-bold ">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex item-center justify-between mt-3">
              <p className="text-primary text-sm font-bold mt-2">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    className="text-primary"
                    onClick={handleBookingCLick}
                  >
                    Reservar
                  </Button>
                </SheetTrigger>

                <SheetContent className="p-0">
                  <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    className="mt-6 rounded-lg border font-bold text-gray-700  w-full uppercase"
                    locale={ptBR}
                    disabled={{ before: new Date() }}
                  />

                  {/* Mostrar linha de horários */}
                  {date && (
                    <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden py-6 px-5 border-y border-solid border-secondary">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => handleHourClick(time)}
                          key={time}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
