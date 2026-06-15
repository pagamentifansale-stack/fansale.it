"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronRight } from "lucide-react";

// Use string inputs for number fields to avoid z.coerce resolver type conflicts
const listingSchema = z.object({
  event_artist: z.string().min(1, "Artist name is required"),
  event_title: z.string().min(1, "Event title is required"),
  event_venue: z.string().min(1, "Venue is required"),
  event_city: z.string().min(1, "City is required"),
  event_date: z.string().min(1, "Event date is required"),
  section: z.string().optional(),
  row: z.string().optional(),
  seat: z.string().optional(),
  quantity: z.string().min(1, "Quantity is required"),
  price: z.string().min(1, "Price is required"),
  is_nominative: z.boolean(),
  description: z.string().optional(),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function ListingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      quantity: "1",
      is_nominative: false,
    },
  });

  const onSubmit = async (data: ListingFormValues) => {
    const payload = {
      ...data,
      quantity: parseInt(data.quantity, 10),
      price: parseFloat(data.price),
    };
    // TODO: submit to Supabase
    console.log("Listing data:", payload);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create Listing</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Event Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Artist *
            </label>
            <input
              {...register("event_artist")}
              placeholder="e.g. Geolier"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.event_artist && (
              <p className="text-red-400 text-xs mt-1">
                {errors.event_artist.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Event Title *
            </label>
            <input
              {...register("event_title")}
              placeholder="e.g. 2026 Stage"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.event_title && (
              <p className="text-red-400 text-xs mt-1">
                {errors.event_title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Venue *
            </label>
            <input
              {...register("event_venue")}
              placeholder="e.g. Stadio Diego Armando Maradona"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.event_venue && (
              <p className="text-red-400 text-xs mt-1">
                {errors.event_venue.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              City *
            </label>
            <input
              {...register("event_city")}
              placeholder="e.g. Napoli"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.event_city && (
              <p className="text-red-400 text-xs mt-1">
                {errors.event_city.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Event Date *
            </label>
            <input
              {...register("event_date")}
              type="datetime-local"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.event_date && (
              <p className="text-red-400 text-xs mt-1">
                {errors.event_date.message}
              </p>
            )}
          </div>
        </div>

        {/* Seat Info */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Section
            </label>
            <input
              {...register("section")}
              placeholder="e.g. Settore C6"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Row
            </label>
            <input
              {...register("row")}
              placeholder="e.g. Fila 2"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Seat
            </label>
            <input
              {...register("seat")}
              placeholder="e.g. Posto 10"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500"
            />
          </div>
        </div>

        {/* Quantity & Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Quantity *
            </label>
            <input
              {...register("quantity")}
              type="number"
              min={1}
              max={10}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.quantity && (
              <p className="text-red-400 text-xs mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Price per ticket (€) *
            </label>
            <input
              {...register("price")}
              type="number"
              step="0.01"
              min={0.01}
              placeholder="52.90"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
            />
            {errors.price && (
              <p className="text-red-400 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        {/* Nominative Tickets Toggle */}
        <div className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <input
            type="checkbox"
            id="is_nominative"
            {...register("is_nominative")}
            className="mt-1 w-4 h-4 accent-rose-500 cursor-pointer"
          />
          <div>
            <label
              htmlFor="is_nominative"
              className="font-medium text-white cursor-pointer"
            >
              Nominative tickets
            </label>
            <p className="text-sm text-gray-400 mt-0.5">
              Check this if each ticket must be registered to a specific
              person&apos;s name (e.g., TicketOne events, Geolier, etc.). Buyers
              will be asked to provide a name for each ticket during checkout.
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1">
            Description (optional)
          </label>
          <textarea
            {...register("description")}
            rows={3}
            placeholder="Any additional details about the tickets..."
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              List Tickets <ChevronRight size={16} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
