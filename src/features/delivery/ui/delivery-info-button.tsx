import Link from "next/link";

export function DeliveryInfoButton() {
  return (
    <Link href="#delivery-terms" className="cursor-pointer transition-colors duration-200 ease-in-out hover:text-white">
      Доставка
    </Link>
  );
}
