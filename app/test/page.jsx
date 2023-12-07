import React from "react";

const Page = () => {
    //Everything in this function will run in server:
  const handleForm = async () => {
    "use server"
    console.log("Hello")``

  };
  return (
    <div>
      <form action={handleForm}>
        <input type="text" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Page;
