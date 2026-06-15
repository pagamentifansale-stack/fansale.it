import { CheckoutStep } from "@/types"
import StepIndicator from "@/components/ui/StepIndicator"

export default function CheckoutSteps({ steps }: { steps: CheckoutStep[] }) {
  return (
    <div className="mb-8">
      <StepIndicator steps={steps} />
    </div>
  )
}