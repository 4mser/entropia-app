import React from "react";
import { quantum } from "ldrs";

// Declare the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-quantum": any; // You might want to replace 'any' with the correct type if available
    }
  }
}

interface LoaderProps {
  // You can define any props if needed
}

const Loader: React.FC<LoaderProps> = () => {
  quantum.register();
  return <l-quantum  speed="1.75" color="white"></l-quantum>;
};

export default Loader;
