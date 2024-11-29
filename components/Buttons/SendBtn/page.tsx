import "./index.css";
import Link from "next/link";

export default function SendBtn() {

  return (
    <Link href="/send">
      <button className="button">Send Ledger</button>
    </Link>
  );
}
