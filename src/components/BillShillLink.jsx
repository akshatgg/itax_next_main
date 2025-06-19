"use client";
import { useCallback, useEffect, useRef } from "react";
import useAuth from "@/hooks/useAuth.js";
import Link from "next/link.js";

const BLAZ_URL = process.env.NEXT_PUBLIC_BLAZ_URL;

export default function BillShillLink({ path = "/", text, className }) {
  const { user: currentUser, token } = useAuth().currentUser;
  const childWindowRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    childWindowRef.current = window.open(BLAZ_URL, "_blank");
  };

  const handleMessage = useCallback(
    (e) => {
      if (e.origin !== BLAZ_URL) {
        return;
      }

      if (childWindowRef.current) {
        childWindowRef.current.postMessage(
          { data: currentUser, token, redirect: path },
          BLAZ_URL
        );

        console.log("SENT TOKEN");
      }
    },
    [currentUser, token, path]
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={className}
    >
      {text}
      <sup>billshill</sup>
    </Link>
  );
}
