import React from 'react';

interface ProductShowcaseProps {
  // Define props here if any
}

const ProductShowcase: React.FC<ProductShowcaseProps> = () => {
  return (
    <section className="h-screen w-full flex items-center justify-center bg-primary">
      <h1>Welcome to our site!</h1>
      <p>Discover amazing things with us.</p>
      <button>Learn More</button>
    </section>
  );
};

export default ProductShowcase;
