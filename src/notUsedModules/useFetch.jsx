//useFetch.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
  }, [url]);

  return [data, error];
}


// export function useFetch(request) {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     request
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//         setError(error);
//       });
//   }, [request]);

//   return [data, error];
// }

