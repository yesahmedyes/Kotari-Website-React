import { firebase, db } from "../firebase";

const createCart = (auth,setDocId) => {
  if (auth) {
    db.collection("cart").where("consumerId","==",auth.uid).where("completed","==","false").get()
      .then((querySnapshot) => {
        let data;
        querySnapshot.forEach((doc) => {
          data = doc.id;
        });
        if(data){
          setDocId(data);
        }
        if (!data) {
          db.collection("cart")
            .doc()
            .set({
              consumerId: auth.uid,
              date: new Date(),
              completed: "false",
            })
            .then((doc) => {
              createCart(auth,setDocId);
              console.log("cart created");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        } else {
          console.log("already created");
        }
      });
  }
};
const createWishlist = (auth,setWishId) => {
  if (auth) {
    db.collection("wishlist").where("consumerId","==",auth.uid).get()
      .then((querySnapshot) => {
        let data;
        querySnapshot.forEach((doc) => {
          data=doc.id;
        });
        setWishId(data);
        if (!data) {
          db.collection("wishlist")
            .doc()
            .set({
              consumerId: auth.uid,
            })
            .then((doc) => {
              createWishlist(auth,setWishId);
              console.log("wishlist created");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }else{
          console.log("already created");
        }
      });
  }
};
const fetchProducts = async (setProducts) => {
  db.collection("products")
    .get()
    .then((querySnapshot) => {
      let map = {};
      const data = querySnapshot.docs.map((doc) => {
        db.collection("product-reviews").where("productId","==",doc.id).get().then((querySnapshot)=>{
           const data = querySnapshot.docs.map((doc) => doc.data());
           map[doc.id] = doc.data();
           if(data.length!==0){
             map[doc.id].rating=data[0].rating;
             map[doc.id].total=data[0].total;
           }else{
             map[doc.id].rating=0;
             map[doc.id].total=0;
           }

        })

      });
      setProducts(map);
    });
};


const fetchCartProd = (product, cartItems,x,y,setPrice,setCart,setLoading,setPriceBool,priceBool) => {
  db.collection("products")
    .doc(product.product)
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.data();
      data.productId = product.product;
      data.quantity = product.quantity;
      data.variations = product.variations;
      cartItems.push(data);
      if (!priceBool) {
        setPrice((price) => price + data.price * data.quantity);
      }
      if (x === y) {
        setCart(cartItems);
        setLoading(false);
        setPriceBool(true);
      }
    });
};
const fetchWishProd = (product, wishItems,x,y,setWishlist) => {
  db.collection("products")
    .doc(product.product)
    .get()
    .then((querySnapshot) => {
      const data = querySnapshot.data();
      data.productId=product.product;
      data.quantity = product.quantity;
      data.variations = product.variations;


      wishItems.push(data);
      if(x===y){
        setWishlist(wishItems);
      }


    });
};





export {
  createCart,
  createWishlist,
  fetchProducts,
  fetchCartProd,
  fetchWishProd
}
