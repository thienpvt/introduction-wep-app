import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { Customer } from "views/Customer";
import  Admin  from "views/Admin";
import ProductAdmin from "views/Admin/product";
import CategoryAdmin from "views/Admin/category";
import Home from "views/Customer/Home";
import SearchProducts from "views/Customer/SearchProducts";
import ProductCategories from "views/Customer/Categories/ProductCategories";
import { Detail } from "views/Customer/Detail";
import token from "plugins/token";
import Login from "views/Login";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Customer,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "category/:categoryId",
        Component: SearchProducts,
      },
      {
        path: "detail/:productId",
        Component: Detail,
      },
      {
        path: "searchProducts",
        Component: SearchProducts,
      },
    ],
  },
  {
    id: "admin",
    path: "/admin",
    Component: Admin,
    loader: protectedLoader,
    children:[
      {
        path: "product",
        Component: ProductAdmin,
        loader: protectedLoader,
      },
      {
        path: "category",
        Component: CategoryAdmin,
        loader: protectedLoader,
      },
      {
        path: "*",
        loader: () => {
          return redirect("/admin/product");
        }
      }
    ]
  },
  {
    path: "/login",
    loader: ({ request }) => {
      // If the user is already logged in, redirect them to the home page
      if (token.getClaims()) {
        return redirect("/admin/product");
      }
      return null;
    },
    Component: Login
  },
  // {
  //   path: "/protected",
  //   loader: protectedLoader,
  //   Component: () => {
  //     return <h1>Protected</h1>;
  //   },
  // },
  // {
  //   path: "/404",
  //   Component: () => {
  //     return <h1>Not Found</h1>;
  //   },
  // },
  // {
  //   path: "/:catchAll(.*)",
  //   Component: () => {
  //     return redirect("/404");
  //   },
  // }
  // {
  //   path: "/:catchAll(.*)",
  //   loader: () => {
  //     return redirect("/");
  //   },
  // },
  
]);

function protectedLoader({ request }: LoaderFunctionArgs) {

  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!token.getClaims()) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

export default router;