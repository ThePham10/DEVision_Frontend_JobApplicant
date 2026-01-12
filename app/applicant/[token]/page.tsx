import ActivateEmailBox from "@/components/activate-email-box/ui/ActivateEmailBox";

interface ActivateEmailPageProps {
  params: Promise<{token: string}>
}

export default function ActivateEmailPage({ params }: ActivateEmailPageProps) {
   return (
        <ActivateEmailBox params={params} />
   )
}
