import { useCallback } from 'react';
import ShippingForm from './EventForm.jsx';

export default function ProductPage({ productId , onClose}) {
  // console.log(productId)
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      orderDetails,
    });
  }, [productId]);

  return (
    <div>
      <ShippingForm onSubmit={handleSubmit} productId={productId} onClose={onClose}/>
    </div>
  );
}

function post(url, data) {
  // Imagine this sends a request...
  console.log('POST /' + url);
  console.log(data);
}
