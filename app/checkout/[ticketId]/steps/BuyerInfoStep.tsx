"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Users, ChevronRight } from "lucide-react";
import { useCheckoutStore } from "@/features/checkout/checkoutStore";
import { Ticket, AttendeeInfo } from "@/types";

interface BuyerInfoStepProps {
  ticket: Ticket;
  onNext: () => void;
  onBack: () => void;
}

// Single unified schema — attendees always present as array, validated conditionally via superRefine
const baseSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(6, "Invalid phone number"),
  address: z.string().min(5, "Enter your address"),
  attendees: z.array(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
    }),
  ),
});

type FormValues = z.infer<typeof baseSchema>;

export default function BuyerInfoStep({
  ticket,
  onNext,
  onBack,
}: BuyerInfoStepProps) {
  const { setBuyerInfo, setAttendees } = useCheckoutStore();

  // Extend schema with conditional validation for nominative tickets
  const schema = ticket.is_nominative
    ? baseSchema.superRefine((data, ctx) => {
        data.attendees.forEach((attendee, i) => {
          if (!attendee.firstName.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Required",
              path: ["attendees", i, "firstName"],
            });
          }
          if (!attendee.lastName.trim()) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Required",
              path: ["attendees", i, "lastName"],
            });
          }
        });
      })
    : baseSchema;

  const defaultAttendees = Array.from({ length: ticket.quantity }, () => ({
    firstName: "",
    lastName: "",
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      attendees: defaultAttendees,
    },
  });

  // Safely cast attendee errors
  const attendeeErrors = errors.attendees as
    | (
        | { firstName?: { message?: string }; lastName?: { message?: string } }
        | undefined
      )[]
    | undefined;

  const onSubmit = (data: FormValues) => {
    setBuyerInfo({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      address: data.address,
    });

    if (ticket.is_nominative) {
      const attendees: AttendeeInfo[] = data.attendees.map((a, i) => ({
        ticketIndex: i,
        firstName: a.firstName,
        lastName: a.lastName,
      }));
      setAttendees(attendees);
    } else {
      setAttendees([]);
    }

    onNext();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ── Buyer Info Section ── */}
        <section>
          <h2 className="font-bold text-gray-800 mb-1">Your Information</h2>
          <p className="text-xs text-gray-500 mb-4">
            These details are used for your order confirmation and receipt.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Full Name *
              </label>
              <input
                {...register("fullName")}
                placeholder="Mario Rossi"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Email *
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="mario@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Phone *
                </label>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="+39 333 1234567"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Address *
                </label>
                <input
                  {...register("address")}
                  placeholder="Via Roma 1, Milano"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Attendee Names Section — only shown for nominative tickets ── */}
        {ticket.is_nominative && (
          <section className="pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <Users size={16} className="text-[#1a2744]" />
              <h3 className="font-bold text-gray-800 text-sm">
                Attendee Names
              </h3>
            </div>
            <p className="text-xs text-gray-500 mb-5">
              These tickets are <strong>nominative</strong>. Each ticket must be
              registered to a specific person. Please provide the full name for
              each ticket exactly as it appears on their ID.
            </p>

            {Array.from({ length: ticket.quantity }).map((_, i) => (
              <div
                key={i}
                className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <p className="text-xs font-semibold text-gray-600 mb-3">
                  Ticket {i + 1} of {ticket.quantity}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      First Name *
                    </label>
                    <input
                      {...register(`attendees.${i}.firstName`)}
                      placeholder="Mario"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                    />
                    {attendeeErrors?.[i]?.firstName?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {attendeeErrors[i]?.firstName?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Last Name *
                    </label>
                    <input
                      {...register(`attendees.${i}.lastName`)}
                      placeholder="Rossi"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1a2744] focus:ring-1 focus:ring-[#1a2744]"
                    />
                    {attendeeErrors?.[i]?.lastName?.message && (
                      <p className="text-red-500 text-xs mt-1">
                        {attendeeErrors[i]?.lastName?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── Navigation ── */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border border-gray-300 text-gray-600 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Continue <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}
