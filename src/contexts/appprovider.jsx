import React from "react";
import { UserProvider } from "./authContext";
import { UserProviderHeader } from "./admincontexts/headercontext";
import { Provider } from "react-redux";
import store from "../app/store.js";
import { LoaderProvider } from "./LoaderContext.jsx";
import { InfoProvider } from "./admincontexts/companydetails.jsx";
import { ProductProvider } from "./Productcontext.jsx";

export const AppProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <ProductProvider>
        <LoaderProvider>
          <InfoProvider>
            <UserProvider>
              <UserProviderHeader>{children}</UserProviderHeader>
            </UserProvider>
          </InfoProvider>
        </LoaderProvider>
      </ProductProvider>
    </Provider>
  );
};
