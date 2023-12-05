"use client";

import React from "react";
import styles from "./search.module.css";
import { MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathName = usePathname();

  //debounce will wait user to finish typing before searching (will wait 300 ms before search)

  const handleSearch = useDebouncedCallback((e) => {
    // creating new url inside the query will run. using the replace method to change the url

    const params = new URLSearchParams(searchParams);
    // if search field contains nothing the url will not show q. search field needs to contain at least 3 char
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathName}?${params}`);
  },300);

  return (
    <div className={styles.container}>
      <MdSearch />
      {/* search component place holder will show diff text in diff page */}
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
