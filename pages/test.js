import React, { createRef } from "react";
import { useSessionStorage } from "../hooks/useSession";

function Test() {
  const ref = createRef()
  const [user, setUser, clearSession] = useSessionStorage("user", null);

  const handleSession = () => {
    setUser("user", { name: ref.current.value });
  };

  return (
    <div>
      <div>{user?.name}</div>
      <input ref={ref} /> <br />
      <button onClick={handleSession}>Set session</button> <br />
      <br />
      <button onClick={clearSession}>Clear session</button>
    </div>
  );
}

export default Test;
