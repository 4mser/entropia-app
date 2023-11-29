import React from "react";
import { quantum } from "ldrs";

// Use the same type as declared in quantum.d.ts
interface QuantumProps {
  size?: string | number;
  speed?: string | number;
  color?: string | number;
}

// Declare the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "l-quantum": QuantumProps;
    }
  }
}

interface LoaderProps {
  // You can define any props if needed
}

const Loader: React.FC<LoaderProps> = () => {
  quantum.register();
  return <l-quantum size="16" speed="1.75" color="white"></l-quantum>;
};

export default Loader;
