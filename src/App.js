import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Home from './components/Home/Home'
import Cart from "./components/Cart/Cart";
import ProductPage from "./components/ProductPage/ProductPage";
import Checkout from "./components/CheckoutForm/Checkout/Checkout.js";
import Wishlist from "./components/Wishlist/Wishlist";
import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from "react-router-dom";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SignUp from "./components/SignUp/SignUp";
import "./index.css";
import { firebase, db } from "./firebase";
import { connect } from "react-redux";
import { createCart, createWishlist, fetchProducts, fetchCartProd, fetchWishProd } from "./cartController/cartController";

let globalUser;

const App = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [totalItems, setTotalItems] = useState(null);
  const [totalWish, setTotalWish] = useState(null);
  const [User, setUser] = useState(null);
  const [price, setPrice] = useState(0);
  const [order, setOrder] = useState({});
  const [loadingCart, setLoading] = useState(true);
  const [logOff, setLogOff] = useState(true);
  const [priceBool, setPriceBool] = useState(false);
  const [docId, setDocId] = useState(null);
  const [wishId, setWishId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);


  const handleUpdateCartQty = async (productId, quantity) => {
    db.collection("cart")
      .doc(docId)
      .collection("products")
      .doc(productId)
      .update({
        quantity: quantity,
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    };

  const handleRemoveFromCart = async (productId) => {
    db.collection("cart")
      .doc(docId)
      .collection("products")
      .doc(productId)
      .delete()
      .then(() => {
        fetchCart();
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const addAuthListener=()=>{
    firebase.auth().onAuthStateChanged((user) => {
      if (user!==null && (User===null || User.uid!==user.uid)) {
        console.log("USER",user);
        globalUser = user;
        props.updateUser(user);
        setUser(user);
      } else if(user===null) {
              firebase.auth().signInAnonymously();
      }
    });
  }

  const handleEmptyCart = async () => {
    db.collection("cart")
      .doc(docId)
      .delete()
      .then(() => {
        setCart([]);
        setTotalItems(0);
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const fetchCart = async () => {
    console.log("FETCHING");
    if (docId) {
      db.collection("cart")
        .doc(docId)
        .collection("products")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setTotalItems(data.length);
          if (data.length === 0) {
            setCart([]);
            setLoading(false);
            return;
          }
          let cartItems = [];
          data.forEach(async (product, index) => {
            await fetchCartProd(product, cartItems, data.length - 1, index,setPrice,setCart,setLoading,setPriceBool,priceBool);
          });
        });
    } else {
    }
  };

  const fetchWishlist = async () => {
    if (wishId) {
      db.collection("wishlist")
        .doc(wishId)
        .collection("products")
        .get()
        .then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => doc.data());
          setTotalWish(data.length);
          if (data.length === 0) {
            setWishlist([]);
              return;
          }
          let wishItems = [];
          data.forEach(async (product,index) => {
            await fetchWishProd(product, wishItems,data.length-1,index,setWishlist);
          });
        });
    }
  };

  useEffect(() => {
    addAuthListener();
    fetchProducts(setProducts);
  }, []);

  useEffect(() => {
    createCart(props.auth,setDocId);
    createWishlist(props.auth,setWishId);
  }, [props.auth]);

  useEffect(() => {
    fetchCart();
  }, [docId, User]);

  useEffect(() => {
    fetchWishlist();
  }, [wishId, User]);

  return (
    <Router>
      <div style={{ backgroundColor: "#F6F6F6" }}>
        <Navbar
          totalItems={totalItems}
          wishItems={totalWish}
          setCart={setCart}
          setDocId={setDocId}
          setWishId={setWishId}
          setTotalItems={setTotalItems}
          setTotalWish={setTotalWish}
          setUser={setUser}
        />
        <div style={{ marginTop: "60px" }} />
  
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/cart">
            <Cart
              cart={cart}
              price={price}
              userId={props.auth ? props.auth.uid : null}
              setPrice={setPrice}
              handleUpdateCartQty={handleUpdateCartQty}
              fetchCart={fetchCart}
              handleEmptyCart={handleEmptyCart}
              loadingCart={loadingCart}
              setCart={setCart}
              docId={docId}
            />
          </Route>
  
          <Route exact path="/wishlist">
            <Wishlist
              wishList={wishlist}
              userId={props.auth ? props.auth.uid : null}
              setWishlist={setWishlist}
              fetchWishlist={fetchWishlist}
              wishId={wishId}
              setTotalWish={setTotalWish}
            />
          </Route>

          <Route exact path="/checkout">
            <Checkout
              order={order}
              cart={cart}
              error={errorMessage}
            />
          </Route>

          <Route
            path="/product/:id"
            render={(props) => (
              <ProductDetail
                {...props}
                cart={cart}
                setCart={setCart}
                totalItems={totalItems}
                setTotalItems={setTotalItems}
                setPrice={setPrice}
                price={price}
                docId={docId}
                products={products}
                wishId={wishId}
                wishList={wishlist}
                setWishlist={setWishlist}
                totalWish={totalWish}
                setTotalWish={setTotalWish}
              />
            )}
          />

          <Route exact path="/signup">
            {props.auth ? (
              props.auth.isAnonymous ? (
                <SignUp docId={docId} />
              ) : (
                <Redirect to="/" />
              )
            ) : null}
          </Route>

          <Route
            path="/products"
            render={(props) => (
              <ProductPage products={products} />
            )}
          />

        </Switch>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch({ type: "GETUSER" }),
    updateUser: () => dispatch({ type: "SETUSER", user: globalUser }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
