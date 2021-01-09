import { useState, useEffect } from "react";

const useOutsideClick = (ref) => {
  const [active, setActive] = useState(false);

  const handleClick = status => setActive(status);

  const handleEventClick = e => {
    if (active && ref.current && !ref.current.contains(e.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleEventClick);

    return () => {
      document.removeEventListener("click", handleEventClick);
    };
  });

  return [active, handleClick];
};

export default useOutsideClick;