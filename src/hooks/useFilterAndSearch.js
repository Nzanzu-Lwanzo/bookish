import { useState } from "react";

export default function useFilterAndSearch({ filter }) {
  const [searchInput, setSearchInput] = useState("");
  const [result, setResult] = useState([]);

  return {
    getInput: (e) => {
      // The user should provide a function
      // that filters a data.
      // We can't filter inside of this hook because data to filter
      // might be in a state.
      filter(e.target.value);

      // We will need it we don't find it in the state
      // and need to request to the backend
      setSearchInput(e.target.value);
    },
    result,
  };
}
