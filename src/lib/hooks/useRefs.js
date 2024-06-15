import React, { useRef } from 'react';

const useRefs = (num) => {
  const refs = useRef([]);
  if (refs.current.length !== num + 1) {
    refs.current = Array(num + 1).fill().map((_, i) => refs.current[i] || React.createRef());
  }
  return refs.current;
};

export default useRefs;
