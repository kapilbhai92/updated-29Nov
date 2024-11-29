import "./index.css";
import Link from "next/link";

export default function RecieveBtn() {

  return (
    <Link href="/recieve">
      <button className="button">Recieve Ledger</button>
    </Link>
  );
}
