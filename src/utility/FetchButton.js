
export const fetchMore = (productRef, lastProducts, setProducts) => {
window.scrollTo(0, 0);
productRef
  .startAfter(lastProducts)
  .limit(12)
  .get()
  .then((collections) => {
    setProducts(
      collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  });
};

export  const fetchBack = (productRef, lastProducts, setProducts) => {
    window.scrollTo(0, 0);
    productRef.orderBy("description", "asc")
      .endBefore(lastProducts)
      .limitToLast(12)
      .get()
      .then((collections) => {
        setProducts(
          collections.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  };

